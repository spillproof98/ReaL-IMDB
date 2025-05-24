const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', controller.getAllMovies);
router.post('/', auth, upload.single('poster'), controller.addMovie);
router.put('/:id', auth, controller.editMovie);
router.post('/upload-poster', upload.single('poster'), controller.uploadPoster);

module.exports = router;
