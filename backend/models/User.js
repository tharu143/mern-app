const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["tutor", "student"], required: true },
  profile: {
    address: { type: String },
    phone: { type: String },
  },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
