const Message = require('../models/message.schema')
module.exports = {
	fetchMessages : function(req,res){

		

		Message.find({},(err,messages)=>{
			if(err){
				res.send('Shit happens');
			}
			//var sMessages = messages;
			res.send({messages:messages});	
		});

		
	},
	saveMessages : function(req,res){
		console.log(req.body)
		var message = req.body.newMessage;
		
		
			var newMessage = new Message(message);
			
			newMessage.save().then(function(response){
				console.log('save res')
				console.log(response)
				res.send({savedMessage : response});
			}).catch(function(err){
				console.log(err)
			});
		

		
	}
}