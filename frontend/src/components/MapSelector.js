import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapSelector.css';

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
  const map = useMap();

  useEffect(() => {
    function handleLocationFound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
    }

    function handleLocationError(e) {
      console.log("Location access denied.", e);
      alert("Please enable location access to use this service.");
      // Keep trying to get location
      setTimeout(() => {
        map.locate({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      }, 2000);
    }

    map.on("locationfound", handleLocationFound);
    map.on("locationerror", handleLocationError);

    // Start watching location
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setPosition(newLatLng);
        map.flyTo(newLatLng, map.getZoom());
      },
      (error) => {
        console.log("Location watch error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    // Initial location request
    map.locate({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    return () => {
      map.off("locationfound", handleLocationFound);
      map.off("locationerror", handleLocationError);
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map, setPosition]);

  return position === null ? null : (
    <Marker 
      position={position}
      draggable={false} // Disable marker dragging
    />
  );
}

function MapSelector({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    // Request permission explicitly
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (result.state === 'denied') {
        setError("Location access is required for this service");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (position) {
      onLocationSelect(position);
      setLoading(false);
    }
  }, [position, onLocationSelect]);

  return (
    <div className="map-container">
      {loading && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>Locating you...</p>
        </div>
      )}
      {error && (
        <div className="map-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      )}
      <MapContainer
        center={[0, 0]}
        zoom={16}
        style={{ height: '400px', width: '100%', marginBottom: '1rem' }}
        dragging={false} // Disable map dragging
        zoomControl={false} // Remove zoom controls
        scrollWheelZoom={false} // Disable zoom with mouse wheel
        doubleClickZoom={false} // Disable zoom on double click
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <p className="map-help-text">
        {position ? 
          "Your current location is being tracked automatically." :
          "Please enable location services when prompted..."}
      </p>
    </div>
  );
}

export default MapSelector;
