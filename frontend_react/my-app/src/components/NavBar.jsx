import { FaGithub, FaFileCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlassSurface from "../elements/GlassSurface";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    
    <nav className="sticky top-0 w-full flex justify-center px-6 py-4 z-50">
      <div className="w-full max-w-6xl">
        <GlassSurface
          width="100%"
          height={70}
          borderRadius={50}
          backgroundOpacity={0.1}
          blur={12}
          className="!items-stretch"
        >
          <div className="w-full flex justify-between items-center px-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-white ml-8 hover:text-purple-200 transition-colors relative z-10">
                <span className="text-xl md:text-2xl font-bold">
                Neuro<span className="text-purple-300">Rythm</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 mr-8 relative z-10">
              <a
                href="https://github.com/Aadityaa2606/Autis_Buddy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-200 flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <Link
                to="/howto"
                className="text-white hover:text-purple-200 flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <FaFileCode size={20} />
                <span>How ?</span>
              </Link>
              <Link
                to="/upload"
                className="bg-transparent border border-white/50 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <div className="md:hidden relative z-10 mr-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center p-2 rounded-lg text-white hover:text-purple-200 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </GlassSurface>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <GlassSurface
            width="100%"
            borderRadius={16}
            backgroundOpacity={0.1}
            blur={12}
            className="mt-3"
          >
            <div className="flex flex-col space-y-4 px-2 pb-3">
              <a
                href="https://github.com/Aadityaa2606/Autis_Buddy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-200 flex items-center space-x-1 py-2 transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <Link
                to="/howto"
                className="text-white hover:text-purple-200 flex items-center space-x-1 py-2 transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaFileCode size={18} />
                <span>How ?</span>
              </Link>
              <Link
                to="/upload"
                className="text-white hover:text-purple-200 flex items-center space-x-1 py-2 transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get Started</span>
              </Link>
            </div>
          </GlassSurface>
        )}
      </div>
    </nav>
  );
}

