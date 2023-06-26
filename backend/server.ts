import { WebSocketServer, WebSocket } from 'ws';
import { Room } from './types';

const PLAYER1_MARK = 'X';
const PLAYER2_MARK = 'O';

let rooms: Array<Room> = [];

const joinRoom = (roomId: string, ws: WebSocket) => {
  const room = rooms.find((r) => r.uid === roomId);

  if (!room) {
    rooms = [
      ...rooms,
      { uid: roomId, player1: ws }
    ];

    return PLAYER1_MARK;
  } 

  if (!room.player1 || room.player1 === ws) {
    room.player1 = ws;
    return PLAYER1_MARK;
  }
  
  if (!room.player2 || room.player2 === ws) {
    room.player2 = ws;
    return PLAYER2_MARK;
  }

  return undefined;
}

const leaveRoom = (roomId: string, ws: WebSocket) => {
  const room = rooms.find((r) => r.uid === roomId);

  if (!room) {
    return;
  }

  if (room.player1 === ws) {
    room.player1 = undefined;
    return PLAYER1_MARK;
  }

  if (room.player2 === ws) {
    room.player2 = undefined;
    return PLAYER2_MARK;
  }

  if (!room.player1 && !room.player2) {
    rooms = rooms.filter((room) => room.uid !== roomId);
  }
}

const port = 5000;

const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { meta, position, mark, roomId } = JSON.parse(data.toString());

    if (meta === 'join') {
      const mark = joinRoom(roomId, ws);
      const room = rooms.find((room) => room.uid === roomId);

      ws.send(JSON.stringify({ meta, mark }));

      if (room && room.player1 && room.player2) {
        room.player1.send(JSON.stringify({ meta: 'start' }));
        room.player2.send(JSON.stringify({ meta: 'start' }));
      }

    } else if (meta === 'leave') {
      const mark = leaveRoom(roomId, ws);
      const room = rooms.find((room) => room.uid === roomId);

      ws.send(JSON.stringify({ meta, mark }));

      if (room?.player1) {
        room.player1.send(JSON.stringify({ meta, mark }));
      }

      if (room?.player2) {
        room.player2.send(JSON.stringify({ meta, mark }));
      }

    } else if (meta === 'place') {
      const room = rooms.find((room) => room.uid === roomId);

      if (room?.player1 === ws) {
        room.player2?.send(JSON.stringify({ meta, position, mark }));
      }

      if (room?.player2 === ws) {
        room.player1?.send(JSON.stringify({ meta, position, mark }));
      }
    }
  });

  ws.on('close', () => {
    rooms
      .filter((room) => room.player1 === ws || room.player2 ===  ws)
      .forEach((room) => { 
        const mark = leaveRoom(room.uid, ws);
        
        if (room.player1 && room.player1 !== ws) {
          room.player1.send(JSON.stringify({ meta: 'leave', mark }));
        }

        if (room.player2 && room.player2 !== ws) {
          room.player2.send(JSON.stringify({ meta: 'leave', mark }));
        }
      });
  });
});

console.log(`WebSocket server is listening at port ${port}...`);
