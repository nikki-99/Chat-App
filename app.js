var socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
const form = document.getElementById('send-msg');
const messageInput = document.getElementById('msgSend');
const msgContainer = document.querySelector('.container');


var audio = new Audio('ring.mp3');


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }

}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send-message', message);
    messageInput.value= "";

})

const username = prompt("Enter Your Name!");
socket.emit('new-user-add', username);


socket.on('user-joined', username =>{
    append(`${username} joined the chat`, 'center');
    

});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
    
});

socket.on('leave', username =>{
    append(`${username} left the chat!`, 'center');
    
});

