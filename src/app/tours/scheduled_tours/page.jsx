"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchTours } from "../../../lib/tour.js";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function ScheduledToursPage() {
  const [scheduledTours, setScheduledTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const loadTours = async () => {
      try {
        const tours = await fetchTours();
        setScheduledTours(tours);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTours();
  }, []);

  // Filter tours based on selected criteria
  const filteredTours = scheduledTours.filter((tour) => {
    const dateMatch = selectedDate === "all" || tour.date === selectedDate;
    const difficultyMatch =
      selectedDifficulty === "all" || tour.difficulty === selectedDifficulty;

    // Search functionality
    const searchMatch =
      searchQuery === "" ||
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.endLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.highlights.some((highlight) =>
        highlight.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return dateMatch && difficultyMatch && searchMatch;
  });

  // Sort the filtered tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "duration":
        // Convert duration string to minutes for comparison
        const getDurationInMinutes = (duration) => {
          const match = duration.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        comparison =
          getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
        break;
      case "availability":
        comparison = b.availableSeats - a.availableSeats; // More available seats first
        break;
      case "name":
        comparison = a.title.localeCompare(b.title);
        break;
      case "difficulty":
        const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        comparison =
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const getAvailabilityStatus = (availableSeats, totalSeats) => {
    const percentage = (availableSeats / totalSeats) * 100;
    if (percentage === 0)
      return {
        status: "Full",
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
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
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Scheduled
                </span>
                <span className="text-white"> Tours</span>
              </h1>
              {/* <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Join our expertly curated low-altitude flights with immersive AR experiences. 
              Professional guides, fixed routes, and scheduled departures make it easy to book your adventure.
            </p> */}
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">
                  {sortedTours.length} tours available • Next departure in 2
                  hours
                </span>
              </div>
            </div>

            {/* Search, Filters, and Sorting Controls */}
            <div className="max-w-6xl mx-auto mb-8 space-y-4">
              {/* Top Row: Search Bar + Filters */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-end">
                {/* Search Bar - Takes more space */}
                <div className="lg:col-span-6 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search tours by name, location, or highlights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
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
                  )}
                </div>

                {/* Date Filter */}
                <div className="lg:col-span-2">
                  <label className="block text-gray-300 text-xs font-medium mb-1">
                    Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  >
                    <option value="all">All Dates</option>
                    <option value="2025-11-16">Today</option>
                    <option value="2025-11-17">Tomorrow</option>
                  </select>
                </div>

                {/* Level Filter */}
                <div className="lg:col-span-2">
                  <label className="block text-gray-300 text-xs font-medium mb-1">
                    Level
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
              </div>

              {/* Bottom Row: Sorting Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-700/30">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-300 text-sm font-medium whitespace-nowrap">
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 min-w-40"
                    >
                      <option value="date">Departure Time</option>
                      <option value="price">Price</option>
                      <option value="duration">Flight Duration</option>
                      <option value="availability">Availability</option>
                      <option value="name">Tour Name</option>
                      <option value="difficulty">Difficulty Level</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-gray-300 text-sm font-medium whitespace-nowrap">
                      Order:
                    </label>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-emerald-500/50 px-3 py-2 rounded-lg text-white text-sm transition-all duration-300"
                    >
                      {sortOrder === "asc" ? (
                        <>
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
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                          Ascending
                        </>
                      ) : (
                        <>
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          Descending
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Results Info */}
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    {sortedTours.length} tour
                    {sortedTours.length === 1 ? "" : "s"}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span>
                    Sorted by{" "}
                    {sortBy === "date"
                      ? "departure time"
                      : sortBy === "name"
                      ? "tour name"
                      : sortBy}
                    ({sortOrder === "asc" ? "↑" : "↓"})
                  </span>
                </div>
              </div>

              {/* Search Results Summary (only shown when searching/filtering) */}
              {(searchQuery ||
                selectedDate !== "all" ||
                selectedDifficulty !== "all") && (
                <div className="text-center py-2">
                  <p className="text-gray-400 text-sm">
                    {sortedTours.length === 0
                      ? "No tours found matching your criteria"
                      : `Showing ${sortedTours.length} of ${scheduledTours.length} tours`}
                    {searchQuery && (
                      <span className="text-emerald-400">
                        {" "}
                        matching "{searchQuery}"
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tours List */}
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="space-y-6">
              {sortedTours.map((tour) => {
                const availability = getAvailabilityStatus(
                  tour.availableSeats,
                  tour.totalSeats
                );

                return (
                  <div
                    key={tour.id}
                    className="group bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5 overflow-hidden"
                  >
                    <div className="grid lg:grid-cols-5 gap-6 p-6">
                      {/* Tour Image */}
                      <div className="lg:col-span-2 relative">
                        <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl overflow-hidden border border-gray-600/50">
                          <img
                            src={tour.imageUrl}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                          />

                          {/* Overlay with key info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 text-xs text-white/80">
                              <span>📍 {tour.highlights.length} landmarks</span>
                              <span>•</span>
                              <span>🌤️ {tour.weather}</span>
                            </div>
                          </div>

                          {/* Difficulty badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-emerald-400 border border-emerald-500/30">
                              {tour.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tour Details */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                            {tour.title}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {tour.description}
                          </p>
                        </div>

                        {/* Route Information */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-gray-300">
                              {tour.startLocation}
                            </span>
                          </div>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400"></div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300">
                              {tour.endLocation}
                            </span>
                          </div>
                        </div>

                        {/* Schedule Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                            <div className="text-xs text-gray-400 mb-1">
                              Departure
                            </div>
                            <div className="text-white font-semibold">
                              {formatDate(tour.date)}
                            </div>
                            <div className="text-emerald-400 text-sm">
                              {formatTime(tour.time)}
                            </div>
                          </div>
                          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                            <div className="text-xs text-gray-400 mb-1">
                              Duration
                            </div>
                            <div className="text-white font-semibold">
                              {tour.duration}
                            </div>
                            <div className="text-blue-400 text-sm">
                              AR Enhanced
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <div className="text-xs text-gray-400 mb-2">
                            Tour Highlights
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tour.highlights
                              .slice(0, 3)
                              .map((highlight, index) => (
                                <span
                                  key={index}
                                  className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/20"
                                >
                                  {highlight}
                                </span>
                              ))}
                            {tour.highlights.length > 3 && (
                              <span className="text-gray-400 text-xs px-2 py-1">
                                +{tour.highlights.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Booking Section */}
                      <div className="lg:col-span-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* Price */}
                          <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-400">
                              ${tour.price}
                            </div>
                            <div className="text-gray-400 text-sm">
                              per person
                            </div>
                          </div>

                          {/* Availability */}
                          <div className="text-center">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border ${availability.color}`}
                            >
                              <div className="w-2 h-2 rounded-full bg-current"></div>
                              {availability.status}
                            </div>
                            <div className="text-gray-400 text-xs mt-2">
                              {tour.availableSeats} of {tour.totalSeats} seats
                              left
                            </div>
                          </div>

                          {/* Seats visualization */}
                          <div className="flex justify-center gap-1">
                            {Array.from({ length: tour.totalSeats }).map(
                              (_, index) => (
                                <div
                                  key={index}
                                  className={`w-3 h-3 rounded-sm ${
                                    index <
                                    tour.totalSeats - tour.availableSeats
                                      ? "bg-red-500/50"
                                      : "bg-emerald-500/30 border border-emerald-500/50"
                                  }`}
                                ></div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6">
                          <Link
                            href={`/tours/scheduled_tours/${tour.id}`}
                            className={`block w-full text-center font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                              tour.availableSeats > 0
                                ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {tour.availableSeats > 0
                              ? "Know More"
                              : "Fully Booked"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No tours message */}
            {sortedTours.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🚁</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No tours match your criteria
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your filters or check back later for new tours.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDate("all");
                    setSelectedDifficulty("all");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Can't find the perfect tour?
              </h3>
              <p className="text-gray-300 mb-6">
                Create a personalized experience with our custom tour builder,
                or try our AR demo first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tours/custom_tours"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Design Custom Tour
                </Link>
                <Link
                  href="/demo"
                  className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Try AR Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
