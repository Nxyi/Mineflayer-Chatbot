import { WebSocket } from "ws";
import { bot } from "./avas.js";
const socket = new WebSocket('ws://localhost:8100');

// Event listener for when the connection is opened
socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened');
});

// Event listener for when a message is received from the server
socket.addEventListener('message', (event) => {
    bot.chat(`>${event.data}`)
});

// Event listener for when the connection is closed
socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
});

function sendToSocket(message){
  socket.send(message)
}

export{sendToSocket}