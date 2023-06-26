import React from 'react';
import CPUGame from '../src/components/CPUGame';
import { render, fireEvent, screen, act  } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("<CPUGame />", () => {
  it("Should render empty board on initial load", () => {
    render(<CPUGame difficulty='easy' />);

    const squares = screen.queryAllByTestId("square");;

    expect(squares).not.toBeNull();
    expect(squares).toHaveLength(9);

    squares.forEach((square) => {
      expect(square.textContent).toBe("");
    });
  });

  it("Should update board on square click with player's move and AI's move", async () => {
    render(<CPUGame difficulty='easy' />);

    const squares = screen.queryAllByTestId("square");;

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    const availableSquares = squares.filter((square) => square.textContent === "");
    const markedSquares = squares.filter((square) => square.textContent !== "");

    expect(availableSquares).toHaveLength(7);
    expect(markedSquares).toHaveLength(2);
    expect(markedSquares[0].textContent).toBe("X");
    expect(markedSquares[1].textContent).toBe("O");
  });

  it("Should not update board on occupied square click", async () => {
    render(<CPUGame difficulty='easy' />);

    const squares = screen.queryAllByTestId("square");

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    const aiSquare = squares.find((square) => square.textContent === "O");

    await act(async () => {
      fireEvent.click(aiSquare);
    });

    expect(aiSquare.textContent).toBe("O");
  });
});