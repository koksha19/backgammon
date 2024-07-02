'use strict';

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

divideBoard();

export { setPieces };






