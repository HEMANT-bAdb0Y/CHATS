const socket = io();
let username = '';

// Create falling hearts
function createHeart() {
    const heart = document.createElement('div');
    const isRed = Math.random() > 0.5;
    heart.className = `heart ${isRed ? 'red' : 'black'}`;
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 4 + 3 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 800);

const usernameForm = document.getElementById('username-form');
const usernameContainer = document.getElementById('username-container');
const chatInterface = document.getElementById('chat-interface');
const messages = document.getElementById('messages');
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');

function addMessage(data, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.innerHTML = `<span class="username">${data.username}</span>: ${data.message}`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    username = document.getElementById('username-input').value;
    if (username) {
        usernameContainer.style.display = 'none';
        chatInterface.style.display = 'block';
        socket.emit('user joined', username);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        const messageData = {
            message: input.value,
            username: username
        };
        socket.emit('chat message', messageData);
        addMessage(messageData, 'sent');
        input.value = '';
    }
});

socket.on('chat message', (data) => {
    addMessage(data, 'received');
});