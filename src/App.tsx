/** @jsxImportSource @emotion/react */
import { css, CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import FlagsProvider from "./utils/useFlagsState";
import FeatureSection from "./FeatureSection";
import data from "./data/flags.json";

cache.compat = true;
const { sections } = data;

const appStyles = css`
  background-color: #0d0d0f;
  color: #fff;
  padding: 16px;
  min-height: 100%;
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
`;

function App() {
  return (
    <CacheProvider value={cache}>
      <FlagsProvider>
        <form css={appStyles}>
          {Object.values(sections).map((section) => (
            <FeatureSection key={section.label} section={section} />
          ))}
        </form>
      </FlagsProvider>
    </CacheProvider>
  );
}

export default App;
