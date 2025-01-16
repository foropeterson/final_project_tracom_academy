import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink
          to="/"
          style={{textDecoration:"none"}}
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <h1>Smart Parking</h1>
        </NavLink>
      </div>
      <div
        className={`hamburger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/parking"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            View Parking Spots
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Admin Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
