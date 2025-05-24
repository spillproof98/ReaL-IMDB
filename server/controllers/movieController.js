const Movie = require('../models/Movie');
const Producer = require('../models/Producer');
const Actor = require('../models/Actor');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('actors').populate('producer');
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
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    console.log("📦 Incoming Payload:", { name, yearOfRelease, plot, poster, producer, actors });

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
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error('❌ Add movie failed:', err);
    res.status(500).json({ message: err.message });
  }
};


exports.editMovie = async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.uploadPoster = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
};
