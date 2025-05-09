
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user joined', (username) => {
        socket.username = username;
        console.log(`${username} joined the chat`);
    });

    socket.on('chat message', (data) => {
        socket.broadcast.emit('chat message', {
            message: data.message,
            username: data.username
        });
    });

    socket.on('disconnect', () => {
        console.log(`${socket.username || 'A user'} disconnected`);
    });
});

const PORT = 5000;
http.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
