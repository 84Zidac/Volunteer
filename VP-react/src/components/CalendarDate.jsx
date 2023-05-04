// /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/components/CalendarDate.jsx
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./Button.css";
import "./Input.css";
import "./CalendarDate.css";
import axios from 'axios';


export default function CalendarDate() {
  const { date } = useParams();
  const formattedDate = new Date(date).toDateString();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [volunteers, setVolunteers] = useState([]); 
  

    useEffect(() => {
      async function fetchData() {
        // Fetch weather data
        // const city = 'Wichita';
        // const countryCode = 'us';
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=imperial`);
        const city = 'Wichita';
        const stateCode = 'KS';
        const countryCode = 'US';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${stateCode},${countryCode}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=imperial`);
        const data = await response.json();
        setWeatherData(data);

        // Fetch volunteers list // * * * * * * * * * * 
        try {
          const isoDate = new Date(date).toISOString().split('T')[0];
          const response2 = await axios.get(`/volunteers_list/${isoDate}`);
          setVolunteers(response2.data.volunteers);
        } catch (error) {
          console.log("Error occurred:", error);
        }

        setLoading(false);
      }
      fetchData();
    }, [date]);
 
  // * * * * * * * * * * * * * * * * * * * * * * * * 


  // * * * * * * * * * * * * * * * * * * * * * * * * 
  const handleUnRegisterClick = async () => {
    try {
        const isoDate = new Date(date).toISOString().split('T')[0];
        // const numGuests = document.getElementById("guestVolunteer").value; // * * * * * * * *
        // console.log(`Unregistering ${numGuests} guests for ${isoDate}`); // * * * * * * 

        const response = await axios.delete(`/delete_volunteer_registration/${isoDate}`); // * * * * * *

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
  // * * * * * * * * * * * * * * * * * * * * * * * * 
  const handleRegisterClick = async () => {
    try {
      const isoDate = new Date(date).toISOString().split('T')[0]; // Convert date to ISO format and extract date part
      const postData = {
        date: isoDate,
        num_guests: document.getElementById("guestVolunteer").value,
        // event_id: 1
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

  //  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

  
  
  // * * * * * * * * * * * * * * * * * * * * * * * * 

  if (loading) {
    return <div>Loading... </div>;
  }

return (
  <div>
    <h1>Calendar Date: {formattedDate}</h1>
    {weatherData && (
      <div>
        <h1>5-day forecast for {weatherData.city.name}, {weatherData.city.country}</h1>
        {weatherData.list.map((item, index) => {
          // Display data for every 8th item in the list, which corresponds to every day
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

    <div className="form-container">
      <form>
        <label htmlFor="guestVolunteer">Number of Guests</label>
        <input
          id="guestVolunteer"
          type="number"
          min="0"
          defaultValue="0"
          className="input-field"
        />
      </form>
      <input
        type="Register"
        value="Register"
        className="nav-button"
        onClick={handleRegisterClick}
      />
    </div>

    <input
      type="Unregister"
      value="Unregister"
      className="nav-button"
      onClick={handleUnRegisterClick}
    />

    {volunteers && volunteers.length > 0 && (
      <div>
        <h2>Volunteers for {formattedDate}</h2>
        <ul>
          {volunteers.map((v) => (
            <li key={v.id}>
              {v.name} - {v.num_guests} guests
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
          }


  // const handleRegisterClick = async () => {
  //   try {
  //     const isoDate = new Date(date).toISOString().split('T')[0]; // Convert date to ISO format and extract date part
  //     const numGuests = document.getElementById("guestVolunteer").value;
  //     console.log(`Registering ${numGuests} guests for ${isoDate}`);
  
  //     const postData = {
  //       date: isoDate,
  //       num_guests: numGuests,
  //     };
  
  //     console.log("Data to be sent:", postData);
  
  //     const response = await axios.post("/register_volunteer/", postData);
  
  //     console.log("Response received:", response.data);
  
  //     if (response.data.message) {
  //       alert(response.data.message);
  //     } else if (response.data.error) {
  //       alert(response.data.error);
  //     }
  //   } catch (error) {
  //     console.log("Error occurred:", error);
  //     alert("Error occurred: " + error);
  //   }
  // };
