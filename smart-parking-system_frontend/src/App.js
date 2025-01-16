import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ParkingSpots from "./pages/ParkingSpots";
import BookParking from "./pages/BookParking";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* Add the route for the homepage */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parking" element={<ParkingSpots />} />
        <Route path="/book/:spotId" element={<BookParking />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
