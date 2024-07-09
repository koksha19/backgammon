'use strict';

import { socket, stylePieces, id } from "./socket.js";

const TRIANGLES_NUMBER = 23;
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

    const triangleId = Number(e.target.getAttribute('triangle-id'));
    const opponentTriangle = (TRIANGLES_NUMBER - triangleId).toString();

    const data = {
        pieceId: draggedElement.id,
        triangleId: opponentTriangle,
        roomId: id,
    };

    socket.send(JSON.stringify(data));
}

triangles.forEach(triangle => {
    triangle.addEventListener('dragstart', dragStart);
    triangle.addEventListener('dragover', dragOver);
    triangle.addEventListener('drop', dragDrop);
});
