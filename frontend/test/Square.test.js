import React from 'react';
import Square from '../src/components/Square';
import { render, fireEvent, screen, act  } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("<Square />", () => {
  it("Should render provided value", () => {
    render(<Square value="X" />);

    expect(screen.queryByTestId("square")).not.toBeNull();
    expect(screen.getByTestId("square").textContent).toBe("X");
  });

  it("Should call onClick on click", async () => {
    const mockCallback = jest.fn(() => {});
    render(<Square onClick={mockCallback} />);

    await act(async () => {
      fireEvent.click(screen.getByTestId("square"));
    });

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});