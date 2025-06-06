
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'officer'], default: 'user' },
  district: {
    type: String,
    required: function () {
      return this.role === 'officer';
    }
  }
});

module.exports = mongoose.model("User", userSchema);
