// src/pages/ParkingSpots.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ParkingSpots.css"; // Assuming a CSS file for styling

function ParkingSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get("/api/parking-spots");
        setSpots(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching parking spots. Please try again later.");
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="parking-spots">
      <h1>Available Parking Spots</h1>
      <div className="spot-list">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={`spot-item ${
              spot.is_available ? "available" : "occupied"
            }`}
          >
            <h2>Spot #{spot.spot_number}</h2>
            <p>Vehicle Type: {spot.vehicle_type}</p>
            <p>Status: {spot.is_available ? "Available" : "Occupied"}</p>
            {spot.is_available ? (
              <Link to={`/book/${spot.id}`} className="book-button">
                Book Now
              </Link>
            ) : (
              <button className="disabled-button" disabled>
                Not Available
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingSpots;
