'use strict';

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

let clientCounter = 0;

wss.on('connection', (ws) => {
    clientCounter++;
    ws.send(JSON.stringify({ type: 'clientNumber', clientNumber: clientCounter }));
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
        clientCounter--;
    });
});
