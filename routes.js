const express = require('express'),
	router = express.Router(),
	messageController = require('./controllers/message.controller'),
	connectionController = require('./controllers/connection.controller');
	//timerController = require('./controllers/timer.controller');

module.exports = router;

router.get('http://grow.cri-paris.org/api/fetchMessages',messageController.fetchMessages);

router.post('http://localhost:3801/api/saveMessages',messageController.saveMessages);

router.post('http://localhost:3801/api/connection',connectionController.connect);

//router.get('/getTimeLeft',timerController.getTimeLeft);