import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumericInput from "./NumericInput";

const mockedSetNumericValue = jest.fn();

jest.mock("./utils/useFlagsState", () => ({
  useFlagsState: () => ({
    flagsState: {
      dashboard: {
        label: "Dashboard",
        on: false,
        value: 5,
      },
    },
    setNumericValue: mockedSetNumericValue,
  }),
}));

test("calls setter function when selected", () => {
  render(<NumericInput flag="dashboard" />);
  const numericInput = screen.getByTestId("dashboard-numeric-input");
  expect(numericInput).toHaveValue("5");
  fireEvent.change(numericInput, { target: { value: 2 } });
  expect(mockedSetNumericValue).toHaveBeenCalled();
});
