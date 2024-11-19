const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route for registering a student
router.post('/register', studentController.registerStudent);

// Route for verifying a student
router.post('/verify', studentController.verifyStudent);

// Route for fetching all student profiles (for Tutor Dashboard)
router.get('/students', studentController.getAllStudents);  // No authentication required

// Route for updating student profile (Only allows updates to allowed fields)
router.put('/update', studentController.updateStudentProfile);

module.exports = router;
