const socket = new WebSocket('ws://127.0.0.1:8000');

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
}

socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    const piece = document.getElementById(data.pieceId);
    const targetTriangle = document.querySelector(`[triangle-id="${data.triangleId}"]`);
    const isTopTriangle = (targetTriangle.style.alignSelf === 'start');
    let children = targetTriangle.childNodes;
    targetTriangle.append(piece);
    stylePieces(event, piece, isTopTriangle, children);
});

export { socket, stylePieces };