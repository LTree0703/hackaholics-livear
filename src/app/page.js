'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const HelipadMapComponent = dynamic(() => import('../components/HelipadMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading Hong Kong Helipad Map...</p>
      </div>
    </div>
  )
});

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
            <div className="relative py-12">
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
        </div>
      </div>
      </section>

      {/* Immersive Experience Details */}
      <section className="relative z-10 mb-16 px-6">
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

      {/* Book Your Experience Section */}
      <section className="relative z-10 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Choose Your <span className="text-emerald-400">AR Flight Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Step into the future of urban tourism with our AR-enhanced eVTOL flights. 
              Select the experience that fits your adventure style.
            </p>
          </div>

          {/* Hong Kong Helipad Map */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                <span className="text-emerald-400">Helipad Network</span> Across Hong Kong
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Explore our extensive network of 20 helipads strategically located across Hong Kong. 
                Click on any red marker to view helipad details and available tour options.
              </p>
            </div>
            
            <div className="relative">
              {/* Map Container with Dynamic Import */}
              <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Active Helipad Locations</span>
                  </div>
                  <div className="text-emerald-400 text-sm font-medium">
                    20 Locations Available
                  </div>
                </div>
                
                {/* Map will be rendered here */}
                <HelipadMapComponent />
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Commercial Hubs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Scenic Locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Cultural Sites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Nature Reserves</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Options Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Scheduled Tours */}
            <Link href="/tours/scheduled_tours" className="group">
              <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-400 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-emerald-400 text-center group-hover:text-emerald-300 transition-colors">Scheduled Tours</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Join our expertly curated flights. Perfect for first-time visitors with pre-planned routes and AR storytelling.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Group experience with expert guides</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Fixed routes with landmark highlights</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>45-60 minute flights available daily</span>
                  </div>
                </div>

                <div className="text-center py-4 border-t border-gray-700/50">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">From $299</div>
                  <div className="text-gray-400 text-sm">per person</div>
                </div>
                
                <div className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                  Book Scheduled Tour
                </div>
              </div>
            </Link>

            {/* Custom Tours */}
            <Link href="/tours/custom_tours" className="group">
              <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-400 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400 text-center group-hover:text-blue-300 transition-colors">Custom Tours</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Design your personalized flight route with AR experiences tailored to your interests. Private aircraft with flexible timing.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Private eVTOL with personal guide</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Choose your route and destinations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>30-90 minutes, flexible scheduling</span>
                  </div>
                </div>

                <div className="text-center py-4 border-t border-gray-700/50">
                  <div className="text-2xl font-bold text-blue-400 mb-1">From $599</div>
                  <div className="text-gray-400 text-sm">per flight</div>
                </div>
                
                <div className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  Design Custom Tour
                </div>
              </div>
            </Link>

            {/* AR Demo */}
            <Link href="/demo" className="group">
              <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-400 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-400 text-center group-hover:text-purple-300 transition-colors">AR Technology Demo</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  Experience our revolutionary AR windows before you fly. Interactive ground-based demonstration of all AR features.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Interactive AR window simulation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>No flight required, ground-based</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>15-20 minutes, walk-in available</span>
                  </div>
                </div>

                <div className="text-center py-4 border-t border-gray-700/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">Free</div>
                  <div className="text-gray-400 text-sm">experience</div>
                </div>
                
                <div className="mt-6 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center group-hover:shadow-lg group-hover:shadow-purple-500/25">
                  Try AR Demo
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center">
            <h3 className="text-2xl font-bold mb-6 text-emerald-400">Why Choose LiveAR Sky Tours?</h3>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">�️</div>
                <div className="text-emerald-400 font-semibold mb-2">Safety First</div>
                <p className="text-gray-300">Certified pilots with extensive eVTOL experience</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">🔮</div>
                <div className="text-emerald-400 font-semibold mb-2">AR Innovation</div>
                <p className="text-gray-300">Revolutionary AR windows with immersive overlays</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">🌱</div>
                <div className="text-emerald-400 font-semibold mb-2">Eco-Friendly</div>
                <p className="text-gray-300">Zero emissions electric aircraft technology</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3">🌆</div>
                <div className="text-emerald-400 font-semibold mb-2">Low Altitude</div>
                <p className="text-gray-300">Intimate city views at optimal flying heights</p>
              </div>
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
