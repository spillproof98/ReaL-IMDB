const Producer = require('../models/Producer');

exports.getProducers = async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProducer = async (req, res) => {
  try {
    const producer = new Producer(req.body);
    await producer.save();
    res.status(201).json(producer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
