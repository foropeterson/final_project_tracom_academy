import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ParkingSpots.css";

function ParkingSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/parking-spots?page=${page}&filter=${filter}&sort=${sortOrder}`
        );
        setSpots(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching parking spots. Please try again later.");
        setLoading(false);
      }
    };

    fetchSpots();
  }, [page, filter, sortOrder]);

  if (loading) return <Skeleton count={5} />;
  if (error) return <p>{error}</p>;

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="parking-spots">
      <h1>Available Parking Spots</h1>

      {/* Filter and Sort */}
      <div className="filters">
        <label>
          Filter by status:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </label>

        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Spot Number (Ascending)</option>
            <option value="desc">Spot Number (Descending)</option>
          </select>
        </label>
      </div>

      <div className="spot-list">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={`spot-item ${
              spot.is_available ? "available" : "occupied"
            }`}
            aria-labelledby={`spot-${spot.id}`}
          >
            <h2 id={`spot-${spot.id}`} className="spot-number">
              Spot #{spot.spot_number}
            </h2>
            <p>Vehicle Type: {spot.vehicle_type}</p>
            <p>Status: {spot.is_available ? "Available" : "Occupied"}</p>

            {spot.is_available ? (
              <Link
                to={`/book/${spot.id}`}
                className="book-button"
                aria-label={`Book Spot #${spot.spot_number}`}
              >
                Book Now
              </Link>
            ) : (
              <button className="disabled-button" disabled aria-disabled="true">
                Not Available
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ParkingSpots;
