import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";

import AuthStackNavigation from "./navigation/AuthStackNavigation";
import DrawerNavigation from "./navigation/DrawerNavigation";

enableScreens();

// Loading fonts
function fetchFonts() {
  return Font.loadAsync({
    montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
    "montserrat-italic": require("./assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      // Make sure all fonts are loaded before app shows screen
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStackNavigation />
        {/* <DrawerNavigation /> */}
      </NavigationContainer>
    </Provider>
  );
}
