const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Producer = require('../models/Producer');
const Actor = require('../models/Actor');

const BASE_URL = 'https://real-imdb-3.onrender.com';

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("actors")
      .populate("producer")
      .populate("uploaderId", "name email");

    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { name, yearOfRelease, plot } = req.body;

    let producer, actors;
    try {
      producer = JSON.parse(req.body.producer);
      actors = JSON.parse(req.body.actors);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON in producer or actors' });
    }

    const poster = req.file
      ? `${BASE_URL}/uploads/${req.file.filename}`
      : null;

    if (!name || !yearOfRelease || !plot || !poster || !producer || !actors || !Array.isArray(actors)) {
      return res.status(400).json({ message: 'Missing required fields or invalid data' });
    }

    const savedProducer = new Producer(producer);
    await savedProducer.save();

    const savedActors = await Promise.all(
      actors.filter(actor => actor.name).map(actor => new Actor(actor).save())
    );

    const movie = new Movie({
      name,
      yearOfRelease,
      plot,
      poster,
      producer: savedProducer._id,
      actors: savedActors.map(actor => actor._id),
      uploaderId: req.user._id,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editMovie = async (req, res) => {
  try {
    const { name, yearOfRelease, plot } = req.body;

    let producer, actors;
    try {
      producer = JSON.parse(req.body.producer);
      actors = JSON.parse(req.body.actors);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON in producer or actors' });
    }

    const poster = req.file
      ? `${BASE_URL}/uploads/${req.file.filename}`
      : undefined;

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const requesterId = mongoose.Types.ObjectId.createFromHexString(req.user._id);
    if (!movie.uploaderId.equals(requesterId)) {
      return res.status(403).json({ message: 'You are not authorized to edit this movie' });
    }

    let producerId;
    if (producer._id) {
      await Producer.findByIdAndUpdate(producer._id, producer, { new: true });
      producerId = producer._id;
    } else {
      const newProducer = new Producer(producer);
      await newProducer.save();
      producerId = newProducer._id;
    }

    const savedActors = await Promise.all(
      actors.filter(actor => actor.name).map(actor => {
        return actor._id
          ? Promise.resolve(actor._id)
          : new Actor(actor).save().then(a => a._id);
      })
    );

    movie.name = name;
    movie.yearOfRelease = yearOfRelease;
    movie.plot = plot;
    if (poster) movie.poster = poster;
    movie.producer = producerId;
    movie.actors = savedActors;

    await movie.save();

    const populatedMovie = await Movie.findById(movie._id)
      .populate('producer')
      .populate('actors');

    res.status(200).json(populatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const requesterId = mongoose.Types.ObjectId.createFromHexString(req.user._id);
    if (!movie.uploaderId.equals(requesterId)) {
      return res.status(403).json({ message: 'You are not authorized to delete this movie' });
    }

    await movie.deleteOne();
    res.status(200).json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadPoster = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
};
