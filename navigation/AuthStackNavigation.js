import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/Auth/AuthScreen";
import SigninScreen from "../screens/Auth/SigninScreen";
import DrawerNavigation from "./DrawerNavigation";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth Screen" component={AuthScreen} />
      <Stack.Screen name="Signin Screen" component={SigninScreen} />
      <Stack.Screen name="Home Screen" component={DrawerNavigation} />
      <Stack.Screen name="Register Screen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
