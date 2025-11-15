'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/5 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                LiveAR
              </span>
              <br />
              <span className="text-gray-100">Sky Tours</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Experience the future of low-altitude urban tourism with 
              <span className="text-emerald-400 font-semibold"> AR-enhanced windows</span> that transform your flight into an 
              <span className="text-emerald-400 font-semibold"> immersive journey</span>.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Our eVTOL aircraft fly close to the ground, giving you intimate city views while AR technology highlights landmarks, 
              reveals hidden stories, and overlays digital sceneries on your window view.
            </p>

            {/* eVTOL Visual Representation */}
            <div className="relative mb-12">
              <div className="flex justify-center items-center">
                <div className="relative">
                  {/* eVTOL Body */}
                  <div className="w-64 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/20">
                    {/* Rotors */}
                    <div className="absolute -top-2 -left-4 w-8 h-8 border-2 border-emerald-400 rounded-full animate-spin">
                      <div className="w-full h-0.5 bg-emerald-400 absolute top-1/2 transform -translate-y-1/2"></div>
                      <div className="w-0.5 h-full bg-emerald-400 absolute left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <div className="absolute -top-2 -right-4 w-8 h-8 border-2 border-emerald-400 rounded-full animate-spin">
                      <div className="w-full h-0.5 bg-emerald-400 absolute top-1/2 transform -translate-y-1/2"></div>
                      <div className="w-0.5 h-full bg-emerald-400 absolute left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <div className="absolute -bottom-2 -left-4 w-8 h-8 border-2 border-emerald-400 rounded-full animate-spin">
                      <div className="w-full h-0.5 bg-emerald-400 absolute top-1/2 transform -translate-y-1/2"></div>
                      <div className="w-0.5 h-full bg-emerald-400 absolute left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-4 w-8 h-8 border-2 border-emerald-400 rounded-full animate-spin">
                      <div className="w-full h-0.5 bg-emerald-400 absolute top-1/2 transform -translate-y-1/2"></div>
                      <div className="w-0.5 h-full bg-emerald-400 absolute left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 w-32 h-8 bg-emerald-500 rounded-full blur-sm opacity-50"></div>
                </div>
              </div>
              
              {/* Flying Animation Path */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
            </div>

            {/* AR Immersive Experience Showcase */}
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-emerald-400">
                🚁 IMMERSIVE AR EXPERIENCE 🚁
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-200">AR Windows highlighting landmarks in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-100"></div>
                    <span className="text-gray-200">Interactive flight path visualization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-200"></div>
                    <span className="text-gray-200">Digital scenery overlays on window views</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
                    <span className="text-gray-200">Historical stories and city insights</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gray-700/50 rounded-lg p-4 border-2 border-emerald-500/30">
                    <div className="text-emerald-400 text-sm mb-2">AR Window View</div>
                    <div className="bg-gradient-to-b from-blue-900/30 to-gray-800/50 rounded h-32 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent animate-pulse"></div>
                      <div className="absolute bottom-2 left-2 text-xs text-emerald-300">📍 City Hall - Built 1889</div>
                      <div className="absolute top-2 right-2 text-xs text-emerald-300">🗺️ Route: Downtown</div>
                      <div className="absolute center-4 center-4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            {/* <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-emerald-400">Scheduled Tours</h3>
                <p className="text-gray-300 text-sm">Join curated low-altitude flights with AR-guided storytelling and landmark discovery.</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-emerald-400">Custom Tours</h3>
                <p className="text-gray-300 text-sm">Design personalized routes with AR experiences tailored to your interests and destinations.</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-emerald-400">AR Magic</h3>
                <p className="text-gray-300 text-sm">Revolutionary AR windows transform your view with interactive overlays and immersive storytelling.</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Immersive Experience Details */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              The <span className="text-emerald-400">Immersive Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our revolutionary AR windows don't just show you the city – they bring it to life
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: AR Features */}
            <div className="space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-emerald-500">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm">🏛️</span>
                  Landmark Recognition
                </h3>
                <p className="text-gray-300">
                  Our AI instantly identifies and highlights historical buildings, monuments, and points of interest as you fly past them.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-emerald-500">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm">🗺️</span>
                  Interactive Flight Path
                </h3>
                <p className="text-gray-300">
                  See your real-time route overlaid on the window, with upcoming attractions and optimal photo spots highlighted.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-emerald-500">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm">🎭</span>
                  Digital Scenery Overlays
                </h3>
                <p className="text-gray-300">
                  Watch historical scenes unfold, see how areas looked in the past, or enjoy artistic interpretations of the landscape.
                </p>
              </div>
            </div>

            {/* Right: Visual Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-emerald-500/30">
                <h4 className="text-emerald-400 font-semibold mb-4 text-center">Live AR Window Preview</h4>
                
                {/* Simulated AR Window */}
                <div className="relative bg-gradient-to-b from-blue-900/40 via-gray-700/30 to-gray-800/40 rounded-xl h-64 overflow-hidden border-2 border-emerald-500/20">
                  {/* City skyline representation */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800 via-gray-700 to-transparent"></div>
                  
                  {/* AR Overlays */}
                  <div className="absolute top-4 left-4 bg-emerald-500/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white">
                    📍 Central Library
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-500/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white">
                    ✈️ 150m altitude
                  </div>
                  <div className="absolute bottom-8 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-emerald-300">
                    "Built in 1903, this neo-classical masterpiece..."
                  </div>
                  
                  {/* Animated elements */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 border-2 border-emerald-400 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Flight path line */}
                  <div className="absolute bottom-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60"></div>
                </div>

                <p className="text-gray-400 text-sm mt-4 text-center">
                  Real-time AR information appears as you fly through the city
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready for an <span className="text-emerald-400">Immersive Flight</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Step into the future of urban tourism. Our AR-enhanced eVTOLs offer intimate low-altitude flights 
              where every window becomes a portal to discovery. Book your immersive journey or experience our AR demo first.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/tours"
                className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Book AR Flight Experience
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/demo"
                className="group relative overflow-hidden bg-transparent border-2 border-emerald-500 text-emerald-400 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Try AR Demo
                </span>
                <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-10 pt-8 border-t border-gray-700/50">
              <p className="text-gray-400 text-sm">
                🚁 Low-altitude flights • 🔮 AR-enhanced windows • 🌆 Immersive city tours • 🔋 Zero emissions • 🛡️ Safety certified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-emerald-300 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
    </div>
  );
}
