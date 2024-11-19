const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

// Create a tutor
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(400).json({ message: 'Tutor already exists' });
    }

    const tutor = new Tutor({ name, email, password });
    await tutor.save();

    res.status(201).json({ message: 'Tutor registered successfully', tutor });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find().populate('students');
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a tutor by ID
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).populate('students');
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a tutor
router.put('/:id', async (req, res) => {
  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.status(200).json(updatedTutor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a tutor
router.delete('/:id', async (req, res) => {
  try {
    const deletedTutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!deletedTutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.status(200).json({ message: 'Tutor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
