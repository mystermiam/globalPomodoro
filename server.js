
require('dotenv').config();

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

//get content of incoming request under req.body
app.use(bodyParser.urlencoded({extended:true}));

//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//serve site
//app.use(express.static(DIST_DIR));

console.log(process.env.DB_URI);
//routes
app.use(require('./routes'));
/****************/

mongoose.connect(process.env.DB_URI).then(function(response){
    
    for(var connection in response.connections){
        console.log(connection.base,connection.config,connection.collections);
    }

    console.log('i am in !');
}).catch(error=>{
    console.log('tutorial is lying ' + error);
});

io.sockets.on('connection', newConnection);

io.sockets.on('disconnect', disconnect);

function disconnect(socket){
    console.log(socket.id + ' disconnect');
}

function newConnection(socket) {
    console.log('socket : new connection');
    console.log(socket.id);    
}
