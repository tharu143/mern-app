import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TutorDashboard from "./components/TutorDashboard";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tutordashboard" element={<TutorDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
