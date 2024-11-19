const mongoose = require('mongoose');

// Define Tutor schema
const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', // Assuming a Student model exists
    },
  ],
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Tutor', TutorSchema);
