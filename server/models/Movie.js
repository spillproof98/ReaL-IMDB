const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearOfRelease: { type: Number, required: true },
  plot: { type: String },
  poster: { type: String },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
