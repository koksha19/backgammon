'use strict';

import { socket } from "../src/socket.js";

const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six'];

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
    gameId.style.margin = "1rem";
    gameId.textContent = 'ID of this room: ' + id.toString();

    const dateLabel = document.createElement('label');
    dateLabel.style.margin = "1rem";
    dateLabel.setAttribute('for', 'id');
    dateLabel.textContent = 'Paste the room ID you want to connect to:';

    const idInput = document.createElement('input');
    idInput.style.margin = "1rem";
    idInput.setAttribute('id', 'id');

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'id_submit');
    button.textContent = 'Submit';

    form.appendChild(gameId);
    form.appendChild(dateLabel);
    form.appendChild(idInput);
    form.appendChild(button);
};

const createDice = () => {
    const cardDice = document.querySelector('#dice');

    const p = document.createElement('p');
    p.setAttribute('id', 'p');
    p.style.margin = "1rem";
    p.textContent = 'Roll the dice';

    const dice = document.createElement('div');
    dice.setAttribute('id', 'images');

    const button = document.createElement('button');
    button.style.margin = "1rem";
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'roll');
    button.textContent = 'Roll';

    cardDice.appendChild(p);
    cardDice.appendChild(dice);
    cardDice.appendChild(button);
}

const connectToOpponent = () => {
    const btn = document.querySelector('#id_submit');
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
        p.textContent = 'ID of this room: ' + opponentId.toString();
        socket.send(JSON.stringify(data));
    })
}

const getDieNumber = () => {
    return NUMBERS[Math.floor(Math.random()*NUMBERS.length)];
}

const showDice = (images, firstImage, secondImage) => {
    if (images.hasChildNodes()) {
        images.replaceChildren();
    }
    images.appendChild(firstImage);
    images.appendChild(secondImage);
}

const rollDice = () => {
    const btn = document.querySelector('#roll');
    const images = document.querySelector('#images');
    const firstImage = document.createElement('img');
    const secondImage = document.createElement('img');

    btn.addEventListener('click', () => {
        const oppMove = document.querySelector('#opp_move');
        const firstNumber = getDieNumber();
        const secondNumber = getDieNumber();
        firstImage.src = `../images/${firstNumber}.png`;
        secondImage.src = `../images/${secondNumber}.png`;
        showDice(images, firstImage, secondImage)
        if (oppMove) {
            oppMove.remove();
        }
        const data = {
            roomId: id,
            opponentMove: 'Opponent\'s move:',
            firstImage: firstImage.src,
            secondImage: secondImage.src,
        };
        socket.send(JSON.stringify(data));
    })
}


divideBoard();
createForm();
createDice();
connectToOpponent();
rollDice();

export { id, setPieces, showDice };






