const mongoose=require('mongoose'),
    Schema = mongoose.Schema;

const conversationSchema = new Schema({

});

/*//for example but not know if the room id is gonna be in there probably actually
conversationSchema.pre('save', function(next) {
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

const conversationModel = mongoose.model('Conversation', conversationSchema);

module.exports = conversationModel;