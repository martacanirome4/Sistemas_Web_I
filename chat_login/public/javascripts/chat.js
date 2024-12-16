const socket = io();

// DOM Elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        socket.emit('chat', message); // Send message to server
        input.value = ''; // Clear input
    }
});

// Listen for chat messages from the server
socket.on('chat', (msg) => {
    console.log("Mensaje recibido:", msg);
    const item = document.createElement('li');
    item.textContent = msg;
    item.classList.add('chat-message');
    messages.appendChild(item);
    // Auto-scroll to the bottom
    messages.scrollTop = messages.scrollHeight;
});