'use strict';

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

const clients = [];
wss.on('connection', (ws) => {
    clients.push(ws);
    ws.on('error', console.error);
    ws.on('message', (data) => {
        console.log(JSON.parse(data));
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: false });
            }
        });
    });
    ws.on('close', () => {
        console.log('Connection closed');
    })
});

export { clients };