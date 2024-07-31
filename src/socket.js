import { id, setPieces } from "../public/board.js";

const socket = new WebSocket('ws://127.0.0.1:8000');
let clientNumber;
let color;

const stylePieces = (e, piece, isTopTriangle, children) => {
    let style = piece.style;
    let counter = 0;
    for (const node of children) {
        if (isTopTriangle) {
            style.bottom = null;
            style.top = `${counter * 60}px`;
        } else {
            style.top = null;
            style.bottom = `${counter * 60}px`;
        }
        counter++;
    }
};

const stackPieces = (event, data) => {
    const piece = document.getElementById(data.pieceId);
    const targetTriangle = document.querySelector(`[triangle-id="${data.triangleId}"]`);
    const isTopTriangle = (targetTriangle.style.alignSelf === 'start');
    let children = targetTriangle.childNodes;
    targetTriangle.append(piece);
    stylePieces(event, piece, isTopTriangle, children);
};


socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
    const data = {
        join: true,
        roomId: id,
    };
    socket.send(JSON.stringify(data));
});

socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log(data);
    if (data.type === 'clientNumber') {
        clientNumber = data.clientNumber;
        color = clientNumber % 2 === 0 ? 'white' : 'black';
        setPieces(clientNumber);
    } else {
        stackPieces(event, data);
    }
    const message = {
        roomId: id,
        color: color,
    }
    socket.send(JSON.stringify(message));
});

export { socket, stylePieces, id, color };
