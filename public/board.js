const board = document.querySelector('#board')

const quarters = {
    firstQuarter: document.querySelector('#first__quarter'),
    secondQuarter: document.querySelector('#second__quarter'),
    thirdQuarter: document.querySelector('#third__quarter'),
    fourthQuarter: document.querySelector('#fourth__quarter'),
};

const drawTriangles = () => {
    let top = 0;
    let counter = 0;
    for (const quarter of Object.values(quarters)) {
        for (let i = 0; i < 6; i++) {
            const triangle = document.createElement('div');
            triangle.classList.add('triangle');

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

drawTriangles();