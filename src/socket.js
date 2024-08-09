import { id, setPieces, showDice } from "../public/board.js";

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
    const move = document.querySelector('#move');
    const data = JSON.parse(event.data);
    console.log(data);
    if (data.type === 'clientNumber') {
        clientNumber = data.clientNumber;
        color = clientNumber % 2 === 0 ? 'white' : 'black';
        if (color === 'white') {
            move.textContent = 'Your move';
            move.style.margin = '1rem';
        } else {
            move.textContent = 'Wait for your opponent to make a move';
            move.style.margin = '1rem';
        }
        setPieces(clientNumber);
    } else if (data.opponentMove) {
        const dice = document.querySelector('#p');
        const images = document.querySelector('#images');
        const p = document.createElement('p');
        const firstImage = document.createElement('img');
        const secondImage = document.createElement('img');

        p.setAttribute('id', 'opp_move');
        p.textContent = data.opponentMove;
        dice.appendChild(p);

        firstImage.src = data.firstImage;
        secondImage.src = data.secondImage;
        showDice(images, firstImage, secondImage);
    } else if (data.nextMove) {
        move.textContent = 'Your move';
    } else {
        stackPieces(event, data);
    }
    const message = {
        roomId: id,
        color: color,
    }
    socket.send(JSON.stringify(message));
});

export { socket, stylePieces, id };
