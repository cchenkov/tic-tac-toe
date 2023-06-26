import { isEmpty, getNext, getWinner, getAvailable, place, getOptimalIndex, getSuboptimalIndex, getRandomIndex } from '../src/lib';

test("if isEmpty returns true on empty spot", () => {
  const board = [
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(isEmpty(board, 0)).toBeTruthy();
  expect(isEmpty(board, 1)).toBeTruthy();
  expect(isEmpty(board, 2)).toBeTruthy();
  expect(isEmpty(board, 3)).toBeTruthy();
  expect(isEmpty(board, 4)).toBeTruthy();
  expect(isEmpty(board, 5)).toBeTruthy();
  expect(isEmpty(board, 6)).toBeTruthy();
  expect(isEmpty(board, 7)).toBeTruthy();
  expect(isEmpty(board, 8)).toBeTruthy();
});

test("if isEmpty returns false on marked spot", () => {
  const board = [
    'X', 'O', 'X',
    'O', 'X', 'O',
    'X', 'O', 'X',
  ];

  expect(isEmpty(board, 0)).toBeFalsy();
  expect(isEmpty(board, 1)).toBeFalsy();
  expect(isEmpty(board, 2)).toBeFalsy();
  expect(isEmpty(board, 3)).toBeFalsy();
  expect(isEmpty(board, 4)).toBeFalsy();
  expect(isEmpty(board, 5)).toBeFalsy();
  expect(isEmpty(board, 6)).toBeFalsy();
  expect(isEmpty(board, 7)).toBeFalsy();
  expect(isEmpty(board, 8)).toBeFalsy();
});

test("if getNext returns X on first turn", () => {
  const board = [
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(getNext(board)).toBe('X');
})

test("if getNext returns X on X's turn", () => {
  const board = [
    'X',       'O',       undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(getNext(board)).toBe('X');
});

test("if getNext returns O on O's turn", () => {
  const board = [
    'X',       'O',       'X',
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(getNext(board)).toBe('O');
});

test("if getWinner returns undefined on incomplete game", () => {
  const board = [
    'X',       'O',       'X',
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(getWinner(board)).toBe(undefined);
});

test("if getWinner returns undefined on draw", () => {
  const board = [
    'X', 'O', 'X',
    'O', 'O', 'X',
    'X', 'X', 'O',
  ];

  expect(getWinner(board)).toBe(undefined);
});

test("if getWinner diagonal win conditions", () => {
  expect(getWinner([
    'X', 'O', undefined,
    'O', 'X', undefined,
    'X', 'O', 'X',
  ])).toBe('X');

  expect(getWinner([
    'X', 'O', 'X',
    'O', 'X', undefined,
    'X', 'O', undefined,
  ])).toBe('X');
});

test("if getWinner row win conditions", () => {
  expect(getWinner([
    'X', 'X', 'X',
    'O', 'O', undefined,
    'X', 'O', undefined,
  ])).toBe('X');

  expect(getWinner([
    'X', 'O', undefined,
    'O', 'O', undefined,
    'X', 'X', 'X',
  ])).toBe('X');

  expect(getWinner([
    'O', 'O', undefined,
    'X', 'X', 'X',
    'X', 'O', undefined,
  ])).toBe('X');
});

test("if getWinner column win conditions", () => {
  expect(getWinner([
    'X', 'X', 'O',
    'X', 'O', undefined,
    'X', 'O', undefined,
  ])).toBe('X');

  expect(getWinner([
    'O', 'X', undefined,
    'O', 'X', undefined,
    'X', 'X', 'O',
  ])).toBe('X');

  expect(getWinner([
    undefined, 'O', 'X',
    undefined, 'O', 'X',
    'O',       'X', 'X',
  ])).toBe('X');
});

test("if getAvailable returns all spots on empty board", () => {
  const board = [
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(getAvailable(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test("if getAvailable returns empty array on full board", () => {
  const board = [
    'X', 'O', 'X',
    'O', 'X', 'O',
    'X', 'O', 'X',
  ];

  expect(getAvailable(board)).toEqual([]);
});

test("if getAvailable returns all available spots", () => {
  const board = [
    'X',       undefined, 'X',
    'O',       undefined, 'O',
    undefined, 'O',       undefined,
  ];

  expect(getAvailable(board)).toEqual([1, 4, 6, 8]);
});

test("if place returns board with new mark", () => {
  const board = [
    'X',       'O',       undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  const expected = [
    'X',       'O',       'X',
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(place(board, 2, 'X')).toEqual(expected);
});

test("if place does nothing on wrong mark", () => {
  const board = [
    'X',       'O',       undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(place(board, 2, 'O')).toEqual(board);
});

test("if place does nothing on occupied spot", () => {
  const board = [
    'X',       'O',       undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined,
  ];

  expect(place(board, 0, 'O')).toEqual(board);
});

test("if Minimax AI prevents player from winning when possible", () => {
  const board = [
    'X',       undefined, 'X',
    undefined, 'O',       undefined,
    undefined, undefined, undefined,
  ];

  expect(getOptimalIndex(board)).toEqual(1);
});

test("if Minimax AI makes winning decision when possible", () => {
  const board = [
    'X',       'O',       'X',
    undefined, 'O',       'X',
    undefined, undefined, undefined,
  ];

  expect(getOptimalIndex(board)).toEqual(7);
});

test("if getSuboptimalIndex returns available position", () => {
  const board = [
    'X',       'O',       'X',
    undefined, 'O',       'X',
    undefined, undefined, undefined,
  ];

  expect([3, 6, 7, 8]).toContain(getSuboptimalIndex(board));
});


test("if getRandomIndex returns available position", () => {
  const board = [
    'X',       'O',       'X',
    undefined, 'O',       'X',
    undefined, undefined, undefined,
  ];

  expect([3, 6, 7, 8]).toContain(getRandomIndex(board));
});
