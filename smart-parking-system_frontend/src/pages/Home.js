// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Parking Management System</h1>
        <p className="intro-text">Find a parking spot and book it easily!</p>
        <div className="home-links">
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
