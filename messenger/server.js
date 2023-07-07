// server.js
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const io = socketio(server);

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for new messages
  socket.on('message', async (data) => {
    try {
      // Save the message to MongoDB
      // Replace "Message" with your message schema/model
      const message = new Message(data);
      await message.save();

      // Broadcast the message to all connected clients
      io.emit('message', message);
    } catch (error) {
      console.error(error);
    }
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
