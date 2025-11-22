import json
from pathlib import Path
from typing import Dict, Optional, Tuple
import statistics

try:
    from mido import MidiFile
except Exception:
    MidiFile = None  # MIDI stats are optional


def _safe_float(x: str) -> float:
    try:
        return float(x)
    except Exception:
        return 0.0


def extract_features(wave_json_path: Path, music_json_path: Path, midi_path: Optional[Path] = None) -> Dict:
    """
    Read existing outputs and compute sidecar features without changing originals.

    Inputs are expected to be the files produced by the current pipeline:
    - wave_json_path: output/json/wave_analysis.json (bands per interval as strings)
    - music_json_path: output/json/music_parameters.json ([pitch, step, duration] as strings)
    - midi_path: optional output/midi/midi_out.mid for note stats

    Returns a dict of engineered features (global + per-interval summaries).
    """
    wave = json.loads(Path(wave_json_path).read_text())
    music = json.loads(Path(music_json_path).read_text())

    interval_len_s = float(_safe_float(str(wave.get("interval_length", "5"))))
    waves = wave["wave_strengths"]  # {"1": [delta, theta, alpha, beta, gamma]}
    notes = music["musical_parameters"]  # {"1": [pitch, step, duration]}

    per_interval = []
    arousals = []
    pitches = []
    steps = []
    durations = []

    for k in sorted(waves.keys(), key=lambda x: int(x)):
        delta, theta, alpha, beta, gamma = map(_safe_float, waves[k])
        denom = alpha + theta + delta
        arousal = (beta + gamma) / (denom + 1e-6)
        arousals.append(arousal)

        if k in notes:
            p_str, step_str, dur_str = notes[k]
            p = _safe_float(p_str)
            s = _safe_float(step_str)
            d = _safe_float(dur_str)
            pitches.append(p)
            steps.append(s)
            durations.append(d)
        else:
            p = s = d = 0.0

        per_interval.append({
            "interval": int(k),
            "bands": {
                "delta": delta, "theta": theta, "alpha": alpha, "beta": beta, "gamma": gamma
            },
            "arousal": arousal,
            "music": {"pitch": p, "step": s, "duration": d}
        })

    # Temporal stability metrics
    def diffs(vals):
        return [abs(vals[i] - vals[i-1]) for i in range(1, len(vals))] if len(vals) > 1 else []

    pitch_var = statistics.pvariance(pitches) if len(pitches) > 1 else 0.0
    duration_var = statistics.pvariance(durations) if len(durations) > 1 else 0.0
    step_var = statistics.pvariance(steps) if len(steps) > 1 else 0.0

    pitch_change = sum(diffs(pitches)) if pitches else 0.0
    duration_change = sum(diffs(durations)) if durations else 0.0
    step_change = sum(diffs(steps)) if steps else 0.0

    # MIDI stats (optional)
    midi_stats = {}
    if midi_path and MidiFile is not None and Path(midi_path).exists():
        try:
            mf = MidiFile(str(midi_path))
            total_notes = 0
            total_tracks = len(mf.tracks)
            for tr in mf.tracks:
                for msg in tr:
                    if msg.type in ("note_on", "note_off"):
                        total_notes += 1
            midi_stats = {
                "tracks": total_tracks,
                "events_with_notes": total_notes
            }
        except Exception:
            midi_stats = {"tracks": None, "events_with_notes": None}

    features = {
        "interval_length_s": interval_len_s,
        "num_intervals": len(per_interval),
        "arousal": {
            "mean": statistics.fmean(arousals) if arousals else 0.0,
            "var": statistics.pvariance(arousals) if len(arousals) > 1 else 0.0,
            "max": max(arousals) if arousals else 0.0,
            "min": min(arousals) if arousals else 0.0,
        },
        "music_stability": {
            "pitch_var": pitch_var,
            "duration_var": duration_var,
            "step_var": step_var,
            "pitch_change_sum": pitch_change,
            "duration_change_sum": duration_change,
            "step_change_sum": step_change,
        },
        "per_interval": per_interval,
        "midi_stats": midi_stats,
    }
    return features


def predict_report(features: Dict, model_path: Optional[Path] = None) -> Dict:
    """
    Unsupervised scoring: no dataset required. Optionally, a future model can be loaded.
    Returns a therapy report with scores and suggestions. Does not modify existing outputs.
    """
    # Heuristic scoring: combine lower arousal and higher stability into higher calming score
    ar = features.get("arousal", {})
    st = features.get("music_stability", {})

    mean_arousal = float(ar.get("mean", 0.0))
    var_arousal = float(ar.get("var", 0.0))

    # Normalize stability proxies via soft transform to 0..1 (lower variance/change -> higher stability)
    import math
    def inv_soft(x):
        return 1.0 / (1.0 + math.log1p(max(0.0, x)))

    stability = (
        0.4 * inv_soft(st.get("duration_var", 0.0)) +
        0.3 * inv_soft(st.get("step_var", 0.0)) +
        0.3 * inv_soft(st.get("pitch_var", 0.0))
    )

    # Arousal component: lower is better; map approx mean in [0, 2] to score [0,1]
    arousal_component = max(0.0, min(1.0, 1.0 - (mean_arousal / 2.0)))

    # Aggregate score
    calming_score = round(0.6 * stability + 0.4 * arousal_component, 3)

    # Suggestions (non-invasive)
    suggestions = []
    if mean_arousal > 1.0:
        suggestions.append("Consider longer durations and reduced step (note density) in high-arousal intervals.")
    if var_arousal > 0.1:
        suggestions.append("Smooth rapid arousal swings with gentle transitions (avoid abrupt pitch changes).")
    if st.get("duration_var", 0.0) > 0.5:
        suggestions.append("Stabilize durations for more consistent pacing.")

    # Identify top-3 highest arousal intervals
    top_intervals = sorted(
        features.get("per_interval", []), key=lambda x: x.get("arousal", 0.0), reverse=True
    )[:3]
    hotspots = [{"interval": pi["interval"], "arousal": round(pi["arousal"], 3)} for pi in top_intervals]

    report = {
        "calming_score": calming_score,
        "components": {
            "stability": round(stability, 3),
            "arousal_component": round(arousal_component, 3),
            "mean_arousal": round(mean_arousal, 3),
            "var_arousal": round(var_arousal, 3)
        },
        "hotspots": hotspots,
        "suggestions": suggestions,
        "notes": "This evaluator is read-only and does not modify existing outputs."
    }
    return report


def save_sidecar_outputs(features: Dict, report: Dict, output_dir: Path) -> Tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    f_path = output_dir / "features.json"
    r_path = output_dir / "therapy_report.json"
    f_path.write_text(json.dumps(features, indent=2))
    r_path.write_text(json.dumps(report, indent=2))
    return f_path, r_path
