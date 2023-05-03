import Map from "./Map";
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import { getEvents } from "../utilities";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEvents();
      if (events.success) {
        const addressList = events.map((event) => {
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
  const libraries = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPOv4E9erS7mWYHQXo7Kb58yCiUQcT0X4",
    libraries,
  });

  if (!isLoaded) {
    return (
      <div className="background_photo">
        <img
          src="https://media.istockphoto.com/id/1347280688/vector/group-of-volunteers.jpg?s=612x612&w=0&k=20&c=3rRmrcQm_E-ObRLq0snf5tiuW242011FqFrC3a5L08E="
          alt="Volunteer Compass"
          style={{ height: "100vh", objectFit: "cover", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1}}
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
        style={{ height: "100vh", width: '100%', objectFit: "cover", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
      />
      <div style={{ marginTop: "700px" }}>
      <h1 style={{fontFamily: 'cursive'}}>Welcome</h1>
      <h2>Find Events Near You</h2>
      <div style={{display: "flex", justifyContent: "center"}}>
      <Map addresses={addresses ? addresses : test_addresses} />
      </div>
      </div>
    </>
  );
}





