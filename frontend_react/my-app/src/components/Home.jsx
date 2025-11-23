import { Link } from "react-router-dom";
import { FaBrain, FaMusic, FaVideo } from "react-icons/fa";
import FloatingLines from "../elements/FloatingLines";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden relative flex flex-col overflow-y-auto">
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
      <div className="relative z-20 flex flex-col flex-grow pt-12">
        {/* Main Content */}
        <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              Personalized Calm for{" "}
              <span className="text-white">Autistic Children</span>
            </h1>
            <p className="text-white text-lg">
              Using machine learning to analyze brain waves and generate custom
              soothing content that helps transition from hyperactivity to calm.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link
                to="/upload"
                className="bg-black text-white px-8 py-3 rounded-md text-lg hover:bg-gray-800 transition shadow-md inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-3 text-blue-500">
                <FaBrain size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">EEG Analysis</h3>
              <p className="text-gray-600">
                Advanced processing of brain waves to understand emotional
                states
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-3 text-blue-500">
                <FaMusic size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Custom Music</h3>
              <p className="text-gray-600">
                Personalized soothing melodies based on real-time brain activity
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-3 text-blue-500">
                <FaVideo size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Calming Videos</h3>
              <p className="text-gray-600">
                Serene visuals of nature and gentle environments
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-8 mb-3 flex items-center justify-center">
                <span className="inline-block w-8 h-8 rounded-full bg-blue-500 animate-pulse"></span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Better Sleep</h3>
              <p className="text-gray-600">
                Improved rest and emotional regulation
              </p>
            </div>
          </div>
        </div>
      </main>

      </div>
    </div>
  );
}

