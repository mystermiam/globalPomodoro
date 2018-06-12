const mongoose=require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
	username : {
		type : 'String',
		lowercase : true,
		unique : true,
		required: true
	},
	email : {
		type : 'String',
		unique: true,
		required: true,
		lowercase : true
	},
	password : {
		required: true,
		type : 'String'
	}
},{
	timestamps: true
});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;