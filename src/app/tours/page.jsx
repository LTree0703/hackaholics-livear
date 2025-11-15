'use client';

import Link from 'next/link';

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                LiveAR
              </span>
              <span className="text-white"> Tours</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your perfect aerial adventure with our premium eVTOL experiences. 
              From scheduled group tours to custom private flights, discover Hong Kong like never before.
            </p>
          </div>

          {/* Tour Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Scheduled Tours */}
            <Link href="/tours/scheduled_tours" className="group">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚁</div>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    Scheduled Tours
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Join our expertly curated flights with fixed routes, scheduled departures, and professional guides. 
                    Perfect for first-time flyers and group experiences.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Professional AR-enhanced tours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Fixed pricing and schedules</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Group bookings available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Beginner to intermediate levels</span>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium">
                    <span>6 tours available</span>
                    <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Custom Tours */}
            <Link href="/tours/custom_tours" className="group">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    Custom Tours
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Design your own unique aerial experience with personalized routes, flexible timing, 
                    and exclusive access to premium locations.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Fully customizable routes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Flexible scheduling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Private or group options</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Premium experience add-ons</span>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium">
                    <span>Build your tour</span>
                    <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose LiveAR Tours?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the future of aerial tourism with our cutting-edge eVTOL aircraft and immersive AR technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 text-center">
              <div className="text-4xl mb-4">🥽</div>
              <h3 className="text-xl font-semibold text-white mb-3">AR Enhanced Views</h3>
              <p className="text-gray-300 text-sm">
                See Hong Kong like never before with real-time AR overlays showing historical information, 
                architectural details, and hidden stories of the city.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 text-center">
              <div className="text-4xl mb-4">🔋</div>
              <h3 className="text-xl font-semibold text-white mb-3">Zero Emissions</h3>
              <p className="text-gray-300 text-sm">
                Fly guilt-free with our electric vertical take-off aircraft. Sustainable tourism 
                that protects Hong Kong's environment for future generations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-3">Safety First</h3>
              <p className="text-gray-300 text-sm">
                Professional pilots, state-of-the-art safety systems, and comprehensive insurance 
                ensure your aerial adventure is both thrilling and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready for Takeoff?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Don't miss out on Hong Kong's most innovative aerial experience. 
              Book your LiveAR tour today and see the city from a whole new perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tours/scheduled_tours"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Browse Scheduled Tours
              </Link>
              <Link
                href="/demo"
                className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                Try AR Demo First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}