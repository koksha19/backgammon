'use strict';

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

let clientCounter = 0;
const rooms = {};

wss.on('connection', (ws) => {
    const id = Date.now().toString(36) + Math.random().toString(36);

    const leaveRoom = (room) => {
        if(!rooms[room][id]) return;
        if(Object.keys(rooms[room]).length === 1) delete rooms[room];
        else delete rooms[room][id];
    };

    clientCounter++;
    ws.send(JSON.stringify({ type: 'clientNumber', clientNumber: clientCounter }));

    ws.on('error', console.error);

    ws.on('message', (message) => {
        console.log(JSON.parse(message));
        const data = JSON.parse(message);
        const roomId = data.roomId;
        const yourId = data.yourId;

        if (!roomId) {
            console.error('No room specified in the message');
            return;
        }

        if (data.join) {
            if (!rooms[roomId]) rooms[roomId] = {};
            delete rooms[yourId];
            if (!rooms[roomId][id]) rooms[roomId][id] = ws;
            console.log(`Client ${id} joined room ${roomId}`);
        } else if (!data.join){
            for (const [, client] of Object.entries(rooms[roomId])) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message, { binary: false });
                    console.log(`Message sent to client in room ${roomId}`);
                }
            }
        }
        console.log(Object.entries(rooms));
    });


    ws.on('close', () => {
        console.log('Connection closed');
        clientCounter--;
        Object.keys(rooms).forEach(room => leaveRoom(room));
    });
});
