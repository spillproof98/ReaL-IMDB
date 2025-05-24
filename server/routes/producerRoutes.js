const express = require('express');
const router = express.Router();
const controller = require('../controllers/producerController');

router.get('/', controller.getProducers);
router.post('/', controller.createProducer);

module.exports = router;
