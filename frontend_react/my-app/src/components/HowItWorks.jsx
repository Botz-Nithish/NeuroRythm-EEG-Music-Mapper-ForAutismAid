import { Link } from "react-router-dom";
import { FaMusic, FaVideo, FaArrowRight } from "react-icons/fa";
import FloatingLines from "../elements/FloatingLines";
import MagicBento from "../elements/MagicBento";

// Custom card data for HowItWorks
const howItWorksCards = [
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Project Overview',
    description: 'Personalized calm for autistic children through ML-powered EEG analysis',
    label: 'Overview',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            Autistic children often experience uncontrollable emotions and heightened hyperactivity, 
            which can disrupt their ability to relax and get adequate sleep.
          </p>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            We&apos;ve developed a machine learning model that analyzes brain waves (EEG data) to generate 
            personalized, calming content.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30">
              <FaMusic className="text-purple-400 mb-2" size={20} />
              <h4 className="text-xs font-semibold text-white mb-1">Custom Music</h4>
              <p className="text-xs text-gray-400">EEG-derived melodies</p>
            </div>
            <div className="bg-pink-500/20 p-3 rounded-lg border border-pink-500/30">
              <FaVideo className="text-pink-400 mb-2" size={20} />
              <h4 className="text-xs font-semibold text-white mb-1">Calming Videos</h4>
              <p className="text-xs text-gray-400">Serene environments</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'EEG Data Analysis',
    description: 'Collect and analyze brain signals to infer key parameters',
    label: 'Step 1',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            We collect EEG signals using wearable devices and analyze them to infer:
          </p>
          <ul className="text-xs text-gray-400 space-y-1 mb-4 list-disc list-inside">
            <li>Relaxation levels (alpha/theta waves)</li>
            <li>Stress indicators (beta wave spikes)</li>
            <li>Arousal states (gamma imbalances)</li>
          </ul>
          <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
            <h4 className="text-xs font-semibold text-white mb-2">Global Parameters</h4>
            <div className="flex flex-wrap gap-1">
              {['avg_alpha', 'avg_beta', 'avg_gamma', 'avg_delta', 'avg_theta'].map((param, i) => (
                <span key={i} className="text-xs bg-purple-500/20 px-2 py-1 rounded text-purple-300">
                  {param}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Parameter Mapping',
    description: 'Map EEG parameters to music generation parameters',
    label: 'Step 2',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="space-y-3">
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
              <h4 className="text-xs font-semibold text-white mb-1">Tempo</h4>
              <p className="text-xs text-gray-400 font-mono mb-1">60-80 bpm</p>
              <p className="text-xs text-gray-500">Higher arousal = slower tempo</p>
            </div>
            <div className="bg-pink-500/10 p-3 rounded-lg border border-pink-500/20">
              <h4 className="text-xs font-semibold text-white mb-1">Key Selection</h4>
              <p className="text-xs text-gray-400">Based on dominant wave</p>
              <p className="text-xs text-gray-500">A minor, C major, G major</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Note Parameters',
    description: 'Dynamic MIDI note adjustments per interval',
    label: 'Step 3',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-2">
          <div className="bg-purple-500/10 p-2 rounded border border-purple-500/20">
            <h4 className="text-xs font-semibold text-white">Pitch</h4>
            <p className="text-xs text-gray-400">40-80 (C2-G5)</p>
          </div>
          <div className="bg-pink-500/10 p-2 rounded border border-pink-500/20">
            <h4 className="text-xs font-semibold text-white">Step</h4>
            <p className="text-xs text-gray-400">1-5 semitones</p>
          </div>
          <div className="bg-blue-500/10 p-2 rounded border border-blue-500/20">
            <h4 className="text-xs font-semibold text-white">Duration</h4>
            <p className="text-xs text-gray-400">0.5-2.0 seconds</p>
          </div>
          <div className="bg-green-500/10 p-2 rounded border border-green-500/20">
            <h4 className="text-xs font-semibold text-white">Velocity</h4>
            <p className="text-xs text-gray-400">40-80 (volume)</p>
          </div>
        </div>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Additional Adjustments',
    description: 'Refinements based on statistical extremes',
    label: 'Step 4',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-2">
          <div className="bg-purple-500/10 p-2 rounded border border-purple-500/20">
            <h4 className="text-xs font-semibold text-white mb-1">Pitch Range</h4>
            <p className="text-xs text-gray-400">Adjusts for high arousal</p>
          </div>
          <div className="bg-pink-500/10 p-2 rounded border border-pink-500/20">
            <h4 className="text-xs font-semibold text-white mb-1">Melodic Contour</h4>
            <p className="text-xs text-gray-400">Descending for arousal</p>
          </div>
        </div>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Video Integration',
    description: 'Complement music with calming visuals',
    label: 'Step 5',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            Match visual tempo and colors to EEG parameters
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['Ocean', 'Forest', 'Night Sky', 'Rain'].map((scene, i) => (
              <div key={i} className="bg-purple-500/10 p-2 rounded border border-purple-500/20 text-center">
                <p className="text-xs text-purple-300">{scene}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Comprehensive Analysis',
    description: 'All five wave types included in every formula',
    label: 'Why It Works',
    content: (
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-300 leading-relaxed">
          Every formula includes all five wave types, capturing their full influence rather than 
          reducing them to a single index.
        </p>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Personalization',
    description: 'Adapts to individual EEG profiles',
    label: 'Why It Works',
    content: (
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-300 leading-relaxed">
          Global parameters reflect overall profile, while per-interval parameters adapt to 
          moment-to-moment changes.
        </p>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Therapeutic Alignment',
    description: 'Based on music therapy principles',
    label: 'Why It Works',
    content: (
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-300 leading-relaxed">
          Lower pitches, smaller steps, and longer durations during high arousal align with 
          music therapy to boost alpha/theta and reduce beta/gamma.
        </p>
      </div>
    )
  },
  {
    color: 'rgba(6, 0, 16, 0.8)',
    title: 'Statistical Integration',
    description: 'Rich, data-driven output',
    label: 'Why It Works',
    content: (
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-300 leading-relaxed">
          Maxima adjust intensity, modes influence contour, and averages set the baseline, 
          ensuring comprehensive analysis.
        </p>
      </div>
    )
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen relative">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-20 pt-20 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How <span className="text-purple-400">NeuroRythm</span> Works
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Understanding our approach to creating personalized calm for autistic children
          </p>
        </div>

        {/* Magic Bento Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MagicBento
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            glowColor="132, 0, 255"
            textAutoHide={false}
            enableTilt={false}
            enableMagnetism={true}
            clickEffect={true}
          >
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {howItWorksCards.map((card, index) => {
                const baseClassName = `card flex flex-col justify-between relative min-h-[280px] w-full p-6 rounded-[20px] border border-purple-500/30 font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(132,0,255,0.3)] card--border-glow`;
                
                const cardStyle = {
                  backgroundColor: card.color,
                  borderColor: 'rgba(132, 0, 255, 0.3)',
                  color: '#fff',
                  '--glow-x': '50%',
                  '--glow-y': '50%',
                  '--glow-intensity': '0',
                  '--glow-radius': '200px'
                };

                // Make first card span 2 columns on large screens
                const gridSpan = index === 0 ? 'md:col-span-2 lg:col-span-2' : '';
                // Make last 4 cards (Why It Works) span 2 columns each on xl
                const whySpan = index >= 6 ? 'xl:col-span-1' : '';

                return (
                  <div
                    key={index}
                    className={`${baseClassName} ${gridSpan} ${whySpan}`}
                    style={cardStyle}
                  >
                    <div className="card__header flex justify-between items-start mb-4">
                      <span className="card__label text-sm font-semibold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                        {card.label}
                      </span>
                    </div>
                    <div className="card__content flex flex-col flex-1">
                      <h3 className="card__title font-semibold text-xl mb-2 text-white">
                        {card.title}
                      </h3>
                      <p className="card__description text-sm text-gray-400 mb-4">
                        {card.description}
                      </p>
                      {card.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </MagicBento>
        </div>

        {/* Get Started CTA */}
        <div className="max-w-4xl mx-auto mt-12 px-4">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Try NeuroRythm?</h2>
            <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
              Upload your EEG data to generate personalized, calming content for your child
            </p>
            <Link 
              to="/upload" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Get Started <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
