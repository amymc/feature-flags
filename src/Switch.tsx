/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useFlagsState } from "./utils/useFlagsState";

const inputStyles = css`
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + label {
    background-color: #477a85;
  }
  &:checked + label:after {
    left: calc(100% - 3px);
    transform: translateX(-100%);
  }
`;

const labelStyles = css`
  display: block;
  width: 60px;
  height: 25px;
  background-color: #243d42;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 0 0 20px #477a8550;
  &:after {
    content: "";
    width: 20px;
    height: 20px;
    background-color: #e8f5f7;
    position: absolute;
    border-radius: 70px;
    top: 3px;
    left: 3px;
    transition: 0.5s;
  }
`;

type Props = {
  flag: string;
};

const Switch = ({ flag }: Props) => {
  const { flagsState, setFlagsState } = useFlagsState();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlagsState(e);
  };
  return (
    <>
      <input
        css={inputStyles}
        type="checkbox"
        name={flag}
        id={flag}
        checked={flagsState[flag].on}
        onChange={onChange}
        data-testid={`${flag}-switch`}
      />
      <label css={labelStyles} htmlFor={flag}></label>
    </>
  );
};

export default Switch;
