import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FilterScreen from "../screens/FilterScreen";
import TabNavigation from "./TabNavigation";
import Colors from "../constants/Colors";

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.backgroundColor,
        drawerLabelStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          drawerLabel: "Home",
          drawerLabelStyle: {
            color: "black",
          },
        }}
      />
      <Drawer.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          drawerLabel: "Filters",
          drawerLabelStyle: {
            color: "black",
          },
        }}
      />
      {/* <Drawer.Screen
        name="Filters"
        component={FiltersScreen}
        options={{ headerShown: true }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
