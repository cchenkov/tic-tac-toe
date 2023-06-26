import React from 'react';
import CopyableInput from '../src/components/CopyableInput';
import { render, fireEvent, screen, act  } from "@testing-library/react";
import '@testing-library/jest-dom';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("<CopyableInput />", () => {
  it("Should display input and its text content", () => {
    render(<CopyableInput text="abc" />);
    expect(screen.queryByTestId("copyable-input")).not.toBeNull();
    expect(screen.getByTestId("copyable-input")).toHaveValue("abc");
  });

  it("Should display Copy button", () => {
    render(<CopyableInput text="abc" />);
    expect(screen.queryByTestId("copy-button")).not.toBeNull();
    expect(screen.getByTestId("copy-button").textContent).toBe("Copy");
  });

  it("Should display tooltip on click", async () => {
    render(<CopyableInput text="abc" />);

    await act(async () => {
      fireEvent.click(screen.getByTestId("copy-button"));
    });

    expect(screen.getByText("Copied")).toBeInTheDocument();
  });

  it("Should call clipboard.writeText on click", async () => {
    render(<CopyableInput text="abc" />);

    await act(async () => {
      fireEvent.click(screen.getByTestId("copy-button"));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("abc");
  });
});
