const mongoose=require('mongoose'),
    Schema = mongoose.Schema;

const chatSchema = new Schema({
	chatId: {
		type: Schema.Types.ObjectId,
		required:true
	},
	roomId: {
		type : Schema.Types.ObjectId,
		ref: 'Room'
	}, 
	participants:[{type:Schema.Types.ObjectId,ref:'User'}]
},{
	timestamps: true
});


const chatSchema = mongoose.model('Chat', chatSchema);

module.exports = chatSchema;