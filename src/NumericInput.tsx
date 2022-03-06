/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useFlagsState } from "./utils/useFlagsState";

const inputStyles = css`
  width: 60px;
  border-radius: 4px;
  padding: 2px 4px;
  background-color: #0d0d0f;
  color: #fff;
`;

type Props = {
  flag: string;
};

const NumericInput = ({ flag }: Props) => {
  const { flagsState, setNumericValue } = useFlagsState();
  const values = Array.from(Array(20), (_, i) => i + 1);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumericValue(event);
  };

  return (
    <select
      onChange={onChange}
      css={inputStyles}
      name={flag}
      value={flagsState[flag].value}
      data-testid={`${flag}-numeric-input`}
    >
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default NumericInput;
