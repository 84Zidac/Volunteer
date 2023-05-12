// Import necessary dependencies from React and react-google-maps
import React from "react";
import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import './Button.css'
import './Input.css'
import { Select, MenuItem } from '@mui/material';

// Define the Map component and receive the addresses prop
export default function Map({ events }) {
  // Declare state variables to store activeMarker, userLocation, and circleDistance
  const [activeMarker, setActiveMarker] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);
  const [circleDistance, setCircleDistance] = React.useState(5);
  const [zipCode, setZipCode] = React.useState(null);


    // Define a function to geocode the zip code and set the userLocation state variable
    function geocodeZipCode() {
      console.log(`Zipcode: ${JSON.stringify(zipCode)}`);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: JSON.stringify(zipCode) }, (results, status) => {
        if (status === "OK") {
          setUserLocation({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          console.error(`Geocode failed for ${zipCode} with status ${status}`);
        }
      });
    }
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error(`Geolocation error: ${error.message}`);
            setUserLocation({ lat: 37.2390, lng: -115.8121 }); // Set default location to Area 51
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setUserLocation({ lat: 37.2390, lng: -115.8121 }); // Set default location to Area 51
      }
    }

  // Use the useEffect hook to get the user's location
  React.useEffect(() => {
    getUserLocation()
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
    return <div>Loading Map...</div>;
  }

  // Return the GoogleMap component with the necessary properties and children components
  return (
    <div id="googleMap">
      <div><button className="nav-button" onClick={getUserLocation} style={{marginBottom: '1em'}}>My Location</button></div>
        <div className="zipcode-form">
          {/* Display a label and input field to allow the user to enter a zip code */}
          <label htmlFor="zipCode" style = {{ color: '#204051', fontWeight: 'bold', fontSize: '1.2em', marginRight: '1em'}}>Search by ZIP:</label>
          <input className="input-field" type="text" id="zipCode" name="zipCode" onChange={(e) => setZipCode(e.target.value)} style={{marginBottom: '1.5em', width: '40%'}}/>
          <button className="nav-button" onClick={geocodeZipCode}>Submit</button>
        </div>
      <div className="distance-select">
        {/* Display a label and select box to allow the user to choose the circle distance */}
        <label htmlFor="distance" style = {{ color: '#204051', marginRight: '1em', fontWeight: 'bold', fontSize: '1.2em'}}>Circle Distance:</label>
        <Select
          id="distance"
          name="distance"
          value={circleDistance}
          onChange={handleCircleDistanceChange}
          style={{marginBottom: '1em', color: '#204051'}}
        >
          <MenuItem value={5} style={{color: '#204051'}}>5 miles</MenuItem>
          <MenuItem value={10} style={{color: '#204051'}}>10 miles</MenuItem>
          <MenuItem value={20} style={{color: '#204051'}}>20 miles</MenuItem>
          <MenuItem value={50} style={{color: '#204051'}}>50 miles</MenuItem>
        </Select>
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
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.15,
            }}
          />
        )}

        {/* Render a marker for each address in the addresses prop */}
        {events && events.map((event, index) => (
          <Marker
            key={index}
            position={null}
            label={`${event.event_name}`}
            onLoad={(marker) => {
              // Geocode the address to get its latitude and longitude
              const geocoder = new window.google.maps.Geocoder();
              let address = `${event.address}`
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
                <>
                <div className="eventDetails"><b>{`${event.organization}`}</b></div>
                <div className="eventDetails"> {`${event.description}`} </div>
                <div className="eventDetails">{`When: ${event.start_time}`}</div>
                <div className="eventDetails">{`${event.address.street}, ${event.address.city}, ${event.address.state} ${event.address.zip}`}</div>
                </>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}
