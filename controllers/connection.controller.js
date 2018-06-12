const User = require('../models/user.schema')
module.exports={
	connect : function (request,response){
		var sentUser = request.body.user;
		
		User.findOne().then(function(user){
			console.log(user);
		});	
	}
};