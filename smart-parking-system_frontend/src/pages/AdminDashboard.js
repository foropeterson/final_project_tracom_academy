import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Custom CSS for styling

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, spotsResponse] = await Promise.all([
          axios.get("/api/bookings"),
          axios.get("/api/parking-spots"),
        ]);
        setBookings(bookingsResponse.data);
        setSpots(spotsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSpotAvailability = async (spotId, isAvailable) => {
    try {
      await axios.put(`/api/parking-spots/${spotId}`, {
        is_available: !isAvailable,
      });
      setSpots((prevSpots) =>
        prevSpots.map((spot) =>
          spot.id === spotId ? { ...spot, is_available: !isAvailable } : spot
        )
      );
    } catch (err) {
      console.error("Error updating parking spot", err);
    }
  };

  const confirmToggle = (spotId, isAvailable) => {
    if (window.confirm("Are you sure you want to change this status?")) {
      toggleSpotAvailability(spotId, isAvailable);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section className="dashboard-section">
        <h2>Manage Parking Spots</h2>
        <table>
          <thead>
            <tr>
              <th>Spot Number</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot) => (
              <tr key={spot.id}>
                <td>#{spot.spot_number}</td>
                <td>{spot.is_available ? "Available" : "Occupied"}</td>
                <td>
                  <button
                    onClick={() => confirmToggle(spot.id, spot.is_available)}
                    title={
                      spot.is_available
                        ? "Mark this spot as occupied"
                        : "Mark this spot as available"
                    }
                  >
                    {spot.is_available
                      ? "Mark as Occupied"
                      : "Mark as Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dashboard-section">
        <h2>Booking History</h2>
        <table>
          <thead>
            <tr>
              <th>Spot Number</th>
              <th>User ID</th>
              <th>Total Fee</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.parking_spot_id}</td>
                <td>{booking.user_id}</td>
                <td>${booking.total_fee.toFixed(2)}</td>
                <td>{new Date(booking.start_time).toLocaleString()}</td>
                <td>{new Date(booking.end_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
