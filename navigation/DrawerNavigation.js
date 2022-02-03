import React from "react";
import { StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import TabNavigation from "./TabNavigation";
import Colors from "../constants/Colors";
import { quotesActions } from "../store/quotesSlice";

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      initialRouteName="TabNavigation"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              labelStyle={{ fontFamily: "open-sans", color: "black" }}
              onPress={() => {
                dispatch(quotesActions.resetInitialState());
                dispatch(authActions.signOut());
              }}
            />
          </DrawerContentScrollView>
        );
      }}
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
            fontFamily: "open-sans",
            color: "black",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
