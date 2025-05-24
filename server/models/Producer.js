const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date },
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Producer', producerSchema);
