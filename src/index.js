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

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    })
})

server.listen(port, () => {
    console.log(`App is running on port ${port}!`);
})
