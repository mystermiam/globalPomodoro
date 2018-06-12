const mongoose=require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
	author: 'String',
	authorId: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	chatId:{
		type: Schema.Types.ObjectId,
		ref:'Chat'
	},
	textMessage : 'String',
	time : 'Date'
},{
	timestamps:true
});

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;

/*//for example but not know if the room id is gonna be in there probably actually
pre before model method call
messageSchema.pre('save', function(next) {
  this.slug = slugify(this.room);
  next();
});

// function to slugify a name 
put This elsewhere for creating url chat room
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}*/