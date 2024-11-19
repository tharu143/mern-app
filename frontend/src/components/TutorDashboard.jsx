import React, { useState, useEffect } from "react";
import axios from "axios";

function TutorDashboard() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all students from the backend
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/students");
        setStudents(response.data.students);
      } catch (err) {
        console.error("Error fetching students", err);
      }
    };

    fetchAllStudents();
  }, []);

  const handleVerify = async (email) => {
    try {
      const response = await axios.post("http://localhost:5000/api/student/verify", { email });
      alert(response.data.message);

      // Refresh student list to reflect the changes
      const updatedStudents = await axios.get("http://localhost:5000/api/student/students");
      setStudents(updatedStudents.data.students);
    } catch (err) {
      console.error("Error verifying student", err);
      alert("Error verifying student");
    }
  };

  const handleRegister = async () => {
    try {
      // Register a new student with "verified" set to false by default
      const response = await axios.post("http://localhost:5000/api/student/register", {
        ...newStudent,
        verified: false,
      });
      setMessage(response.data.message);

      // Clear the form after successful registration
      setNewStudent({ email: "", name: "", password: "" });

      // Refresh the list of students
      const updatedStudents = await axios.get("http://localhost:5000/api/student/students");
      setStudents(updatedStudents.data.students);
    } catch (err) {
      console.error("Error registering student", err);
      setMessage("Error registering student");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tutor Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">All Students</h2>
        <ul className="space-y-4">
          {students.map((student) => (
            <li key={student.email} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
              <span>{student.name} ({student.email})</span>
              <span className={`text-sm ${student.verified ? 'text-green-500' : 'text-yellow-500'}`}>
                {student.verified ? 'Verified' : 'Pending'}
              </span>
              <button
                onClick={() => handleVerify(student.email)}
                className={`ml-4 ${student.verified ? 'bg-gray-500' : 'bg-green-500'} text-white px-4 py-2 rounded-md hover:bg-green-600`}
                disabled={student.verified}
              >
                Verify
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Register New Student</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newStudent.password}
            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
          />
          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Register Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;
