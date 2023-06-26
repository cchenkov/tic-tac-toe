import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_BOARD, getNext, getWinner, isEmpty, place, getOptimalIndex, getSuboptimalIndex, getRandomIndex } from '../lib';
import Board from './Board';

type Difficulty = 'easy' | 'normal' | 'hard';

type CPUGameProps = { difficulty: Difficulty };

const getAIMove = (difficulty: Difficulty) => {
  if (difficulty === 'easy') {
    return getRandomIndex;
  } else if (difficulty === 'normal') {
    return getSuboptimalIndex;
  } else {
    return getOptimalIndex;
  }
}

function CPUGame({ difficulty } : CPUGameProps) {
  const [squares, setSquares] = useState(DEFAULT_BOARD);

  const next = useMemo(() => getNext(squares), [squares]);
  const winner = useMemo(() => getWinner(squares), [squares]);

  const empty = useCallback(
    (index: number)  => isEmpty(squares, index), 
    [squares]
  );

  const onSquareClick = useCallback(
    (index: number) => {
      if (next === 'X' && winner === undefined && empty(index)) {
        const board = place(squares, index, next);
        setSquares(board);

        if (getWinner(board) !== undefined) {
          return;
        }

        const optimalIndex = getAIMove(difficulty)(board);

        return optimalIndex !== undefined && setSquares(place(board, optimalIndex, 'O'));
      }
    },
    [next, winner, empty, squares, setSquares]
  );

  return (
    <>
      <div className="winner-prompt">
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

export default CPUGame;
