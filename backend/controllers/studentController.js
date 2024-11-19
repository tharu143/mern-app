const User = require('../models/User');

// Register a new student
exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({
      name,
      email,
      password,
      role: 'student',
    });
    await newUser.save();
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student', error });
  }
};

// Verify a student
exports.verifyStudent = async (req, res) => {
  const { email } = req.body;
  try {
    const student = await User.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Set the verified status to true
    student.verified = true;
    await student.save();

    res.status(200).json({ message: 'Student verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying student', error });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find();  // Find all students
    if (!students.length) {
      return res.status(404).json({ message: 'No students found' });
    }
    res.status(200).json({ students });  // Return all students in response
  } catch (error) {
    console.error('Error fetching students:', error);  // Log the error
    res.status(500).json({ message: 'Error fetching students, please try again later', error });
  }
};

// Update student profile (Only allowed fields: name, address, phone, course)
exports.updateStudentProfile = async (req, res) => {
  const { email, updatedDetails } = req.body;
  try {
    const student = await User.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Only allow updating these fields
    student.name = updatedDetails.name || student.name;
    student.address = updatedDetails.address || student.address;
    student.phone = updatedDetails.phone || student.phone;
    student.course = updatedDetails.course || student.course;

    await student.save();
    res.status(200).json({ message: 'Student profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student profile', error });
  }
};
