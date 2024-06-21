const board = document.querySelector('#board')

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

const setPieces = () => {
    const yourStartTriangle = document.querySelector('[triangle-id="11"]');
    const opponentStartTriangle = document.querySelector('[triangle-id="12"]');

    for (let i = 0; i < 15; i++) {
        const newBlackPiece = document.createElement('div');
        const newWhitePiece = document.createElement('div');

        newBlackPiece.classList.add('initial__black__state');
        newWhitePiece.classList.add('initial__white__state');

        newBlackPiece.style.top = `${i * 30}px`;
        newWhitePiece.style.bottom = `${i * 30}px`;

        yourStartTriangle.append(newBlackPiece);
        opponentStartTriangle.append(newWhitePiece);
    }
}

divideBoard();
setPieces();