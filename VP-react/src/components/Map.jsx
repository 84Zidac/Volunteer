// Import necessary dependencies from React and react-google-maps
import React from "react";
import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";

// Define the Map component and receive the addresses prop
export default function Map({ addresses }) {

  // Declare state variables to store activeMarker, userLocation, and circleDistance
  const [activeMarker, setActiveMarker] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);
  const [circleDistance, setCircleDistance] = React.useState(5);

  // Use the useEffect hook to get the user's location
  React.useEffect(() => {
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the userLocation state variable to the user's current location
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Define a function to handle the marker click event
  function handleMarkerClick(marker) {
    // Set the activeMarker state variable to the clicked marker
    setActiveMarker(marker);
  }

  // Define a function to handle the InfoWindow close event
  function handleInfoWindowClose() {
    // Set the activeMarker state variable to null
    setActiveMarker(null);
  }

  // Define a function to handle the circle distance change event
  function handleCircleDistanceChange(event) {
    // Set the circleDistance state variable to the selected distance value
    setCircleDistance(parseInt(event.target.value));
  }

  // If the userLocation state variable is not set, display a message asking the user to enable geolocation
  if (!userLocation) {
    return <div>If map fails to load, please enable geolocation</div>;
  }

  // Return the GoogleMap component with the necessary properties and children components
  return (
    <div id="googleMap">
      <div className="distance-select">
        {/* Display a label and select box to allow the user to choose the circle distance */}
        <label htmlFor="distance">Circle Distance:</label>
        <select
          id="distance"
          name="distance"
          value={circleDistance}
          onChange={handleCircleDistanceChange}
        >
          <option value={5}>5 miles</option>
          <option value={10}>10 miles</option>
          <option value={20}>20 miles</option>
          <option value={50}>50 miles</option>
        </select>
      </div>
      {/* Render the GoogleMap component with the necessary properties */}
      <GoogleMap
        zoom={10}
        center={userLocation}
        mapContainerClassName="map-container"

      >
        {/* Display a circle around the user's location based on the selected distance */}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={circleDistance * 1609.34} // Convert miles to meters
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,fillColor: "#FF0000",
              fillOpacity: 0.15,
            }}
          />
          )}
          
          {/* Render a marker for each address in the addresses prop */}
          {addresses.map((address, index) => (
            <Marker
              key={index}
              position={null}
              label={`${index + 1}`}
              onLoad={(marker) => {
                // Geocode the address to get its latitude and longitude
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address }, (results, status) => {
                  if (status === "OK") {
                    marker.setPosition(results[0].geometry.location);
                  } else {
                    console.error(
                      `Geocode failed for ${address} with status ${status}`
                    );
                  }
                });
              }}
              onClick={() => handleMarkerClick(index)}
            >
              {/* Display an InfoWindow for the active marker */}
              {activeMarker === index && (
                <InfoWindow onCloseClick={handleInfoWindowClose}>
                  <div>{address}</div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    );
  }


