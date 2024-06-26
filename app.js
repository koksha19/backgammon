import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

wss.on('connection', function connection(ws) {
    console.log('New client has connected');

    ws.on('error', console.error);

    ws.on('message', (data) => {
        console.log(`Client sent: ${data}`);
    });

    ws.on('close', () => {
        console.log('Client has disconnected');
    })
});

 