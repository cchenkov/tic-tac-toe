import { WebSocket } from 'ws';

interface Room {
    uid: string,
    player1?: WebSocket,
    player2?: WebSocket,
};

export { Room };