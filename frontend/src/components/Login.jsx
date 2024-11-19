import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role,
      });

      if (response.data.success) {
        localStorage.setItem("role", role); // Save user role
        localStorage.setItem("email", email); // Save user email
        console.log("Login successful!");

        // Navigate based on role
        if (role === "tutor") {
          console.log("Navigating to Tutor Dashboard");
          navigate("/tutordashboard"); // Redirect to TutorDashboard
        } else if (role === "student") {
          console.log("Navigating to Student Dashboard");
          navigate("/studentdashboard"); // Redirect to StudentDashboard
        }
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <div className="w-full max-w-sm bg-white p-6 shadow-md">
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-2 border"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
