// // VP-react/src/components/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { CalendarComponent } from './Calendar';

export default function UserDashboard() {
  const [volunteerList, setVolunteerList] = useState([]);

  useEffect(() => {
    fetchUserVolunteerList();
  }, []);

  const fetchUserVolunteerList = async () => {
    try {
      const response = await fetch("/user_volunteer_list/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.user_volunteer_list) {
        const sortedVolunteerList = data.user_volunteer_list.sort((a, b) => new Date(a.registration_date) - new Date(b.registration_date));
        setVolunteerList(sortedVolunteerList);
      }
    } catch (error) {
      console.error("Error fetching user volunteer list:", error);
    }
  };
  

  // Group volunteers by registration date
  const groupedVolunteers = volunteerList.reduce((acc, volunteer) => {
    const date = volunteer.registration_date;

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(volunteer);

    return acc;
  }, {});

  return (
    <div>
      <h1>Dashboard</h1>
      <CalendarComponent />
      <p>Currently signed up for:</p>
      {Object.entries(groupedVolunteers).map(([date, volunteers]) => (
        <div key={date}>
          <h2>{date}</h2>
          {volunteers.map((volunteer) => (
            <div key={volunteer.id}>
              {/* <p>Guests: {volunteer.num_guests}</p> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


