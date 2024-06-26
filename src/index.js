const triangles = document.querySelectorAll('.triangle');
let draggedElement;

const dragStart = (e) => {
    draggedElement = e.target;
}

const dragOver = (e) => {
    e.preventDefault();
}

const dragDrop = (e) => {
    e.stopPropagation();

    let style = draggedElement.style;
    const isTopTriangle = (e.target.style.alignSelf === 'start');

    e.target.append(draggedElement);

    let children = e.target.childNodes;
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
}

triangles.forEach(triangle => {
    triangle.addEventListener('dragstart', dragStart);
    triangle.addEventListener('dragover', dragOver);
    triangle.addEventListener('drop', dragDrop);
});
