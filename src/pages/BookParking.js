// src/pages/BookParking.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BookParking() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch parking spot details
    axios
      .get(`/api/parking-spots/${spotId}`)
      .then((response) => setSpot(response.data))
      .catch((error) => console.error("Error fetching parking spot", error));
  }, [spotId]);

  // Function to calculate the parking fee
  const calculateFee = (durationInMs, vehicleType) => {
    const rates = {
      car: 5, // $5 per hour
      motorcycle: 2, // $2 per hour
      truck: 10, // $10 per hour
    };

    const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60)); // Convert milliseconds to hours
    return rates[vehicleType] * durationInHours;
  };

  // Handle booking submission
  const handleBooking = async () => {
    const duration = new Date(endTime) - new Date(startTime); // Calculate duration in milliseconds
    const totalFee = calculateFee(duration, spot.vehicle_type); // Calculate total fee

    try {
      // Submit booking data to the API
      await axios.post("/api/bookings", {
        user_id: 1, // Replace with the actual user ID
        parking_spot_id: spot.id,
        start_time: startTime,
        end_time: endTime,
        total_fee: totalFee,
      });

      // Navigate to the parking page after successful booking
      navigate("/parking");
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  // Show a loading message if spot data isn't available yet
  if (!spot) return <p>Loading...</p>;

  return (
    <div>
      <h1>Book Parking Spot #{spot.spot_number}</h1>
      <p>Vehicle Type: {spot.vehicle_type}</p>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button onClick={handleBooking}>Book Spot</button>
    </div>
  );
}

export default BookParking;
