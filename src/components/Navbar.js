// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Assuming you're adding a CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Smart Parking System</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/parking"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Parking Spots
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
