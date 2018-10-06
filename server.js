
require('dotenv').config();
const Message = require('./models/message.schema')
var express = require('express'),
    path = require("path"),
    app = express(),
    server = app.listen(3801),
    socket = require('socket.io'),
    DIST_DIR = path.join(__dirname, "dist"),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    io = socket(server);

/** MIDDLEWARES **/
mongoose.Promise = global.Promise;


//get content of incoming request under req.body
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));

//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//serve site
//app.use(express.static(DIST_DIR));

//routes
app.use(require('./routes'));
/****************/
console.log(process.env)
mongoose.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser:true}).then(function(response){
    console.log('i am in !');
}).catch(error=>{
    console.log(error);
});

mongoose.set('useCreateIndex', true);

mongoose.connection.once('open',function(){
    console.log('connected');
}).on('error',function(error){
    console.log(error);
});



io.sockets.on('connection', function(socket){
    console.log('socket : new connection');
    console.log(socket.id); 
    
    socket.emit('newUser',socket.id);
    
    socket.on('sendMessage',function(data){
        var newMessage = new Message(data);
            
            newMessage.save().then(function(response){
                console.log('save res')
                console.log(response)
                io.emit('readMsg',response)
                //res.send({savedMessage : response});
            }).catch(function(err){
                console.log(err)
            });

        
    });

    socket.on('disconnect', disconnect);
});



function disconnect(socket){
    console.log(socket)
    console.log(socket.id + ' disconnect');
}

function newConnection(socket) {
       console.log('new one so its still on')
}
