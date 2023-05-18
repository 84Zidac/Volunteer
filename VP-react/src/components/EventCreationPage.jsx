// VP-react/src/components/EventCreationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../utilities"; 
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import "./Button.css";
import "./Input.css";
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#204051",
  width:"70%",
  padding:"2em",
}));

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

  // setOrganization
  const navigate = useNavigate();

  // Google Address API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <CustomPaper>
      <h1 style={{color: 'white'}}>Create an Event</h1>

      <form 
        onSubmit={ async(e) => {
          e.preventDefault();

          // Check if end time is after start time
          if (new Date(startTime) >= new Date(endTime)) {
            alert("End time must be after start time");
            return;
          }
          
          await createEvent(
            eventName,
            startTime,
            endTime,
            description,
            volunteersRequired,
            protectiveEquipment,
            streetAddress,
          );
          console.log("startTime:", startTime); 
          console.log("endTime:", endTime); 
          console.log("eventName:", eventName); 
          console.log("description:", description); 
          console.log("volunteersRequired:", volunteersRequired); 
          console.log("protectiveEquipment:", protectiveEquipment); 
          console.log("streetAddress:", streetAddress); 
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
          style={{marginRight:'0'}}
          className="input-field"
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
        />

        <label htmlFor="start_time" style={{color: 'white', fontSize:'1em'}}>Start Time:</label>
        <input
          type="datetime-local"
          id="start_time"
          name="start_time"
          placeholder="Start Time"
          required
          style={{marginRight:'0'}}
          className="input-field"
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
        />

        <label htmlFor="end_time" style={{color: 'white', fontSize:'1em'}}>End Time:</label>
        <input
          type="datetime-local"
          id="end_time"
          name="end_time"
          placeholder="End Time"
          required
          style={{marginRight:'0'}}
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
          style={{marginRight:'0'}}
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
          style={{marginRight:'0'}}
          min="0"
          className="input-field"
          value={volunteersRequired}
          onChange={(e) => setVolunteersRequired(e.target.value)}
        />

        <textarea
          id="protective_equipment"
          name="protective_equipment"
          placeholder="Protective Equipment"
          rows="3"
          style={{marginRight:'0'}}
          className="input-field"
          value={protectiveEquipment}
          onChange={(e) => setProtectiveEquipment(e.target.value)}
        ></textarea>

        <div>
          <GooglePlacesAutocomplete
            selectProps={{
              value: streetAddress,
              onChange: setStreetAddress,
              placeholder: "Select address..."
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

        <button className="nav-button" type="submit" style={{marginTop:'1em'}}>
          Create Event
        </button>
      </form>
    </CustomPaper>
    </div>
  );
}
