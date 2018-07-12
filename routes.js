const express = require('express'),
	router = express.Router(),
	messageController = require('./controllers/message.controller'),
	connectionController = require('./controllers/connection.controller');
	//timerController = require('./controllers/timer.controller');

module.exports = router;

router.get('/api/fetchMessages',messageController.fetchMessages);

router.post('/api/saveMessages',messageController.saveMessages);

router.post('/api/connection',connectionController.connect);

//router.get('/getTimeLeft',timerController.getTimeLeft);