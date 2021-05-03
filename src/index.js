const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket Connection!');
    // socket.emit emits to a pirticular socket whereas io.emit emits to all socket

    socket.emit('message', 'Welcome!!');

    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message);
        callback();
    });

    socket.on('sendLocation', (location, callback) => {
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has disconnected.')
    });

})

server.listen(port, () => {
    console.log(`App is running on port ${port}!`);
})
