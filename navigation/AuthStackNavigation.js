import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import SigninScreen from "../screens/SigninScreen";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor:
        //     Platform.OS === "android" ? Colorsrs.primaryColor : "",
        // },
        // headerTintColor:
        //   Platform.OS === "android" ? "white" : Colors.primaryColor,
        // headerTitleStyle: {
        //   fontFamily: "open-sans-bold",
        // },
      }}
    >
      <Stack.Screen name="Auth Screen" component={AuthScreen} />
      <Stack.Screen name="Signin Screen" component={SigninScreen} />
      <Stack.Screen name="Home Screen" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
