// VP-react/src/components/EventCreationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../utilities"; 
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import "./Button.css";
import "./Input.css";

const libraries = ["places"];

// export default function EventCreationPage = () => {
export default function EventCreationPage() {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [volunteersRequired, setVolunteersRequired] = useState("");
  const [protectiveEquipment, setProtectiveEquipment] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [organization, setOrganization] = useState("BBB");

  // setOrganization
  const navigate = useNavigate();

  // Google Address API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPOv4E9erS7mWYHQXo7Kb58yCiUQcT0X4",
    libraries,
  });
  
  return (
    <div>
      <h1>Create an Event</h1>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          createEvent(
            eventName,
            startTime,
            endTime,
            description,
            volunteersRequired,
            protectiveEquipment,
            streetAddress,
            organization
          );
          console.log("startTime:", startTime); 
          console.log("endTime:", endTime); 
          console.log("eventName:", eventName); 
          console.log("description:", description); 
          console.log("volunteersRequired:", volunteersRequired); 
          console.log("protectiveEquipment:", protectiveEquipment); 
          console.log("streetAddress:", streetAddress); 
          console.log("organization:", organization)
          setEventName("");
          setStartTime("");
          setEndTime("");
          setDescription("");
          setVolunteersRequired("");
          setProtectiveEquipment("");
          setStreetAddress("");

          navigate("/organizer/dashboard");
        }}
      style={{ display: "flex", flexDirection: "column" }}>

        <input
          type="text"
          id="event_name"
          name="event_name"
          placeholder="Event Name"
          required
          className="input-field"
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
        />

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="datetime-local"
          id="start_time"
          name="start_time"
          placeholder="Start Time"
          required
          className="input-field"
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
        />

        <label htmlFor="end_time">End Time:</label>
        <input
          type="datetime-local"
          id="end_time"
          name="end_time"
          placeholder="End Time"
          required
          className="input-field"
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
        />

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="5"
          required
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="number"
          id="volunteers_required"
          name="volunteers_required"
          placeholder="Volunteers Required"
          required
          className="input-field"
          value={volunteersRequired}
          onChange={(e) => setVolunteersRequired(e.target.value)}
        />

        <textarea
          id="protective_equipment"
          name="protective_equipment"
          placeholder="Protective Equipment"
          rows="3"
          className="input-field"
          value={protectiveEquipment}
          onChange={(e) => setProtectiveEquipment(e.target.value)}
        ></textarea>

        <div>
          <GooglePlacesAutocomplete
            selectProps={{
              value: streetAddress,
              onChange: setStreetAddress,
            }}
            >
            <input
              type="text"
              id="street_address"
              name="street_address"
              placeholder="Street Address"
              required
              className="input-field"
              // value={streetAddress}
              // onChange={(e) => setStreetAddress(e.target.value)}
            />
          </GooglePlacesAutocomplete>
        </div>
        
        <input
          type="text"
          id="organization"
          name="organization"
          placeholder="Organization"
          required
          className="input-field"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />

        <button className="nav-button" type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
}
