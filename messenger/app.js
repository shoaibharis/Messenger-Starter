// App.js
import React, { useEffect, useState } from 'react';
import socket from './socket';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    // Emit the message event to the server
    socket.emit('message', { text });

    // Clear the input field
    setText('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
