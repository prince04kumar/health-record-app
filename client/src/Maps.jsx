import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet'; 
import redmarker from '../src/assets/redmarker.png'; // Import the custom marker image

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [zoom, setZoom] = useState(13); // Set default zoom level
  const [places, setPlaces] = useState([]); // State to hold nearby places

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          setZoom(15); // Increase zoom when location is available
          fetchNearbyPlaces(userLocation); // Fetch nearby places after getting user location
        },
        (error) => {
          console.log('Error getting location: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // Function to fetch nearby hospitals and doctors using Overpass API
  const fetchNearbyPlaces = (userLocation) => {
    const { lat, lng } = userLocation;

    // Overpass API query for hospitals and doctors within 5000 meters of the user's location
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000,${lat},${lng});
        node["amenity"="doctors"](around:5000,${lat},${lng});
      );
      out body;
    `;

    // Make the API call to Overpass API
    axios
      .get('https://overpass-api.de/api/interpreter', {
        params: {
          data: overpassQuery,
        },
      })
      .then((response) => {
        setPlaces(response.data.elements); // Set nearby places to state
        console.log(response.data.elements); // Log the entire places array
      })
      .catch((error) => {
        console.log('Error fetching places:', error);
      });
  };

  const defaultCenter = [28.38, 77.12]; // Default location if geolocation is not available

  // Create a custom icon for the current location marker
  const currentLocationIcon = new L.Icon({
    iconUrl: redmarker, // Use a custom image or change color
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Position of popup relative to the icon
    shadowSize: [41, 41], // Size of the shadow
  });

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Return distance with 2 decimal places
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Map with User Location and Nearby Hospitals/Doctors</h1>
      <MapContainer
        center={location ? [location.lat, location.lng] : defaultCenter}
        zoom={location ? zoom : 15} // Zoom in closer when location is available
        style={{ height: '400px', width: '100%' }}
        key={location ? `${location.lat}-${location.lng}` : 'default'}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {location && (
          <Marker position={[location.lat, location.lng]} icon={currentLocationIcon}>
            <Popup>Your current location</Popup>
          </Marker>
        )}
        {/* Loop through nearby places and add markers */}
        {places.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lon]}>
            <Popup>
              {place.tags.name ? place.tags.name : 'Unnamed place'} <br />
              Type: {place.tags.amenity} <br />
              Address: {place.tags['addr:street']}, {place.tags['addr:city']}, {place.tags['addr:postcode']} <br />
              Distance: {calculateDistance(location.lat, location.lng, place.lat, place.lon)} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="nearby-places mt-6">
        <h2 className="text-xl font-semibold mb-2">Nearby Hospitals and Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div key={place.id} className="bg-white p-4 rounded shadow-md">
              <div className="font-medium">
                {place.tags.name ? place.tags.name : 'Unnamed place'}
              </div>
              <div>
                Type: {place.tags.amenity}
              </div>
              <div>
                Address: {place.tags['addr:street']}, {place.tags['addr:city']}, {place.tags['addr:postcode']}
              </div>
              <div>
                Distance: {calculateDistance(location.lat, location.lng, place.lat, place.lon)} km
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;
