
require('dotenv').config();

var express = require('express'),
    path = require("path"),
    app = express(),
    server = app.listen(3801),
    socket = require('socket.io'),
    DIST_DIR = path.join(__dirname, "dist"),
    mongoose = require('mongoose'),
    io = socket(server);


//console.log(DIST_DIR);
app.use(express.static(DIST_DIR));

/*mongoose.connect(process.env.DB_URI).then(function(response){
    console.log('i am in !');
}).catch(error=>{
    console.log('tutorial is lying ' + error);
})*/

io.sockets.on('connection', newConnection);

io.sockets.on('disconnect', disconnect);

function disconnect(socket){
    console.log(socket.id + ' disconnect');
}

function newConnection(socket) {
    console.log('socket : new connection');
    console.log(socket.id);

    
}

app.get('/fetchMessages',function(req,res){
    res.send(responseFromMongoDb);
});