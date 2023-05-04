import Map from "./Map";
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import { getEvents } from "../utilities";
import { useState, useEffect } from "react";

const libraries = ["places"];
export default function HomePage() {
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      if (events.success) {
        setAllEvents(events.events);
      }
    };
    fetchData();
  }, []);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPOv4E9erS7mWYHQXo7Kb58yCiUQcT0X4",
    libraries,
  });

  if (!isLoaded) {
    return (
      <div className="background_photo">
        <img
          src="https://thehill.com/wp-content/uploads/sites/2/2023/01/CA_volunteer_01252023istock.jpg?strip=1"
          alt="Volunteer Compass"
          style={{
            height: "100vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        <h1>Welcome</h1>
        Loading...
      </div>
    );
  }

  return (
    <>
      <img
        src="https://thehill.com/wp-content/uploads/sites/2/2023/01/CA_volunteer_01252023istock.jpg?strip=1"
        alt="Volunteer Compass"
        style={{
          height: "100vh",
          width: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <div style={{ marginTop: "700px" }}>
        <h1 style={{ fontFamily: "cursive" }}>Welcome</h1>
        <h2>Find Events Near You</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Map events={allEvents} />
        </div>
      </div>
    </>
  );
}
