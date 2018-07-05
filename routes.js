const express = require('express'),
	router = express.Router(),
	messageController = require('./controllers/message.controller'),
	connectionController = require('./controllers/connection.controller');
	//timerController = require('./controllers/timer.controller');

module.exports = router;

router.get('fetchMessages',messageController.fetchMessages);

router.post('saveMessages',messageController.saveMessages);

router.post('connection',connectionController.connect);

//router.get('/getTimeLeft',timerController.getTimeLeft);