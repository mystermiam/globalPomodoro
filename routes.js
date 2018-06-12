const express = require('express'),
	router = express.Router(),
	messageController = require('./controllers/message.controller');

module.exports = router;

router.get('/fetchMessages',messageController.fetchMessages);

router.post('/saveMessages',messageController.saveMessages);