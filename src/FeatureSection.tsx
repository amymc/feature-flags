/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FlagRow from "./FlagRow";
import { useFlagsState } from "./utils/useFlagsState";
import { FlagProps } from "./flag";

const sectionWrapperStyles = css`
  width: 100%;

  &:not(:first-of-type) {
    width: 100%;
    & section {
      flex-direction: column;
    }
  }
  @media (min-width: 600px) {
    &:not(:first-of-type) {
      flex-basis: calc(50% - 10px);
    }

    &:nth-child(2n) {
      padding-right: 10px;
    }
    &:nth-child(3n) {
      padding-left: 10px;
    }
  }
`;

const sectionStyles = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const titleStyles = css`
  text-transform: uppercase;
`;

const cardStyles = css`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;
  background-color: #18191d;
  padding: 8px 16px;
  flex: 31%;
  margin: 10px;
  box-sizing: border-box;

  overflow: hidden;
  transition: all 0.3s ease;
`;

const fieldsetStyles = css`
  width: 90%;
  border: none;
`;

type Section = {
  label: string;
  flags: string[];
};

type Flags = {
  [key: string]: FlagProps;
};

type Props = {
  section: Section;
};

function getFlag(flags: Flags, flag: string) {
  return flags[flag];
}

const FeatureSection = ({ section }: Props) => {
  const { flagsState } = useFlagsState();

  return (
    <div css={sectionWrapperStyles}>
      <h1 css={titleStyles}>{section.label}</h1>
      <section css={sectionStyles}>
        {section.flags.map((flag) => {
          const { label, on, flags: childFlags } = getFlag(flagsState, flag);
          const showChildFlags = childFlags && on;
          return (
            <div
              key={label}
              data-testid={`${flag}-card`}
              css={css`
                max-height: ${showChildFlags ? "250px" : "60px"};
                ${cardStyles}
              `}
            >
              <FlagRow flag={flag} />
              {childFlags && (
                <fieldset css={fieldsetStyles}>
                  {childFlags.map((flag) => (
                    <FlagRow key={flag} flag={flag} />
                  ))}
                </fieldset>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default FeatureSection;
