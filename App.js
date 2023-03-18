import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "./src/contexts/UserContext";
import { fetchFonts } from "./src/helper";
import Routes from "./Routes";
import { StatusBar } from "react-native";

const theme = createTheme({
  lightColors: {
    primary: "#45A2DB",
    light: "#99C8E4",
    lighter: "#B1D7EE",
    lightest: "##BCEBF7",
    error: "#FF4D4D",
    success: "#35CB43",
    grey: "#A1A1A1",
    grey2: "#A2A2A2",
    grey3: "#EEEEEE",
    white: "#fff",
    black: "#000",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          {/* <StatusBar> */}
          <Routes onLayoutRootView={onLayoutRootView}></Routes>
          {/* </StatusBar> */}
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
