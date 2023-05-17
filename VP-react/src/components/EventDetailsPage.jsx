// VP-react/src/components/EventDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const CustomPaper = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#204051",
  // backgroundColor: '#3B6978',
  backgroundColor: '#84A9AC',
  width: "70%",
  padding: "2em",
}));

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`/events/${eventId}`)
      .then(response => response.json())
      .then(data => setEvent(data.event))
      .catch(error => console.error("Error:", error));
  }, [eventId]);

  useEffect(() => {
    if (event && event.address) {
      const addressParts = event.address.split(', ');
      const city = addressParts[1];
      const stateCode = addressParts[2].split(' ')[0];

      async function fetchData() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${stateCode},US&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=imperial`);
        const data = await response.json();
        setWeatherData(data);
      }

      fetchData();
    }
  }, [event]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomPaper>
      <h1>Event Details</h1>
      <p>ID: {event.id}</p>
      <p>Name: {event.event_name}</p>
      <p>Start Time: {event.start_time}</p>
      <p>End Time: {event.end_time}</p>
      <p>Description: {event.description}</p>
      <p>Volunteers Required: {event.volunteers_required}</p>
      <p>Protective Equipment: {event.protective_equipment}</p>
      <p>Address: {event.address}</p>
      <p>Organization: {event.organization}</p>

      {weatherData && (
        <div>
          <h1>5-day forecast for {weatherData.city.name}, {weatherData.city.country}</h1>
          {weatherData.list.map((item, index) => {
            if (index % 8 === 0) {
              return (
                <div key={item.dt}>
                  <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
                  <p>Temperature: {item.main.temp}°F</p>
                  <p>Humidity: {item.main.humidity}%</p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
      </CustomPaper>
    </div>
  );
}
