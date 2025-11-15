"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function DemoView() {
    const [isLandscape, setIsLandscape] = useState(false);
    const [activeButton, setActiveButton] = useState("landmarks");
    const [currentTime, setCurrentTime] = useState(0);
    const [selectedPin, setSelectedPin] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const landscapeTimestamps = [
        {
            title: "North Point/Fortress Hill",
            time_start: "0:00",
            time_end: "0:21",
            x_percent: 0.4,
            y_percent: 0.2,
            video_path: "https://www.youtube.com/watch?v=nYZUX1qAX1Y",
        },
        {
            title: "Mid Levels",
            time_start: "0:04",
            time_end: "0:28",
            x_percent: 0.3,
            y_percent: 0.8,
            video_path: "https://www.youtube.com/watch?v=hZgGDB_kxB4",
        },
        {
            title: "Wanchai",
            time_start: "0:15",
            time_end: "0:26",
            x_percent: 0.9,
            y_percent: 0.8,
            video_path: "https://www.youtube.com/watch?v=_q18-Ehrlag",
        },
        {
            title: "Kowloon",
            time_start: "0:26",
            time_end: "1:05",
            x_percent: 0.5,
            y_percent: 0.75,
            video_path: "https://www.youtube.com/watch?v=9vtKEy8dxUQ",
        },
        {
            title: "Hong Kong Island near Victoria Harbour",
            time_start: "0:30",
            time_end: "0:40",
            x_percent: 0.5,
            y_percent: 0.4,
            video_path: "https://www.youtube.com/watch?v=7rLnWlzvGYk",
        },
        {
            title: "Chaiwan",
            time_start: "1:14",
            time_end: "1:21",
            x_percent: 0.5,
            y_percent: 0.6,
            video_path: "https://www.youtube.com/watch?v=2m7twvbCEzo",
        },
        {
            title: "Victoria Peak",
            time_start: "1:28",
            time_end: "1:41",
            x_percent: 0.5,
            y_percent: 0.5,
            video_path: "https://www.youtube.com/shorts/6lrqs-jCqmo",
        },
        {
            title: "Victoria Harbour",
            time_start: "1:41",
            time_end: "1:52",
            x_percent: 0.5,
            y_percent: 0.8,
            video_path: "https://www.youtube.com/watch?v=53mBGprmXRY",
        },
        {
            title: "Mid Levels",
            time_start: "1:51",
            time_end: "2:00",
            x_percent: 0.4,
            y_percent: 0.7,
            video_path: "https://www.youtube.com/watch?v=hZgGDB_kxB4",
        },
    ];

    const handleRestart = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    // Convert time string (M:SS) to seconds
    const timeToSeconds = (timeStr) => {
        const [minutes, seconds] = timeStr.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    // Get active pins based on current video time
    const getActivePins = () => {
        if (activeButton !== 'landmarks') return [];
        return landscapeTimestamps.filter(pin => {
            const start = timeToSeconds(pin.time_start);
            const end = timeToSeconds(pin.time_end);
            return currentTime >= start && currentTime <= end;
        });
    };

    const handlePinClick = (pin) => {
        setSelectedPin(pin);
    };

    const closePopup = () => {
        setSelectedPin(null);
    };

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            try {
                const element = containerRef.current;
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    // Safari iOS support
                    await element.webkitRequestFullscreen();
                } else if (element.webkitEnterFullscreen) {
                    // iOS Safari video fullscreen
                    await element.webkitEnterFullscreen();
                }
                setIsFullscreen(true);
            } catch (error) {
                console.error('Error entering fullscreen:', error);
            }
        } else {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                }
                setIsFullscreen(false);
            } catch (error) {
                console.error('Error exiting fullscreen:', error);
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const checkOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        // Check initial orientation
        checkOrientation();

        // Listen for orientation changes
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);

        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    // Track video time with interval
    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
        }, 100); // Update every 100ms

        return () => clearInterval(interval);
    }, []);



    if (!isLandscape) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-linear-to-br from-emerald-50 to-emerald-100">
                <div className="text-center p-8">
                    <div className="mb-6">
                        <svg
                            className="w-24 h-24 mx-auto text-emerald-800 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-800 mb-4">Please Rotate Your Device</h2>
                    <p className="text-lg text-emerald-700">
                        This demo experience is best viewed in landscape mode
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-[calc(100vh-8rem)] overflow-hidden">
            {/* Fullscreen Button */}
            <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
            >
                {isFullscreen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                )}
            </button>

            {/* Video Background Layer */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="https://cdn.hatimquetta.com/misc/demo_hk.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={activeButton === '1970s' ? {
                    filter: 'sepia(0.8) brightness(0.9) contrast(1.1) saturate(0.7) blur(1px)',
                    imageRendering: 'pixelated'
                } : {}}
            />

            {/* Airplane Window Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#d1d5db" />
                            <stop offset="100%" stopColor="#9ca3af" />
                        </linearGradient>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="10" floodOpacity="0.5" />
                        </filter>
                    </defs>

                    {/* Top curve */}
                    <ellipse
                        cx="50%"
                        cy="0"
                        rx="50%"
                        ry="50"
                        fill="url(#frameGradient)"
                        filter="url(#shadow)"
                    />

                    {/* Bottom curve */}
                    <ellipse
                        cx="50%"
                        cy="100%"
                        rx="50%"
                        ry="50"
                        fill="url(#frameGradient)"
                        filter="url(#shadow)"
                    />

                    {/* Left rectangle */}
                    <rect
                        x="0"
                        y="50"
                        width="140"
                        height="calc(100% - 100)"
                        fill="url(#frameGradient)"
                        filter="url(#shadow)"
                    />

                    {/* Right rectangle */}
                    <rect
                        x="calc(100% - 140)"
                        y="50"
                        width="140"
                        height="calc(100% - 100)"
                        fill="url(#frameGradient)"
                        filter="url(#shadow)"
                    />
                </svg>
            </div>

            {/* Pins Layer - only when landmarks is active */}
            {activeButton === 'landmarks' && (
                <div className="absolute inset-0 pointer-events-none">
                    {getActivePins().map((pin, index) => (
                        <div
                            key={`${pin.title}-${index}`}   
                            className="absolute pointer-events-auto animate-fadeIn cursor-pointer"
                            style={{
                                left: `${pin.x_percent * 100}%`,
                                top: `${pin.y_percent * 100}%`,
                                transform: 'translate(-50%, -100%)'
                            }}
                            onClick={() => handlePinClick(pin)}
                        >
                            {/* Pin marker */}
                            <div className="flex flex-col items-center">
                                <svg className="w-8 h-8 text-emerald-800 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <span className="text-xs font-semibold text-emerald-900 bg-white/90 px-2 py-1 rounded shadow-lg mt-1 whitespace-nowrap">
                                    {pin.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Debug Info - remove after testing */}
            {activeButton === 'landmarks' && (
                <div className="absolute top-20 left-4 bg-black/70 text-white p-2 text-xs rounded pointer-events-none">
                    <div>Current Time: {currentTime.toFixed(2)}s</div>
                    <div>Active Pins: {getActivePins().length}</div>
                </div>
            )}

            {/* Video Popup */}
            {selectedPin && (
                <div className="absolute bottom-20 right-8 w-[30%] bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl pointer-events-auto animate-fadeIn opacity-80">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-emerald-800 px-4 py-2">
                        <h3 className="text-emerald-100 font-semibold text-sm">{selectedPin.title}</h3>
                        <button
                            onClick={closePopup}
                            className="text-emerald-100 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Video */}
                    <div className="aspect-video">
                        <iframe
                            className="w-full h-full"
                            src={`${selectedPin.video_path.replace('watch?v=', 'embed/').replace('shorts/', 'embed/')}?autoplay=1&loop=1&playlist=${selectedPin.video_path.split('v=')[1] || selectedPin.video_path.split('/').pop()}`}
                            title={selectedPin.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            {/* Bottom Control Overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-auto">
                <div
                    className="bg-gray-300/60 backdrop-blur-sm px-8 py-4 rounded-t-lg"
                    style={{
                        transform: "perspective(800px) rotateX(25deg)",
                        transformOrigin: "bottom",
                    }}>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setActiveButton("landmarks");
                            }}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeButton === "landmarks"
                                    ? "bg-emerald-800 text-emerald-100 shadow-lg"
                                    : "bg-white/80 text-emerald-800 hover:bg-white"
                                }`}>
                            View landmarks
                        </button>
                        <button
                            onClick={() => {
                                setActiveButton("1970s");
                                setSelectedPin(null);
                            }}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeButton === "1970s"
                                    ? "bg-emerald-800 text-emerald-100 shadow-lg"
                                    : "bg-white/80 text-emerald-800 hover:bg-white"
                                }`}>
                            Back to the 1970s
                        </button>
                        <button
                            onClick={() => {
                                setActiveButton("flightpath");
                                setSelectedPin(null);
                            }}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeButton === "flightpath"
                                    ? "bg-emerald-800 text-emerald-100 shadow-lg"
                                    : "bg-white/80 text-emerald-800 hover:bg-white"
                                }`}>
                            Flight path
                        </button>
                        <div className="w-px h-8 bg-gray-400/50 mx-1" />
                        <button
                            onClick={handleRestart}
                            className="px-4 py-2 rounded-md text-sm font-semibold transition-all bg-white/80 text-emerald-800 hover:bg-white flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Restart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
