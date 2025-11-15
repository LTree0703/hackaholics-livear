'use client';

import { useEffect, useState } from 'react';

export default function RouteMap({ coordinates }) {
  const [map, setMap] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  
  // Generate unique map ID based on coordinates
  const mapId = `route-map-${coordinates.start[0]}-${coordinates.start[1]}`;

  useEffect(() => {
    let mapInstance = null;
    let animation = null;
    let isMounted = true;

    // Dynamic import of Leaflet to avoid SSR issues
    const loadLeaflet = async () => {
      if (typeof window === 'undefined' || !isMounted) return;

      try {
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // Fix for default markers
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (!isMounted) return;
        setLeafletLoaded(true);

        // Check if map container already exists and clear it
        const mapContainer = document.getElementById(mapId);
        if (!mapContainer || !isMounted) return;
        
        if (mapContainer._leaflet_id) {
          mapContainer._leaflet_id = null;
        }

        // Initialize map
        mapInstance = L.map(mapId, {
          scrollWheelZoom: false,
          dragging: true,
          touchZoom: true,
          doubleClickZoom: true,
        }).setView([coordinates.start[0], coordinates.start[1]], 12);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        // Custom icons
        const startIcon = L.divIcon({
          html: '<div style="background: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: ''
        });

        const endIcon = L.divIcon({
          html: '<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: ''
        });

        const waypointIcon = L.divIcon({
          html: '<div style="background: #f59e0b; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.3);"></div>',
          iconSize: [12, 12],
          iconAnchor: [6, 6],
          className: ''
        });

        // Add start marker
        L.marker(coordinates.start, { icon: startIcon })
          .addTo(mapInstance)
          .bindPopup('<div style="color: #1f2937; font-weight: bold;">🚁 Departure Point</div>');

        // Add end marker
        L.marker(coordinates.end, { icon: endIcon })
          .addTo(mapInstance)
          .bindPopup('<div style="color: #1f2937; font-weight: bold;">🏁 Arrival Point</div>');

        // Add waypoints if available
        if (coordinates.waypoints && coordinates.waypoints.length > 2) {
          coordinates.waypoints.slice(1, -1).forEach((waypoint, index) => {
            L.marker(waypoint, { icon: waypointIcon })
              .addTo(mapInstance)
              .bindPopup(`<div style="color: #1f2937; font-weight: bold;">📍 Waypoint ${index + 1}</div>`);
          });
        }

        // Draw route line
        const routeCoordinates = coordinates.waypoints || [coordinates.start, coordinates.end];
        L.polyline(routeCoordinates, {
          color: '#b91010ff',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 5',
          dashOffset: '0'
        }).addTo(mapInstance);

        // Add animated dashed line effect
        let offset = 0;
        const animateRoute = () => {
          if (!isMounted || !mapInstance) return;
          offset += 1;
          if (offset > 15) offset = 0;
          
          try {
            mapInstance.eachLayer((layer) => {
              if (layer instanceof L.Polyline && layer.options.dashArray) {
                layer.setStyle({ dashOffset: offset });
              }
            });
          } catch (error) {
            // Map might be removed, stop animation
            if (animation) {
              clearInterval(animation);
              animation = null;
            }
          }
        };

        animation = setInterval(animateRoute, 100);

        // Fit map to show all markers with padding
        const group = new L.featureGroup([
          L.marker(coordinates.start),
          L.marker(coordinates.end),
          ...(coordinates.waypoints ? coordinates.waypoints.slice(1, -1).map(wp => L.marker(wp)) : [])
        ]);
        
        if (isMounted && mapInstance) {
          mapInstance.fitBounds(group.getBounds().pad(0.1));
          setMap(mapInstance);
        }

      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    loadLeaflet();

    // Cleanup function for useEffect
    return () => {
      isMounted = false;
      
      if (animation) {
        clearInterval(animation);
        animation = null;
      }
      
      if (mapInstance) {
        try {
          mapInstance.remove();
        } catch (error) {
          // Map might already be removed
          console.log('Map cleanup error (safe to ignore):', error.message);
        }
        mapInstance = null;
      }
      
      setMap(null);
      setLeafletLoaded(false);
    };
  }, [coordinates, mapId]);

  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden border border-gray-600/50">
      <div id={mapId} className="w-full h-full" />
      
      {/* Map overlay with route info */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span>Start</span>
          </div>
          <div className="w-4 h-0.5 bg-gray-400"></div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>End</span>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {!leafletLoaded && (
        <div className="absolute inset-0 bg-gray-800/90 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-2"></div>
            <div className="text-gray-300 text-sm">Loading map...</div>
          </div>
        </div>
      )}
    </div>
  );
}