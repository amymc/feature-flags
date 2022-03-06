import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Switch from "./Switch";

const mockedSetFlagState = jest.fn();

jest.mock("./utils/useFlagsState", () => ({
  useFlagsState: () => ({
    flagsState: {
      dashboard: {
        label: "Dashboard",
        on: true,
      },
      monthlyChart: {
        label: "Monthly Chart",
        on: false,
      },
    },
    setFlagsState: mockedSetFlagState,
  }),
}));

test("calls setter function when toggled", () => {
  render(<Switch flag="dashboard" />);

  const dashboardSwitch = screen.getByTestId(
    "dashboard-switch"
  ) as HTMLInputElement;
  expect(dashboardSwitch.checked).toEqual(true);

  fireEvent.click(dashboardSwitch);
  expect(mockedSetFlagState).toHaveBeenCalled();
});

test("switch is off when on field is false", () => {
  render(<Switch flag="monthlyChart" />);

  const monhtlyChartSwitch = screen.getByTestId(
    "monthlyChart-switch"
  ) as HTMLInputElement;
  expect(monhtlyChartSwitch.checked).toEqual(false);
});
