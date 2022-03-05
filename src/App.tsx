/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FlagsProvider, { useFlagsState } from "./utils/useFormData";
import FeatureSection from "./FeatureSection";
import data from "./data/flags.json";

const { sections } = data;

const appStyles = css`
  background-color: #0d0d0f;
  color: #fff;
  padding: 16px;
  min-height: 100%;

  display: flex;
  flex-wrap: wrap;
`;

function App() {
  return (
    <FlagsProvider>
      <form css={appStyles}>
        {Object.values(sections).map((section) => (
          <FeatureSection key={section.label} section={section} />
        ))}
      </form>
    </FlagsProvider>
  );
}

export default App;
