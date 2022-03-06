import React from "react";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { render, screen } from "@testing-library/react";
import FeatureSection from "./FeatureSection";

const mockedSetFlagState = jest.fn();

jest.mock("./utils/useFlagsState", () => ({
  useFlagsState: () => ({
    flagsState: {
      alertManager: {
        label: "Alert Manager",
        on: false,
        value: 5,
        flags: ["alertsEdit"],
      },
      alertRules: {
        label: "Alert Rules",
        on: true,
        flags: ["alertsAdd", "alertsDelete"],
      },
      alertsAdd: {
        label: "Add Alerts",
        on: false,
      },
      alertsDelete: {
        label: "Delete Alerts",
        on: true,
      },
      alertsEdit: {
        label: "Edit ALerts",
        on: true,
      },
    },
    setFlagsState: mockedSetFlagState,
  }),
}));

const mockSection = {
  label: "Alerts",
  flags: ["alertManager", "alertRules"],
};

test("renders flags for a section", () => {
  render(
    <CacheProvider value={cache}>
      <FeatureSection section={mockSection} />
    </CacheProvider>
  );
  expect(screen.getByText("Alert Manager")).toBeInTheDocument();
  expect(screen.getByText("Alert Rules")).toBeInTheDocument();
});

test("only shows child flags if parent is on", () => {
  render(
    <CacheProvider value={cache}>
      <FeatureSection section={mockSection} />
    </CacheProvider>
  );

  expect(screen.getByTestId("alertManager-card")).toHaveStyle(
    "max-height: 60px"
  );

  expect(screen.getByTestId("alertRules-card")).toHaveStyle(
    "max-height: 250px"
  );
});
