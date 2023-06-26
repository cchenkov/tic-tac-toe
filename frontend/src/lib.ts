export type Mark = 'X' | 'O' | undefined;

export const DEFAULT_BOARD = [...Array(9).fill(undefined)];

export function isEmpty(squares: Array<Mark>, index: number): boolean {
  return squares[index] === undefined;
}

export function getNext(squares: Array<Mark>): Mark {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

export function getWinner(squares: Array<Mark>): Mark {
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
    .map(line => line.map(index => squares[index]))
    .find(([a, b, c]) => a !== undefined && a === b && a === c)?.[0];
}

export function getAvailable(squares: Array<Mark>): Array<number> {
  return squares
    .map((square, index) => square === undefined ? index : -1)
    .filter(index => index !== -1);
}

export function place(squares: Array<Mark>, index: number, mark: Mark): Array<Mark> {
  return isEmpty(squares, index) && getNext(squares) === mark
    ? [
      ...squares.slice(0, index),
      mark,
      ...squares.slice(index + 1)
    ]
    : squares;
}

// AI - O | Human - X
// Human (X) starts first
export function minimax(squares: Array<Mark>): number {
  const next = getNext(squares);
  const winner = getWinner(squares);
  const available = getAvailable(squares);

  let best = next === 'X' ? -1000 : 1000;

  if (winner) {
    return winner === 'X' ? 10 : -10; 
  }

  if (available.length === 0) {
    return 0;
  }

  available.forEach((index) => {
    const score = minimax([
      ...squares.slice(0, index),
      next,
      ...squares.slice(index + 1)
    ]);

    if (next === 'X') {
      best = Math.max(score, best);
    } else {
      best = Math.min(score, best);
    }
  });

  return best;
}

export function getOptimalIndex(squares: Array<Mark>): number | undefined {
  const next = getNext(squares);
  const available = getAvailable(squares);

  let bestIndex = undefined;
  let bestScore = next === 'X' ? -1000 : 1000 ;

  available.forEach((index) => {
    const score = minimax([
      ...squares.slice(0, index),
      next,
      ...squares.slice(index + 1)
    ]);

    if (next === 'X' && score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }

    if (next === 'O' && score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}

export function getSuboptimalIndex(squares: Array<Mark>): number | undefined {
  const next = getNext(squares);
  const available = getAvailable(squares);

  const options = available.map((index) => ({
    index: index,
    value: minimax([
      ...squares.slice(0, index),
      next,
      ...squares.slice(index + 1)
    ])
  }));

  if (next === 'X') {
    options.sort((a, b) => b.value - a.value);
  } else {
    options.sort((a, b) => a.value - b.value);
  }

  if (options.length === 0) {
    return undefined;
  }

  if (options.length === 1) {
    return options[0].index;
  }

  return Math.random() * 100 <= 35
    ? options[0].index 
    : options[1].index;
}

export function getRandomIndex(squares: Array<Mark>): number | undefined {
  const available = getAvailable(squares);

  return available[Math.floor(Math.random() * available.length)];
}