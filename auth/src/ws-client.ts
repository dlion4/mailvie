// src/ws-client.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('update', (data) => {
    console.log('Received update:', data);
    // Handle incoming data here
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

export default socket;
