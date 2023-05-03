// /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/components/HomePage.jsx
import Map from "./Map";
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import { getEvents } from "../utilities";
import { useState, useEffect } from "react";

const libraries = ["places"];
export default function HomePage() {
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      if (events.success) {
        const addressList = events.events.map((event) => {
          const { street, city, state, zipcode } = event.address;
          return `${street}, ${city}, ${state} ${zipcode}`;
        });
        setAddresses(addressList);
      }
    };
    fetchData();
  }, []);

  const test_addresses = [
    "3667 Davis Rd, Fairbanks, AK 99709",
    "750 Farmer Rd, Eielson AFB, AK 99702",
    "1190 Fanning Fields Rd, North Pole, AK 99705",
    "380 Old Richardson Hwy, Fairbanks, AK 99701",
    "2895 Yankovich Rd, Fairbanks, AK 99709",
    "3538 International St, North Pole, AK 99705",
    "8955 Alatna Ave, Fairbanks, AK 99709",
    "2551 Richardson Hwy, North Pole, AK 99705",
    "4177 Arctic Blvd #101, Anchorage, AK 99503",
    "1100 Gambell St, Anchorage, AK 99501",
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPOv4E9erS7mWYHQXo7Kb58yCiUQcT0X4",
    libraries,
  });
  if (!isLoaded) {
    return (
      <div>
        <h1>nope Lord's Diner Scheduler</h1>
        <img
          src="https://thelordsdiner.org/wp-content/uploads/2019/12/logo-e1581539139778-300x212.png"
          alt="Lord's Diner logo"
        />
        Loading...
      </div>
    );
  }
  return (
    <>
      <h1>Lord's Diner Scheduler</h1>
      <img
        src="https://thelordsdiner.org/wp-content/uploads/2019/12/logo-e1581539139778-300x212.png"
        alt="Lord's Diner logo"
      />
      <Map addresses={addresses ? addresses : test_addresses} />
    </>
  );
}
