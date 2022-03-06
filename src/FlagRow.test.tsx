import React from "react";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { render, screen } from "@testing-library/react";
import FlagRow from "./FlagRow";

jest.mock("./utils/useFlagsState", () => ({
  useFlagsState: () => ({
    flagsState: {
      dashboard: {
        label: "Dashboard",
        on: true,
        value: 5,
      },
      monthlyChart: {
        label: "Monthly Chart",
        on: true,
      },
    },
  }),
}));

test("Renders label and switch", () => {
  render(
    <CacheProvider value={cache}>
      <FlagRow flag="monthlyChart" />
    </CacheProvider>
  );
  expect(screen.getByText("Monthly Chart")).toBeInTheDocument();

  const dashboardSwitch = screen.getByTestId("monthlyChart-switch");
  expect(dashboardSwitch).toBeInTheDocument();

  const monthlyChartInput = screen.queryByTestId("monthlyChart-numeric-input");
  expect(monthlyChartInput).toBeNull();
});

test("renders numeric input when value field is a number", () => {
  render(
    <CacheProvider value={cache}>
      <FlagRow flag="dashboard" />
    </CacheProvider>
  );

  const dashboardInput = screen.getByTestId("dashboard-numeric-input");
  expect(dashboardInput).toBeInTheDocument();
});
