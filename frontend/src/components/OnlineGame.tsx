import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_BOARD, getNext, getWinner, isEmpty, place } from '../lib';
import CopyableInput from './CopyableInput';
import Board from './Board';

enum State { Waiting, Started, InProgress };

function OnlineGame() {
  const ws = useRef<WebSocket>();

  const { uid } = useParams();

  const [state, setState] = useState(State.Waiting);
  const [player, setPlayer] = useState(undefined);
  const [squares, setSquares] = useState(DEFAULT_BOARD);

  const next = useMemo(() => getNext(squares), [squares]);
  const winner = useMemo(() => getWinner(squares), [squares]);

  const empty = useCallback(
    (index: number)  => isEmpty(squares, index), 
    [squares]
  );

  const onSquareClick = useCallback(
    (index: number) => {
      if (winner === undefined && empty(index) && next === player) {
        setSquares(place(squares, index, player));

        ws.current?.send(JSON.stringify({
          meta: 'place',
          position: index,
          mark: player,
          roomId: uid,
        }));
      }
    },
    [ws, player, next, winner, empty, squares, setSquares]
  );

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000');

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({
        meta: 'join',
        roomId: uid,
      }));
    };

    return () => {
      ws.current?.close();
    }
  }, []);

  useEffect(() => {
    if (!ws.current) {
      return;
    }
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { meta, mark, position } = data;

      if (meta === 'join') {
        if (mark === undefined) {
          setState(State.InProgress);
        } else {
          setPlayer(mark);
        }
      }

      if (meta === 'start') {
        setState(State.Started);
      }

      if (meta === 'leave' && player !== mark) {
        setState(State.Waiting);
        setSquares(DEFAULT_BOARD);
      }

      if (meta === 'place') {
        setSquares(place(squares, position, mark));
      }
    }
  }, [squares, setSquares, setPlayer, setState]);

  return (
    <>
      {
        state === State.InProgress &&
        <h1>Game is currently in progress</h1>
      }
      {
        state === State.Waiting && 
        <CopyableInput text={window.location.href} />
      }
      {
        state === State.Started &&
        <>
          <div className="winner-prompt">
          {
            winner 
              ? `Winner: ${winner}`
              : squares.every(Boolean)
              ? 'Draw'
              : `${next === player ? "Your" : "Opponent's"} turn`
          }
          </div>
          <Board squares={squares} onSquareClick={onSquareClick} />
        </>
      }
    </>
  );
}

export default OnlineGame;
