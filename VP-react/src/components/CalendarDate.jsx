// VP-react/src/components/CalendarDate.jsx
import { useParams } from 'react-router-dom';
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useEffect } from 'react';
import "./Button.css";
import "./Input.css";
import "./CalendarDate.css";
import axios from 'axios';
import Map from "./Map";
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const libraries = ["places"];

const CustomPaper = styled(Paper)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#84A9AC',
  width: "70%",
  padding: "2em",
}));

export default function CalendarDate() {
  const { date } = useParams();
  const formattedDate = new Date(date).toDateString();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    async function fetchData() {
      const city = 'Wichita';
      const stateCode = 'KS';
      const countryCode = 'US';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${stateCode},${countryCode}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=imperial`);
      const data = await response.json();
      setWeatherData(data);

      try {
        const isoDate = new Date(date).toISOString().split('T')[0];
        const response2 = await axios.get(`/volunteers_list/${isoDate}`);
        setVolunteers(response2.data.volunteers);
        const response3 = await axios.get(`/events_on_date/${isoDate}`);
        const events = response3.data.events;
        setEvents(events);
      } catch (error) {
        console.log("Error occurred:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [date]);

  const handleUnRegisterClick = async (eventId) => {
    try {
      const isoDate = new Date(date).toISOString().split('T')[0];
      const response = await axios.delete(`/delete_volunteer_registration/${eventId}/${isoDate}`);

      console.log("Response received:", response.data);

      if (response.data.message) {
        alert(response.data.message);
      } else if (response.data.error) {
        alert(response.data.error);
      }
    } catch (error) {
      console.log("Error occurred:", error);
      alert("Error occurred: " + error);
    }
  };

  const handleRegisterClick = async (eventId) => {
    try {
      const isoDate = new Date(date).toISOString().split('T')[0];
      const postData = {
        date: isoDate,
        num_guests: 0,
        event_id: eventId
      };

      console.log("Data to be sent:", postData);

      const response = await axios.post("/register_volunteer/", postData);

      console.log("Response received:", response.data);

      if (response.data.message) {
        alert(response.data.message);
      } else if (response.data.error) {
        alert(response.data.error);
      }
    } catch (error) {
      console.log("Error occurred:", error);
      alert("Error occurred: " + error);
    }
  };

  if (loading) {
    return <div>Loading... </div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CustomPaper>
        <h1>Calendar Date: {formattedDate}</h1>

        <div className="form-container">
          {events && events.length > 0 && (
            <div>
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <div>
                      <Link to={`/event-details/${event.id}`}>
                        Event ID: {event.id} - {event.event_name} - {new Date(event.start_time).toLocaleString([], { hour: '2-digit', minute: '2-digit' })} to {new Date(event.end_time).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                      </Link>
                      <button className="nav-button" onClick={() => handleRegisterClick(event.id)}>Register</button>
                      <button className="nav-button" onClick={() => handleUnRegisterClick(event.id)}>Unregister</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CustomPaper>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Map events={events} register={handleRegisterClick} unregister={handleUnRegisterClick} />
      </div>
    </div>
  );
}
