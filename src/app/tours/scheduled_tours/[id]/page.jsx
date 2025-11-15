"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { fetchTour, updateTour } from "../../../../lib/tour.js";
import { createBooking } from "../../../../lib/booking.js";
import { useUser } from "@clerk/nextjs";
import { getOrCreateUser } from "../../../../lib/user.js";

// Extended tour details with more comprehensive information
const extendedTourDetails = {
  1: {
    fullDescription:
      "Embark on a breathtaking aerial journey above Hong Kong's iconic Victoria Harbour, where towering skyscrapers meet the shimmering waters in perfect harmony. This immersive AR-enhanced flight showcases the city's architectural marvels, from the gleaming IFC Tower to the historic Star Ferry Terminal. Experience the pulse of one of the world's busiest harbors while our advanced AR overlay reveals hidden stories, architectural secrets, and real-time harbor activity.",
    itinerary: [
      {
        time: "14:00",
        activity: "Departure from Central Helipad",
        description: "Safety briefing and AR equipment setup",
      },
      {
        time: "14:05",
        activity: "IFC Tower Flyby",
        description: "Close-up views of Hong Kong's second tallest building",
      },
      {
        time: "14:15",
        activity: "Victoria Harbour Circuit",
        description: "360-degree harbor views with AR historical overlay",
      },
      {
        time: "14:25",
        activity: "Bank of China Tower Approach",
        description: "Architectural marvel designed by I.M. Pei",
      },
      {
        time: "14:35",
        activity: "Star Ferry Terminal Landing Zone",
        description: "Views of historic ferry operations",
      },
      {
        time: "14:45",
        activity: "Arrival at Tsim Sha Tsui Terminal",
        description: "Tour completion and equipment return",
      },
    ],
    inclusions: [
      "Professional pilot and AR tour guide",
      "State-of-the-art AR headset and audio system",
      "Safety equipment and pre-flight briefing",
      "Complimentary refreshments at departure lounge",
      "Digital photo package of your flight experience",
      "Certificate of completion",
    ],
    restrictions: [
      "Minimum age: 12 years old",
      "Maximum weight: 120kg per passenger",
      "No pregnant passengers",
      "Weather dependent (alternative dates offered)",
      "Valid ID required for all passengers",
    ],
    coordinates: {
      start: [22.2855, 114.1577], // Central Helipad
      end: [22.2938, 114.1722], // Tsim Sha Tsui Terminal
      waypoints: [
        [22.2855, 114.1577], // Central Helipad
        [22.2871, 114.1583], // IFC Tower
        [22.283, 114.162], // Mid-harbour
        [22.2799, 114.1677], // Bank of China Tower area
        [22.2938, 114.1722], // Tsim Sha Tsui Terminal
      ],
    },
  },
  2: {
    fullDescription:
      "Discover the spiritual heart of Hong Kong through this unique aerial journey that combines ancient traditions with modern cityscapes. Soar above sacred temples, traditional markets, and cultural heritage sites while our AR technology reveals the fascinating stories, legends, and cultural significance of each landmark. This tour offers a rare perspective on Hong Kong's rich multicultural heritage and the harmonious blend of East and West.",
    itinerary: [
      {
        time: "16:30",
        activity: "Departure from Wong Tai Sin Helipad",
        description: "Traditional blessing ceremony and equipment setup",
      },
      {
        time: "16:35",
        activity: "Wong Tai Sin Temple Overview",
        description: "AR-enhanced views of the colorful Taoist temple",
      },
      {
        time: "16:45",
        activity: "Chi Lin Nunnery Approach",
        description: "Tang Dynasty architecture and lotus pond gardens",
      },
      {
        time: "16:55",
        activity: "Temple Street Market Flyover",
        description: "Bustling night market preparation views",
      },
      {
        time: "17:05",
        activity: "Man Mo Temple District",
        description: "Historic Hollywood Road temple complex",
      },
      {
        time: "17:30",
        activity: "Landing at Man Mo Temple Area",
        description: "Ground-level temple visit opportunity",
      },
    ],
    inclusions: [
      "Cultural heritage specialist guide",
      "Advanced AR system with historical recreations",
      "Traditional tea ceremony at departure",
      "Temple blessing and good luck charm",
      "Professional photography service",
      "Cultural heritage guidebook",
    ],
    restrictions: [
      "Minimum age: 16 years old",
      "Respectful attire required",
      "No flash photography near temples",
      "Cultural sensitivity briefing mandatory",
      "Weather and air traffic dependent",
    ],
    coordinates: {
      start: [22.3411, 114.1944], // Wong Tai Sin Helipad
      end: [22.2829, 114.1504], // Man Mo Temple Landing
      waypoints: [
        [22.3411, 114.1944], // Wong Tai Sin Helipad
        [22.34, 114.1925], // Wong Tai Sin Temple
        [22.3407, 114.1918], // Chi Lin Nunnery
        [22.3064, 114.1717], // Temple Street Market
        [22.2829, 114.1504], // Man Mo Temple Landing
      ],
    },
  },
  // Add more tour details as needed...
};

// Basic tour data that matches the scheduled_tours page
const basicTourData = {
  1: {
    title: "Victoria Harbour Skyline Experience",
    description:
      "Soar above Hong Kong's iconic Victoria Harbour with breathtaking views of the world-famous skyline and bustling harbor.",
    startLocation: "Central Helipad",
    endLocation: "Tsim Sha Tsui Terminal",
    date: "2025-11-16",
    time: "14:00",
    duration: "45 minutes",
    price: 2299,
    totalSeats: 4,
    availableSeats: 2,
    highlights: [
      "IFC Tower",
      "Bank of China Tower",
      "Peak Tram",
      "Star Ferry Pier",
    ],
    difficulty: "Beginner",
    weather: "Clear",
  },
  2: {
    title: "Cultural Heritage & Temple Journey",
    description:
      "Discover Hong Kong's rich cultural tapestry through AR-enhanced views of ancient temples, traditional markets, and heritage sites.",
    startLocation: "Wong Tai Sin Helipad",
    endLocation: "Man Mo Temple Landing",
    date: "2025-11-16",
    time: "16:30",
    duration: "60 minutes",
    price: 2699,
    totalSeats: 4,
    availableSeats: 1,
    highlights: [
      "Wong Tai Sin Temple",
      "Man Mo Temple",
      "Temple Street Night Market",
      "Chi Lin Nunnery",
      "Nan Lian Garden",
    ],
    difficulty: "Intermediate",
    weather: "Partly Cloudy",
  },
};

// Route Map Component
function RouteMap({ coordinates }) {
  const [Map, setMap] = useState(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import("../../../../components/RouteMap")
      .then((module) => {
        setMap(() => module.default);
      })
      .catch(() => {
        console.log("Map component not available");
      });
  }, []);

  if (!Map) {
    return (
      <div className="w-full h-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <div className="text-gray-400">Loading Route Map...</div>
        </div>
      </div>
    );
  }

  return <Map coordinates={coordinates} />;
}

export default function TourDetailPage({ params }) {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  const tourId = resolvedParams?.id;

  const [tour, setTour] = useState(null);
  const [extendedDetails, setExtendedDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const loadTours = async () => {
      try {
        if (!tourId) {
          console.error("Tour ID is missing");
          setLoading(false);
          return;
        }
        console.log("Fetching tour with ID:", tourId);
        const fetchedTour = await fetchTour(tourId);
        console.log("Fetched tour:", fetchedTour);
        setTour(fetchedTour);
        setExtendedDetails(fetchedTour?.extendedDetails);
      } catch (error) {
        console.error("Failed to fetch tour:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTours();
  }, [tourId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚁</div>
          <p className="text-gray-400">Loading tour...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-gray-400 mb-6">
            The requested tour could not be found.
          </p>
          <Link
            href="/tours/scheduled_tours"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const handleEnrollClick = () => {
    if (tour.availableSeats === 0) return;
    setShowConfirmation(true);
  };

  const handleConfirmEnrollment = async () => {
    setIsEnrolling(true);
    try {
      const fetchedUser = await getOrCreateUser(
        user.emailAddresses[0].emailAddress,
        user.id
      );

      // Create booking
      await createBooking(fetchedUser.id, tourId, 1);

      // Update tour to decrease availableSeats
      await updateTour(tourId);

      // Refresh tour data
      const updatedTour = await fetchTour(tourId);
      setTour(updatedTour);

      // Show success dialog
      setIsEnrolling(false);
      setShowConfirmation(false);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Enrollment failed:", error);
      setIsEnrolling(false);
      alert("Enrollment failed. Please try again.");
    }
  };

  const handleSaveQRCode = () => {
    // Create a canvas element to draw the QR code
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);

    // Draw a simple QR-like pattern (for demo purposes)
    ctx.fillStyle = "#000000";
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
      const a = document.createElement("a");
      a.href = url;
      a.download = `livear-tour-${tourId}-qr-code.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour12 =
      parseInt(hours) > 12 ? parseInt(hours) - 12 : parseInt(hours);
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getAvailabilityStatus = (availableSeats, totalSeats) => {
    const percentage = (availableSeats / totalSeats) * 100;
    if (percentage === 0)
      return {
        status: "Fully Booked",
        color: "text-red-400 bg-red-500/10 border-red-500/20",
      };
    if (percentage <= 25)
      return {
        status: "Almost Full",
        color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      };
    if (percentage <= 50)
      return {
        status: "Filling Fast",
        color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      };
    return {
      status: "Available",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    };
  };

  const availability = getAvailabilityStatus(
    tour.availableSeats,
    tour.totalSeats
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚁</div>
          <p className="text-gray-400">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Header */}
      <section className="pt-20 pb-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/tours/scheduled_tours"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <svg
                className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Scheduled Tours
            </Link>
          </div>

          {/* Tour Title and Status */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                    {tour.title}
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-4">{tour.description}</p>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-300">
                      {formatDate(tour.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">
                      {formatTime(tour.time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">{tour.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Price and Availability Card */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 min-w-80">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">
                    ${tour.price}
                  </div>
                  <div className="text-gray-400">per person</div>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${availability.color} mb-4 w-full justify-center`}
                >
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  {availability.status}
                </div>

                <div className="text-center text-gray-400 text-sm mb-4">
                  {tour.availableSeats} of {tour.totalSeats} seats remaining
                </div>

                {/* Seats visualization */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: tour.totalSeats }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-sm ${
                        index < tour.totalSeats - tour.availableSeats
                          ? "bg-red-500/50"
                          : "bg-emerald-500/30 border border-emerald-500/50"
                      }`}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={handleEnrollClick}
                  disabled={tour.availableSeats === 0}
                  className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    tour.availableSeats > 0
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {tour.availableSeats > 0 ? "Enroll Now" : "Fully Booked"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route Map */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 mb-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              Flight Route
            </h2>

            {extendedDetails?.coordinates ? (
              <RouteMap coordinates={extendedDetails.coordinates} />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚁</div>
                  <div className="text-gray-400">Route map not available</div>
                </div>
              </div>
            )}

            {/* Route Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-emerald-400 font-semibold">
                    Departure
                  </span>
                </div>
                <div className="text-white font-medium">
                  {tour.startLocation}
                </div>
                <div className="text-gray-400 text-sm">
                  {formatTime(tour.time)}
                </div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 font-semibold">Arrival</span>
                </div>
                <div className="text-white font-medium">{tour.endLocation}</div>
                <div className="text-gray-400 text-sm">
                  {(() => {
                    const [hours, minutes] = tour.time.split(":");
                    const durationMinutes = parseInt(
                      tour.duration.match(/\d+/)[0]
                    );
                    const endTime = new Date();
                    endTime.setHours(
                      parseInt(hours),
                      parseInt(minutes) + durationMinutes
                    );
                    return endTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 mb-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              About This Experience
            </h2>

            {extendedDetails?.fullDescription ? (
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {extendedDetails.fullDescription}
              </p>
            ) : (
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {tour.description}
              </p>
            )}

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Tour Highlights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-3 py-2 rounded-lg text-center"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary and Details */}
      {extendedDetails && (
        <section className="pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Itinerary */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                  Flight Itinerary
                </h2>

                <div className="space-y-4">
                  {extendedDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {item.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {item.activity}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Restrictions */}
              <div className="space-y-8">
                {/* Inclusions */}
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                    What's Included
                  </h2>

                  <ul className="space-y-3">
                    {extendedDetails.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions */}
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                    Important Information
                  </h2>

                  <ul className="space-y-3">
                    {extendedDetails.restrictions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tours/scheduled_tours"
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go Back
              </Link>

              <button
                onClick={handleEnrollClick}
                disabled={tour.availableSeats === 0}
                className={`flex items-center justify-center gap-2 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  tour.availableSeats > 0
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {tour.availableSeats > 0 ? "Enroll Now" : "Fully Booked"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Confirm Enrollment
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to enroll in{" "}
                <span className="text-emerald-400 font-semibold">
                  "{tour.title}"
                </span>{" "}
                for{" "}
                <span className="text-emerald-400 font-semibold">
                  ${tour.price}
                </span>
                ?
              </p>

              <div className="space-y-3 text-left mb-6 bg-gray-800/50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{formatDate(tour.date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{formatTime(tour.time)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{tour.duration}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-700 pt-3 font-semibold">
                  <span className="text-gray-300">Total:</span>
                  <span className="text-emerald-400">${tour.price}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEnrollment}
                  disabled={isEnrolling}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEnrolling ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog with QR Code */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 max-w-md w-full max-h-[66vh]">
            {/* Close Button */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => router.push("/tours")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                Enrollment Successful! 🎉
              </h3>

              {/* QR Code */}
              <div className="bg-white rounded-xl p-4 mb-4 mx-auto max-w-xs">
                <div className="text-center mb-3">
                  <h4 className="text-base font-bold text-gray-800 mb-1">
                    Your Boarding Pass
                  </h4>
                  <p className="text-xs text-gray-600">
                    Scan this QR code at the helipad
                  </p>
                </div>

                {/* QR Code Pattern (Demo) */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 mx-auto w-32 h-32">
                  <div className="grid grid-cols-10 gap-px h-full">
                    {Array.from({ length: 100 }).map((_, index) => {
                      const row = Math.floor(index / 10);
                      const col = index % 10;
                      const isBlack =
                        (row + col) % 3 === 0 ||
                        (row % 4 === 0 && col % 5 === 0) ||
                        (row < 2 && col < 2) ||
                        (row < 2 && col > 7) ||
                        (row > 7 && col < 2);
                      return (
                        <div
                          key={index}
                          className={`w-full h-full ${
                            isBlack ? "bg-black" : "bg-white"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-600">
                  <p>
                    Booking ID: LA{tourId}25{Date.now().toString().slice(-6)}
                  </p>
                  <p>
                    {formatDate(tour.date)} • {formatTime(tour.time)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleSaveQRCode}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Save QR Code
                </button>

                {/* <div className="text-xs text-gray-400 space-y-1">
                  <p>Confirmation email sent to your inbox</p>
                  <p>SMS reminders 24 hours before flight</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
