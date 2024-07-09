'use strict';

import { socket } from "../src/socket.js";

let id = Math.floor(Math.random() * 1000000);

const quarters = {
    secondQuarter: document.querySelector('#second__quarter'),
    firstQuarter: document.querySelector('#first__quarter'),
    thirdQuarter: document.querySelector('#third__quarter'),
    fourthQuarter: document.querySelector('#fourth__quarter'),
};

const divideBoard = () => {
    let id = 0;
    let counter = 0;
    for (const quarter of Object.values(quarters)) {
        for (let i = 0; i < 6; i++) {
            const triangle = document.createElement('div');
            triangle.classList.add('triangle');
            triangle.setAttribute('triangle-id', id.toString());
            id++;

            if (counter < 2) {
               triangle.style.alignSelf = "start";
            } else {
                triangle.style.alignSelf = "end";
            }
            quarter.append(triangle);
        }
        counter++;
    }
}

const setPieces = (clientNumber) => {
    const yourStartTriangle = document.querySelector('[triangle-id="11"]');
    const opponentStartTriangle = document.querySelector('[triangle-id="12"]');

    for (let i = 0; i < 15; i++) {
        const newBlackPiece = document.createElement('div');
        const newWhitePiece = document.createElement('div');

        newBlackPiece.classList.add('black__piece');
        newWhitePiece.classList.add('white__piece');

        newBlackPiece.id = `black_${i}`;
        newWhitePiece.id = `white_${i}`;

        newBlackPiece.draggable = true;
        newWhitePiece.draggable = true;

        if (clientNumber % 2 !== 0) {
            newBlackPiece.style.top = `${i * 25}px`;
            newWhitePiece.style.bottom = `${i * 25}px`;
            yourStartTriangle.append(newBlackPiece);
            opponentStartTriangle.append(newWhitePiece);
        } else {
            newBlackPiece.style.bottom = `${i * 25}px`;
            newWhitePiece.style.top = `${i * 25}px`;
            yourStartTriangle.append(newWhitePiece);
            opponentStartTriangle.append(newBlackPiece);
        }
    }
}

const createForm = () => {
    const form = document.querySelector('#form');

    const gameId = document.createElement('p');
    gameId.textContent = id.toString();

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'id');
    dateLabel.textContent = 'Opponent\'s id';

    const idInput = document.createElement('input');
    idInput.setAttribute('id', 'id');

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.textContent = 'Submit';

    form.appendChild(gameId);
    form.appendChild(dateLabel);
    form.appendChild(idInput);
    form.appendChild(button);
};

const connectToOpponent = () => {
    const btn = document.querySelector('button');
    const formId = document.querySelector('#id');
    const p = document.querySelector('p');
    btn.addEventListener('click', () => {
        const opponentId = Number(formId.value);
        const data = {
            join: true,
            roomId: opponentId,
            yourId: id,
        }
        id = Number(formId.value);
        formId.value = null;
        p.textContent = opponentId.toString();
        socket.send(JSON.stringify(data));
    })
}

divideBoard();
createForm();
connectToOpponent();

export { id, setPieces };






