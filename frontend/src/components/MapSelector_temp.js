import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

function MapSelector({ onLocationSelect, initialPosition }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);
  const [nearbyProviders, setNearbyProviders] = useState([]);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (initialPosition) {
      setCurrentPosition(initialPosition);
      fetchNearbyProviders(initialPosition.lat, initialPosition.lng);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
          onLocationSelect(pos);
          fetchNearbyProviders(pos.lat, pos.lng);
          // Also pan the map to the current position if map instance is available
          if (mapRef.current) {
            mapRef.current.setView([pos.lat, pos.lng], 13);
          }
        },
        (err) => {
          setError('Unable to retrieve your location. Please allow location access or try again.');
          console.error('Geolocation error:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, [initialPosition, onLocationSelect]);

  const fetchNearbyProviders = async (lat, lng) => {
    try {
      const response = await fetch(`/api/providers/nearby?lat=${lat}&lng=${lng}&radius=50`);
      if (!response.ok) {
        throw new Error('Failed to fetch nearby providers');
      }
      const data = await response.json();
      setNearbyProviders(data.providers);
    } catch (error) {
      console.error('Error fetching nearby providers:', error);
    }
  };

  useEffect(() => {
    if (destination && currentPosition) {
      if (routingControlRef.current) {
        routingControlRef.current.setWaypoints([L.latLng(currentPosition.lat, currentPosition.lng), L.latLng(destination.lat, destination.lng)]);
      }
    }
  }, [destination, currentPosition]);

  const mapRef = React.useRef(null);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setDestination(e.latlng);
        onLocationSelect(e.latlng);
      },
    });
    return null;
  }

  function onMapCreated(map) {
    mapRef.current = map;
    if (routingControlRef.current) {
      routingControlRef.current.remove();
    }
    if (currentPosition && destination) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(currentPosition.lat, currentPosition.lng),
          L.latLng(destination.lat, destination.lng),
        ],
        lineOptions: {
          styles: [{ color: 'red', opacity: 0.8, weight: 5 }],
        },
        createMarker: function(i, wp) {
          return L.marker(wp.latLng, {
            icon: L.icon({
              iconUrl: i === 0
                ? 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png'
                : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-red.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            }),
          });
        },
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(map);
      // Auto zoom to fit route bounds
      routingControlRef.current.on('routesfound', function(e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const bounds = routes[0].bounds;
          map.fitBounds(bounds);
        }
      });
    }
    // Add markers for nearby providers
    nearbyProviders.forEach(provider => {
      L.marker([provider.lat, provider.lng], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map).bindPopup(`<b>${provider.name}</b>`);
    });
  }

  return (
    <>
      {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}
      <MapContainer
        center={currentPosition || [51.505, -0.09]}
        zoom={13}
        style={{ height: '400px', width: '100%', marginBottom: '1rem', borderRadius: '8px', border: '2px solid #b30000' }}
        whenCreated={onMapCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentPosition && <Marker position={currentPosition} />}
        <MapClickHandler />
      </MapContainer>
    </>
  );
}

export default MapSelector;
