import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createEmotionCache } from "./utils/create-emotion-cache";
import { store } from "./store";
import { createTheme } from "./theme";
import { BeaconProvider } from "./contexts/BeaconContext";

const clientSideEmotionCache = createEmotionCache();

const Providers: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children,
}) => (
  <CacheProvider value={clientSideEmotionCache}>
    <ReduxProvider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider
          theme={createTheme({
            direction: "ltr",
            responsiveFontSizes: true,
            mode: "dark",
          })}
        >
          <CssBaseline />
          <Toaster position="top-center" />
          <BeaconProvider>{children}</BeaconProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </ReduxProvider>
  </CacheProvider>
);

export default Providers;
