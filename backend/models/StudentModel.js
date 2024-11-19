const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verified: { type: Boolean, default: false },
  profileDetails: {
    address: String,
    phone: String,
    course: String,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
