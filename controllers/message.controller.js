const Message = require('../models/message.schema')
module.exports = {
	fetchMessages : function(req,res){

		var fetchedMessages = {};

		Message.find({},(err,messages)=>{
			if(err){
				res.send('Shit happens');
			}

			console.log('messages' + messages)

			fetchedMessages = messages;
		});

		res.json(fetchedMessages);
	},
	saveMessages : function(req,res){
		var messages = req.body.messages;

		console.log('from model '+ messages)

		for(var message in messages){
			var newMessage = new Message(message);
			console.log('a message from model ' + message)
			message.save();
		}

		res.json(messages);
	}
}