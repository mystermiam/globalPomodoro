const User = require('../models/user.schema')
module.exports={
	connect : function (request,response){
		var sentUser = request.body.user;
		console.log(sentUser)
		User.findOne({username:sentUser.username,password:sentUser.password}).then(function(user){
            if(user && user.username === sentUser.username && user.password === sentUser.password){
              response.send({success:true}); 

            } else { 
            	console.log('users')
            	console.log(user)
              response.send({error:true,message:'Wrong credentials. Access not granted'});
            }


		});	
	}
};