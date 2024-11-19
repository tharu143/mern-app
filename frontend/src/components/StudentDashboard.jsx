import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    course: "",
  });

  // Retrieve the logged-in student's email from localStorage
  const email = localStorage.getItem("email");

  // Fetch student profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/${email}`);
        setProfile(response.data);  // Set the profile state with the fetched data
      } catch (err) {
        console.error(err.response.data.message);  // Handle errors (if any)
      }
    };
    if (email) {
      fetchProfile();  // Only fetch if the email exists in localStorage
    }
  }, [email]);

  // Handle the profile update submission
  const handleProfileUpdate = async () => {
    try {
      // Send updated details to the backend
      const response = await axios.put("http://localhost:5000/api/student/update", {
        email,
        updatedDetails: profile,
      });
      alert(response.data.message);  // Show success message
    } catch (err) {
      alert(err.response.data.message);  // Show error message if update fails
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <div className="w-full max-w-3xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        {/* Profile Fields */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 p-2 border"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full mb-2 p-2 border"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full mb-2 p-2 border"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course"
          className="w-full mb-2 p-2 border"
          value={profile.course}
          onChange={(e) => setProfile({ ...profile, course: e.target.value })}
        />

        {/* Update Button */}
        <button onClick={handleProfileUpdate} className="bg-blue-500 text-white px-4 py-2 w-full">
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
