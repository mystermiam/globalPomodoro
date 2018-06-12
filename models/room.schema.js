const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const roomSchema = new Schema({
	name:{
		type:'String',
		required : true,
		unique: true
	},
	roomType:'String',
	chatId:{
		type: Schema.Types.ObjectId
		ref:'Chat'
	},
	timerType : 'String'
},{
	timestamps : true
});