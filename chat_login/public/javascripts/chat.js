// public/javascripts/chat.js
const username = "<%= req.session.user.username %>"; // Pass username from session

const socket = io();

// Send the username to the server upon connection
socket.emit('join', username);

// Handle incoming messages
socket.on('chat', (msg) => {
    console.log('Message received on client:', msg);
    const item = document.createElement('li');
    item.innerHTML = `<strong>${msg.username}</strong>: ${msg.message}`;
    document.getElementById('messages').appendChild(item);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

// Listen for the form submission
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input');
    const message = input.value.trim();
    if (message) {
        socket.emit('chat', { username, message }); // Send username and message
        input.value = ''; // Clear the input field
    }
});
