const express = require('express');
const router = express.Router();
const miscController = require('../controllers/miscController');

router.get('/help', miscController.getHelp);
router.post('/feedback', miscController.submitFeedback);
router.get('/languages', miscController.getLanguages);

module.exports = router;