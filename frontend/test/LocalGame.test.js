import React from 'react';
import LocalGame from '../src/components/LocalGame';
import { render, fireEvent, screen, act  } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("<LocalGame />", () => {
  it("Should render empty board on initial load", () => {
    render(<LocalGame />);

    const squares = screen.queryAllByTestId("square");;

    expect(squares).not.toBeNull();
    expect(squares).toHaveLength(9);

    squares.forEach((square) => {
        expect(square.textContent).toBe("");
    });
  });

  it("Should update board on square click", async () => {
    render(<LocalGame />);

    const squares = screen.queryAllByTestId("square");;

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    await act(async () => {
      fireEvent.click(squares[1]);
    });

    expect(squares[0].textContent).toBe("X");
    expect(squares[1].textContent).toBe("O");

    squares.slice(2).forEach((square) => {
      expect(square.textContent).toBe("");
    });
  });

  it("Should not update board on occupied square click", async () => {
    render(<LocalGame />);

    const squares = screen.queryAllByTestId("square");

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    expect(squares[0].textContent).toBe("X");

    squares.slice(1).forEach((square) => {
      expect(square.textContent).toBe("");
    });
  });

  it("Should render correct player's turn prompt", async () => {
    render(<LocalGame />);

    const prompt = screen.queryByTestId("prompt");

    expect(prompt.textContent).toBe("X's turn");

    const squares = screen.queryAllByTestId("square");

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    expect(prompt.textContent).toBe("O's turn");

    await act(async () => {
      fireEvent.click(squares[0]);
    });

    expect(prompt.textContent).toBe("O's turn");

    await act(async () => {
      fireEvent.click(squares[1]);
    });

    expect(prompt.textContent).toBe("X's turn");
  });

  it("Should render draw result prompt", async () => {
    render(<LocalGame />);

    let squares = screen.queryAllByTestId("square");

    await act(async () => fireEvent.click(squares[0]));
    await act(async () => fireEvent.click(squares[1]));
    await act(async () => fireEvent.click(squares[2]));
    await act(async () => fireEvent.click(squares[4]));
    await act(async () => fireEvent.click(squares[3]));
    await act(async () => fireEvent.click(squares[5]));
    await act(async () => fireEvent.click(squares[7]));
    await act(async () => fireEvent.click(squares[6]));
    await act(async () => fireEvent.click(squares[8]));

    squares.forEach((square) => {
      expect(square.textContent).not.toBeNull();
      expect(square.textContent).not.toBe("");
    });

    const prompt = screen.queryByTestId("prompt");

    expect(prompt.textContent).toBe("Draw");
  });

  it("Should render winner result prompt", async () => {
    render(<LocalGame />);

    let squares = screen.queryAllByTestId("square");

    await act(async () => fireEvent.click(squares[0]));
    await act(async () => fireEvent.click(squares[1]));
    await act(async () => fireEvent.click(squares[2]));
    await act(async () => fireEvent.click(squares[3]));
    await act(async () => fireEvent.click(squares[4]));
    await act(async () => fireEvent.click(squares[5]));
    await act(async () => fireEvent.click(squares[6]));

    squares.slice(0, -2).forEach((square) => {
      expect(square.textContent).not.toBeNull();
      expect(square.textContent).not.toBe("");
    });

    const prompt = screen.queryByTestId("prompt");

    expect(prompt.textContent).toBe("Winner: X");
  });
});