import React, { useContext, useState } from "react";
import data from "../data/flags.json";
import { FlagProps } from "../flag";

const { flags } = data;

type FlagsState = {
  [key: string]: FlagProps;
};

type ValueProps = {
  flagsState: FlagsState;
  setFlagsState: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setNumericValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const FlagsContext = React.createContext<ValueProps>({
  flagsState: {},
  setFlagsState: () => {},
  setNumericValue: () => {},
});

export const useFlagsState = () => useContext(FlagsContext);

type Props = {
  children: React.ReactNode;
};

function getChildFlags(flags: FlagsState, name: string) {
  return flags[name].flags;
}

const FlagsProvider = ({ children }: Props) => {
  const [flagsState, setState] = useState<FlagsState>(flags);

  const setFlagsState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const childFlags = getChildFlags(flags, event.target.name);
    setState((prevState) => {
      const disableChildFlags = childFlags && prevState[event.target.name].on;
      const updatedChildFlags = disableChildFlags
        ? Object.fromEntries(
            childFlags.map((flag) => [
              flag,
              { ...prevState[flag], on: !prevState[event.target.name].on },
            ])
          )
        : {};

      const updatedFlag = {
        ...prevState[event.target.name],
        on: !prevState[event.target.name].on,
      };

      return {
        ...prevState,
        [event.target.name]: updatedFlag,
        ...updatedChildFlags,
      };
    });
  };

  const setNumericValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => {
      const updatedFlag = {
        ...prevState[event.target.name],
        value: parseInt(event.target.value, 10),
      };
      return {
        ...prevState,
        [event.target.name]: updatedFlag,
      };
    });
  };

  const value = {
    flagsState,
    setFlagsState,
    setNumericValue,
  };

  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
};

export default FlagsProvider;
