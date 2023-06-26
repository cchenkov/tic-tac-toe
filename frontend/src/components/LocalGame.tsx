import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_BOARD, getNext, getWinner, isEmpty, place } from '../lib';
import Board from './Board';

function LocalGame() {
  const [squares, setSquares] = useState(DEFAULT_BOARD);

  const next = useMemo(() => getNext(squares), [squares]);
  const winner = useMemo(() => getWinner(squares), [squares]);

  const empty = useCallback(
    (index: number)  => isEmpty(squares, index), 
    [squares]
  );

  const onSquareClick = useCallback(
    (index: number) => 
      winner === undefined && empty(index)
        ? setSquares(place(squares, index, next))
        : undefined, 
    [next, winner, empty, squares, setSquares]
  );

  return (
    <>
      <div data-testid="prompt" className="winner-prompt">
      {
        winner 
          ? `Winner: ${winner}`
          : squares.every(Boolean)
          ? 'Draw'
          : `${next}'s turn`
      }
      </div>
      <Board squares={squares} onSquareClick={onSquareClick} />
    </>
  );
}

export default LocalGame;