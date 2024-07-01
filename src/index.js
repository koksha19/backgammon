'use strict';

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
    e.target.append(draggedElement);

    const isTopTriangle = (e.target.style.alignSelf === 'start');
    let children = e.target.childNodes;
    stylePieces(e, draggedElement, isTopTriangle, children);

    const data = {
        pieceId: draggedElement.id,
        triangleId: e.target.getAttribute('triangle-id')
    };

    socket.send(JSON.stringify(data));
}

triangles.forEach(triangle => {
    triangle.addEventListener('dragstart', dragStart);
    triangle.addEventListener('dragover', dragOver);
    triangle.addEventListener('drop', dragDrop);
});
