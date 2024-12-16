const username = "<%= req.session.user.username %>";

const socket = io();

socket.emit('join', username);

socket.on('chat', (msg) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${msg.username}</strong>: ${msg.message}`;
    document.getElementById('messages').appendChild(item);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input');
    const message = input.value.trim();
    if (message) {
        socket.emit('chat', { username, message });
        input.value = '';
    }
});