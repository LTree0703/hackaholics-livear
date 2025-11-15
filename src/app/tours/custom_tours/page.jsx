'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Custom Route Map Component
function CustomRouteMap({ departure, destination, waypoints }) {
  const [Map, setMap] = useState(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('../../../components/RouteMap').then((module) => {
      setMap(() => module.default);
    }).catch(() => {
      console.log('Map component not available');
    });
  }, []);

  // Generate coordinates for the route map
  const generateRouteCoordinates = () => {
    if (!departure || !destination) return null;

    const routePoints = [departure];
    
    // Add waypoints in order
    waypoints.forEach(waypoint => {
      routePoints.push({
        coordinates: waypoint.coordinates,
        name: waypoint.name
      });
    });
    
    routePoints.push(destination);

    return {
      start: departure.coordinates,
      end: destination.coordinates,
      waypoints: routePoints.map(point => point.coordinates || point.coordinates)
    };
  };

  const routeCoordinates = generateRouteCoordinates();

  if (!Map || !routeCoordinates) {
    return (
      <div className="w-full h-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <div className="text-gray-400">
            {!routeCoordinates ? 'Select departure and destination to view route' : 'Loading Route Map...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Map coordinates={routeCoordinates} />
      
      {/* Route Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span className="text-emerald-400 font-semibold">Departure</span>
          </div>
          <div className="text-white font-medium">{departure?.name}</div>
          <div className="text-gray-400 text-sm">{departure?.district}</div>
        </div>

        {waypoints.length > 0 && (
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-purple-400 font-semibold">Waypoints</span>
            </div>
            <div className="space-y-1">
              {waypoints.map((waypoint, index) => (
                <div key={waypoint.id} className="text-white text-sm">
                  {index + 1}. {waypoint.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-blue-400 font-semibold">Destination</span>
          </div>
          <div className="text-white font-medium">{destination?.name}</div>
          <div className="text-gray-400 text-sm">{destination?.district}</div>
        </div>
      </div>

      {/* Flight Stats */}
      <div className="flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <span className="text-gray-300">
            {waypoints.length + 1} stop{waypoints.length !== 0 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-gray-300">~{30 + (waypoints.length * 10)} min flight</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-300">Zero emissions</span>
        </div>
      </div>
    </div>
  );
}

// Hong Kong helipad locations for selection
const helipadLocations = [
  { id: 1, name: 'Central Helipad', coordinates: [22.2855, 114.1577], district: 'Central', type: 'Premium' },
  { id: 2, name: 'Tsim Sha Tsui Terminal', coordinates: [22.2938, 114.1722], district: 'Tsim Sha Tsui', type: 'Premium' },
  { id: 3, name: 'Ocean Terminal Helipad', coordinates: [22.2945, 114.1685], district: 'Kowloon', type: 'Standard' },
  { id: 4, name: 'Wong Tai Sin Helipad', coordinates: [22.3411, 114.1944], district: 'Wong Tai Sin', type: 'Cultural' },
  { id: 5, name: 'Peak Helipad', coordinates: [22.2703, 114.1394], district: 'The Peak', type: 'Scenic' },
  { id: 6, name: 'Mid-Levels Terminal', coordinates: [22.2769, 114.1435], district: 'Mid-Levels', type: 'Luxury' },
  { id: 7, name: 'Sha Tin Helipad', coordinates: [22.3858, 114.1986], district: 'New Territories', type: 'Nature' },
  { id: 8, name: 'Tai Po Landing', coordinates: [22.4412, 114.1671], district: 'New Territories', type: 'Nature' },
  { id: 9, name: 'Convention Centre Landing', coordinates: [22.2832, 114.1734], district: 'Wan Chai', type: 'Business' },
  { id: 10, name: 'Mong Kok Night Terminal', coordinates: [22.3193, 114.1694], district: 'Mong Kok', type: 'Urban' }
];

// Popular landmarks that can be added as waypoints
const landmarks = [
  { id: 1, name: 'Victoria Peak', coordinates: [22.2703, 114.1394], category: 'Scenic', duration: '10 min' },
  { id: 2, name: 'IFC Tower', coordinates: [22.2871, 114.1583], category: 'Architecture', duration: '5 min' },
  { id: 3, name: 'Bank of China Tower', coordinates: [22.2799, 114.1677], category: 'Architecture', duration: '5 min' },
  { id: 4, name: 'Wong Tai Sin Temple', coordinates: [22.3400, 114.1925], category: 'Cultural', duration: '8 min' },
  { id: 5, name: 'Man Mo Temple', coordinates: [22.2829, 114.1504], category: 'Cultural', duration: '6 min' },
  { id: 6, name: 'Star Ferry Terminal', coordinates: [22.2938, 114.1722], category: 'Historic', duration: '4 min' },
  { id: 7, name: 'Temple Street Market', coordinates: [22.3064, 114.1717], category: 'Local Life', duration: '7 min' },
  { id: 8, name: 'Chi Lin Nunnery', coordinates: [22.3407, 114.1918], category: 'Cultural', duration: '6 min' }
];

// Flight experience options
const experienceTypes = [
  { 
    id: 'standard', 
    name: 'Standard Flight', 
    description: 'Basic aerial tour with professional pilot',
    priceMultiplier: 1.0,
    features: ['Professional pilot', 'Basic safety equipment', 'Photo opportunities']
  },
  { 
    id: 'premium', 
    name: 'AR Enhanced', 
    description: 'Immersive AR experience with historical overlays',
    priceMultiplier: 1.3,
    features: ['AR headset included', 'Historical information', 'Interactive landmarks', 'Digital photo package']
  },
  { 
    id: 'luxury', 
    name: 'Luxury Experience', 
    description: 'Premium service with champagne and luxury amenities',
    priceMultiplier: 1.8,
    features: ['Luxury seating', 'Champagne service', 'Professional photographer', 'Premium AR system', 'Certificate']
  }
];

export default function CustomToursPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('standard');
  const [passengers, setPassengers] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  
  // Calculated values
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate pricing and duration
  useEffect(() => {
    if (selectedDeparture && selectedDestination) {
      // Base calculation (simplified for demo)
      const baseDistance = 20; // km baseline
      const baseDuration = 30; // minutes baseline
      const waypointTime = waypoints.length * 10; // 10 min per waypoint
      
      setEstimatedDuration(baseDuration + waypointTime);
      
      const experience = experienceTypes.find(e => e.id === selectedExperience);
      const calculatedBase = 1800 + (waypoints.length * 400); // Base pricing logic
      const priceWithExperience = calculatedBase * experience.priceMultiplier;
      
      setBasePrice(calculatedBase);
      setTotalPrice(Math.round(priceWithExperience * passengers));
    }
  }, [selectedDeparture, selectedDestination, waypoints, selectedExperience, passengers]);

  const addWaypoint = (landmark) => {
    if (!waypoints.find(w => w.id === landmark.id) && waypoints.length < 3) {
      setWaypoints([...waypoints, landmark]);
    }
  };

  const removeWaypoint = (waypointId) => {
    setWaypoints(waypoints.filter(w => w.id !== waypointId));
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return selectedDeparture && selectedDestination;
      case 2: return selectedExperience;
      case 3: return selectedDate && selectedTime && passengers > 0;
      default: return false;
    }
  };

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccessDialog(true);
    }, 1000);
  };

  const handleSaveQRCode = () => {
    // Create a canvas element to draw the QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    
    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw a simple QR-like pattern (for demo purposes)
    ctx.fillStyle = '#000000';
    const size = 10;
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        if ((i + j) % 3 === 0 || (i % 5 === 0 && j % 7 === 0)) {
          ctx.fillRect(i * size, j * size, size, size);
        }
      }
    }
    
    // Convert to image and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `livear-custom-tour-qr-code.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Header */}
      <section className="pt-20 pb-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <svg className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tours
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Custom
              </span>
              <span className="text-white"> Flight Designer</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create your perfect aerial adventure. Choose your route, add landmarks, and customize your experience.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step ? 'text-blue-400' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Route' : step === 2 ? 'Experience' : 'Details'}
                  </span>
                  {step < 3 && (
                    <div className={`w-16 h-1 ml-4 ${
                      currentStep > step ? 'bg-blue-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Route Selection */}
              {currentStep === 1 && (
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-bold text-white mb-6">Plan Your Route</h2>
                  
                  {/* Departure Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Departure Point</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {helipadLocations.slice(0, 6).map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedDeparture(location)}
                          className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                            selectedDeparture?.id === location.id
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                              : 'bg-gray-800/30 border-gray-600 hover:border-emerald-500/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <div>
                              <div className="font-medium">{location.name}</div>
                              <div className="text-xs text-gray-400">{location.district} • {location.type}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Destination</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {helipadLocations.filter(loc => loc.id !== selectedDeparture?.id).slice(0, 6).map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedDestination(location)}
                          className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                            selectedDestination?.id === location.id
                              ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                              : 'bg-gray-800/30 border-gray-600 hover:border-blue-500/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <div>
                              <div className="font-medium">{location.name}</div>
                              <div className="text-xs text-gray-400">{location.district} • {location.type}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Waypoints */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-300">Add Landmarks (Optional)</label>
                      <span className="text-xs text-gray-400">{waypoints.length}/3 selected</span>
                    </div>
                    
                    {waypoints.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {waypoints.map((waypoint, index) => (
                          <div key={waypoint.id} className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <div>
                                <div className="text-sm font-medium text-purple-400">{waypoint.name}</div>
                                <div className="text-xs text-gray-400">{waypoint.category} • +{waypoint.duration}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeWaypoint(waypoint.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {landmarks.map((landmark) => (
                        <button
                          key={landmark.id}
                          onClick={() => addWaypoint(landmark)}
                          disabled={waypoints.find(w => w.id === landmark.id) || waypoints.length >= 3}
                          className={`p-3 rounded-lg border text-center transition-all duration-300 text-sm ${
                            waypoints.find(w => w.id === landmark.id)
                              ? 'bg-purple-500/20 border-purple-500 text-purple-400 cursor-not-allowed'
                              : waypoints.length >= 3
                              ? 'bg-gray-800/30 border-gray-600 text-gray-500 cursor-not-allowed'
                              : 'bg-gray-800/30 border-gray-600 hover:border-purple-500/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="font-medium">{landmark.name}</div>
                          <div className="text-xs text-gray-400">{landmark.category}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Experience Selection */}
              {currentStep === 2 && (
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-bold text-white mb-6">Choose Your Experience</h2>
                  
                  <div className="space-y-4">
                    {experienceTypes.map((experience) => (
                      <button
                        key={experience.id}
                        onClick={() => setSelectedExperience(experience.id)}
                        className={`w-full p-6 rounded-xl border text-left transition-all duration-300 ${
                          selectedExperience === experience.id
                            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                            : 'bg-gray-800/30 border-gray-600 hover:border-blue-500/50 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold">{experience.name}</h3>
                            <p className="text-sm text-gray-400">{experience.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              +{Math.round((experience.priceMultiplier - 1) * 100)}%
                            </div>
                            <div className="text-xs text-gray-400">price modifier</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {experience.features.map((feature, index) => (
                            <span key={index} className="bg-gray-700/50 text-xs px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Flight Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Flight Route Map */}
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Flight Route</h2>
                    <CustomRouteMap 
                      departure={selectedDeparture}
                      destination={selectedDestination}
                      waypoints={waypoints}
                    />
                  </div>

                  {/* Flight Details Form */}
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6">Flight Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        />
                      </div>

                      {/* Time Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        >
                          <option value="">Select time</option>
                          <option value="09:00">9:00 AM - Morning Golden Hour</option>
                          <option value="11:00">11:00 AM - Mid Morning</option>
                          <option value="14:00">2:00 PM - Afternoon</option>
                          <option value="16:00">4:00 PM - Late Afternoon</option>
                          <option value="18:00">6:00 PM - Sunset Golden Hour</option>
                        </select>
                      </div>

                      {/* Passengers */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Number of Passengers</label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-xl font-semibold w-12 text-center">{passengers}</span>
                          <button
                            onClick={() => setPassengers(Math.min(4, passengers + 1))}
                            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Maximum 4 passengers per flight</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => {
                    setCurrentStep(Math.max(1, currentStep - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={!canProceedToNext()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      canProceedToNext()
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={!canProceedToNext() || isBooking}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      canProceedToNext() && !isBooking
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isBooking ? 'Processing...' : `Book Flight - $${totalPrice}`}
                  </button>
                )}
              </div>
            </div>

            {/* Right Side - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6">Flight Summary</h3>
                
                {/* Route Preview */}
                <div className="mb-6">
                  <div className="space-y-4">
                    {selectedDeparture && (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        <div>
                          <div className="font-medium text-emerald-400">{selectedDeparture.name}</div>
                          <div className="text-xs text-gray-400">Departure • {selectedDeparture.district}</div>
                        </div>
                      </div>
                    )}

                    {waypoints.map((waypoint, index) => (
                      <div key={waypoint.id} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-0.5"></div>
                        <div>
                          <div className="font-medium text-purple-400">{waypoint.name}</div>
                          <div className="text-xs text-gray-400">Waypoint • {waypoint.duration}</div>
                        </div>
                      </div>
                    ))}

                    {selectedDestination && (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div>
                          <div className="font-medium text-blue-400">{selectedDestination.name}</div>
                          <div className="text-xs text-gray-400">Arrival • {selectedDestination.district}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Flight Details */}
                {selectedDate && selectedTime && (
                  <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">Flight Schedule</div>
                    <div className="font-medium text-white">{formatDate(selectedDate)}</div>
                    <div className="text-sm text-gray-300">{selectedTime} • {estimatedDuration} minutes</div>
                  </div>
                )}

                {/* Experience Type */}
                {selectedExperience && (
                  <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">Experience</div>
                    <div className="font-medium text-white">
                      {experienceTypes.find(e => e.id === selectedExperience)?.name}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {totalPrice > 0 && (
                  <div className="border-t border-gray-600 pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Base price</span>
                        <span className="text-white">${basePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Experience upgrade</span>
                        <span className="text-white">+{Math.round((experienceTypes.find(e => e.id === selectedExperience)?.priceMultiplier - 1) * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Passengers ({passengers}x)</span>
                        <span className="text-white">×{passengers}</span>
                      </div>
                      <div className="border-t border-gray-600 pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-white">Total</span>
                          <span className="font-bold text-2xl text-emerald-400">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aircraft Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🚁</div>
                    <div className="text-sm font-medium text-blue-400">eVTOL Aircraft</div>
                    <div className="text-xs text-gray-400">Zero emissions • Ultra-quiet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog with QR Code */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => router.push('/tours')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-3">Custom Flight Booked! 🎉</h3>

              {/* QR Code */}
              <div className="bg-white rounded-xl p-4 mb-4 mx-auto max-w-xs">
                <div className="text-center mb-3">
                  <h4 className="text-base font-bold text-gray-800 mb-1">Your Boarding Pass</h4>
                  <p className="text-xs text-gray-600">Scan this QR code at departure</p>
                </div>
                
                {/* QR Code Pattern (Demo) */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 mx-auto w-32 h-32">
                  <div className="grid grid-cols-10 gap-px h-full">
                    {Array.from({ length: 100 }).map((_, index) => {
                      const row = Math.floor(index / 10);
                      const col = index % 10;
                      const isBlack = (row + col) % 3 === 0 || (row % 4 === 0 && col % 5 === 0) || 
                                     (row < 2 && col < 2) || (row < 2 && col > 7) || (row > 7 && col < 2);
                      return (
                        <div
                          key={index}
                          className={`w-full h-full ${isBlack ? 'bg-black' : 'bg-white'}`}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-600">
                  <p>Booking ID: LA{Date.now().toString().slice(-6)}</p>
                  <p>{formatDate(selectedDate)} • {selectedTime}</p>
                  <p>{passengers} passenger{passengers > 1 ? 's' : ''} • ${totalPrice}</p>
                </div>
              </div>

              {/* Flight Summary */}
              <div className="bg-gray-800/30 rounded-lg p-3 mb-4 text-left text-sm">
                <div className="text-emerald-400 font-semibold mb-2">Flight Summary:</div>
                <div className="space-y-1 text-gray-300">
                  <div>From: {selectedDeparture?.name}</div>
                  {waypoints.length > 0 && (
                    <div>Via: {waypoints.map(w => w.name).join(', ')}</div>
                  )}
                  <div>To: {selectedDestination?.name}</div>
                  <div>Experience: {experienceTypes.find(e => e.id === selectedExperience)?.name}</div>
                  <div>Duration: ~{estimatedDuration} minutes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleSaveQRCode}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Save QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}