const express = require('express');
const router = express.Router();
const controller = require('../controllers/actorController');

router.get('/', controller.getActors);
router.post('/', controller.createActor);

module.exports = router;
