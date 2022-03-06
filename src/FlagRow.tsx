/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { JSX as EmotionJSX } from "@emotion/react/jsx-runtime";
import { useFlagsState } from "./utils/useFlagsState";
import NumericInput from "./NumericInput";
import Switch from "./Switch";
import { FlagProps } from "./flag";

const flagStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 10px 0;

  & > :nth-child(2) {
    margin: 0px 10px 0px auto;
  }
`;

type Flags = {
  [key: string]: FlagProps;
};

type Props = {
  flag: string;
};

enum InputsEnum {
  NUMBER = "number",
  // STRING = "string",
}

const inputs = {
  [InputsEnum.NUMBER]: (flag: string) => <NumericInput flag={flag} />,
  //[InputsEnum.STRING]: <TextField />,
};

type Inputs = { [key: string]: (a: string) => EmotionJSX.Element };

function getFlag(flags: Flags, flag: string) {
  return flags[flag];
}

function getAdditionalInput(
  inputs: Inputs,
  flag: string,
  value: string | number
) {
  return inputs[typeof value](flag);
}

const FlagRow = ({ flag }: Props) => {
  const { flagsState } = useFlagsState();
  const { label, on, value } = getFlag(flagsState, flag);
  const showAdditionalInput = value && on;

  return (
    <div css={flagStyles}>
      <span>{label}</span>
      {showAdditionalInput && getAdditionalInput(inputs, flag, value)}

      <Switch flag={flag} />
    </div>
  );
};

export default FlagRow;
