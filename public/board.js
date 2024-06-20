const board = document.querySelector('#board')
/*
const intialBlackState = document.querySelector('.initial__black__state');
const intialWhiteState = document.querySelector('.initial__white__state');
*/

const quarters = {
    secondQuarter: document.querySelector('#second__quarter'),
    firstQuarter: document.querySelector('#first__quarter'),
    thirdQuarter: document.querySelector('#third__quarter'),
    fourthQuarter: document.querySelector('#fourth__quarter'),
};

const drawTriangles = () => {
    let top = 0;
    let counter = 0;
    let id = 0;
    for (const quarter of Object.values(quarters)) {
        for (let i = 0; i < 6; i++) {
            const triangle = document.createElement('div');
            triangle.classList.add('triangle');
            triangle.setAttribute('triangle-id', id.toString());
            id++;

            if (top < 2 && counter % 2 === 0) {
                triangle.classList.add('top__light__triangle');
            } else if (top < 2 && counter % 2 !== 0) {
                triangle.classList.add('top__dark__triangle');
            } else if (top >= 2 && counter % 2 === 0) {
                triangle.classList.add('bottom__light__triangle');
            } else {
                triangle.classList.add('bottom__dark__triangle');
            }

            quarter.append(triangle);
            counter += 1;
        }
        top += 1;
        counter += 1;
    }
}

const setPieces = () => {
    const initialBlackState = document.createElement('div');
    const initialWhiteState = document.createElement('div');

    const yourStartTriangle = document.querySelector('[triangle-id="11"]');
    console.log(yourStartTriangle);
    const opponentStartTriangle = document.querySelector('[triangle-id="12"]');

    for (let i = 0; i < 15; i++) {
        const newBlackPiece = document.createElement('div');
        const newWhitePiece = document.createElement('div');

        newBlackPiece.classList.add('initial__black__state');
        newWhitePiece.classList.add('initial__white__state');

        initialBlackState.append(newBlackPiece);
        initialWhiteState.append(newWhitePiece);
    }

    yourStartTriangle.append(initialBlackState);
    opponentStartTriangle.append(initialWhiteState);
}

drawTriangles();
setPieces();