import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Parking Management System</h1>
        <p className="intro-text">Find a parking spot and book it easily!</p>

        {/* Add Search and Filter Section */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by location"
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>

        {/* Add Links to Features
        <div className="home-links">
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/book" className="btn btn-tertiary">
            Book a Spot
          </Link>
          <Link to="/admin" className="btn btn-admin">
            Admin Dashboard
          </Link>
        </div> */}

        {/* Add Parking Spot Stats (e.g., Number of Available Spots) */}
        <div className="stats">
          <p>Available Parking Spots: 150</p>
          <p>Price Range: 500/= - 2000/=</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
