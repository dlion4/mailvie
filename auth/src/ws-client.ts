// src/ws-client.js
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000/notifications");

socket.on('connect', () => {
    console.log('Connected to Nestjs WebSocket server');
});

socket.on('update', (data) => {
    console.log('Received update:', data);
    // Handle incoming data here
    console.log(data)
    if(data.access_token){
        fetch("http://localhost:9001/api/users/me/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.access_token}`,
                "X-CSRFToken": "thskikskkkkfnnshsnekrennskksbhhehsnsnskfdkd",
            },
            body: JSON.stringify({email: data.email}),
        }).then(response=>response.json()).then(data=>console.log(data))
    }
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

export default socket;
