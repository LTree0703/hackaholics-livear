'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Hong Kong helipad locations (approximately 20 locations)
const helipadLocations = [
  { id: 1, name: 'Central Helipad', lat: 22.2810, lng: 114.1580, type: 'Commercial', capacity: '4 aircraft' },
  { id: 2, name: 'Tsim Sha Tsui Terminal', lat: 22.2940, lng: 114.1720, type: 'Tourist', capacity: '6 aircraft' },
  { id: 3, name: 'Peak Helipad', lat: 22.2710, lng: 114.1490, type: 'Scenic', capacity: '2 aircraft' },
  { id: 4, name: 'Ocean Terminal Helipad', lat: 22.2950, lng: 114.1680, type: 'Commercial', capacity: '4 aircraft' },
  { id: 5, name: 'Wong Tai Sin Helipad', lat: 22.3430, lng: 114.1940, type: 'Cultural', capacity: '3 aircraft' },
  { id: 6, name: 'Convention Centre Landing', lat: 22.2830, lng: 114.1740, type: 'Events', capacity: '5 aircraft' },
  { id: 7, name: 'Mid-Levels Terminal', lat: 22.2750, lng: 114.1520, type: 'Residential', capacity: '3 aircraft' },
  { id: 8, name: 'Sha Tin Helipad', lat: 22.3820, lng: 114.1990, type: 'New Territories', capacity: '4 aircraft' },
  { id: 9, name: 'Tai Po Landing', lat: 22.4500, lng: 114.1640, type: 'Nature', capacity: '2 aircraft' },
  { id: 10, name: 'Mong Kok Night Terminal', lat: 22.3190, lng: 114.1690, type: 'Entertainment', capacity: '3 aircraft' },
  { id: 11, name: 'Causeway Bay Landing', lat: 22.2800, lng: 114.1850, type: 'Shopping', capacity: '4 aircraft' },
  { id: 12, name: 'Man Mo Temple Landing', lat: 22.2820, lng: 114.1480, type: 'Heritage', capacity: '2 aircraft' },
  { id: 13, name: 'Aberdeen Harbour Pad', lat: 22.2480, lng: 114.1520, type: 'Maritime', capacity: '3 aircraft' },
  { id: 14, name: 'Repulse Bay Terminal', lat: 22.2360, lng: 114.1970, type: 'Beach', capacity: '2 aircraft' },
  { id: 15, name: 'Stanley Market Helipad', lat: 22.2180, lng: 114.2130, type: 'Coastal', capacity: '2 aircraft' },
  { id: 16, name: 'Lantau Island Base', lat: 22.2580, lng: 114.0080, type: 'Airport', capacity: '8 aircraft' },
  { id: 17, name: 'Discovery Bay Landing', lat: 22.2940, lng: 114.0420, type: 'Residential', capacity: '3 aircraft' },
  { id: 18, name: 'Tung Chung Terminal', lat: 22.2890, lng: 114.0110, type: 'Transport', capacity: '4 aircraft' },
  { id: 19, name: 'Kwun Tong Industrial Pad', lat: 22.3080, lng: 114.2260, type: 'Industrial', capacity: '3 aircraft' },
  { id: 20, name: 'Sai Kung Nature Landing', lat: 22.3810, lng: 114.2740, type: 'Nature Reserve', capacity: '2 aircraft' }
];

const HelipadMap = () => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
      
      // Fix for Leaflet default markers in React
      delete leaflet.default.Icon.Default.prototype._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      
      setLeafletLoaded(true);
    });
  }, []);

  // Custom red marker icon
  const redIcon = L && leafletLoaded ? new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }) : null;

  if (!leafletLoaded) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Initializing Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
      <MapContainer
        center={[22.3193, 114.1694]} // Hong Kong center
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {helipadLocations.map((helipad) => (
          <Marker
            key={helipad.id}
            position={[helipad.lat, helipad.lng]}
            icon={redIcon}
          >
            <Popup>
              <div className="text-gray-900 min-w-48">
                <h3 className="font-bold text-lg text-emerald-600 mb-2">
                  🚁 {helipad.name}
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="text-blue-600">{helipad.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Capacity:</span>
                    <span className="text-green-600">{helipad.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className="text-emerald-600">Active</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer">
                    Select for Tours
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HelipadMap;