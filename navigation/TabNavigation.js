import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import CreateScreen from "../screens/CreateScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();
const headerTitleStyle = {
  color: "white",
  fontSize: 20,
  fontFamily: "open-sans",
};
const tabBarStyle = {
  backgroundColor: Colors.backgroundColor,
  borderTopColor: "transparent",
  elevation: 0, // for Android
  shadowOffset: {
    width: 0,
    height: 0, // for iOS
  },
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginBottom: 20,
        },
        tabBarStyle: tabBarStyle,
      }}
    >
      <Tab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="create" size={25} color={tabInfo.color} />;
          },
          headerTitleStyle: headerTitleStyle,
          headerStyle: tabBarStyle,
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitleStyle: headerTitleStyle,
          headerStyle: tabBarStyle,
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="home" size={25} color={tabInfo.color} />;
          },
        }}
      />
      <Tab.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          headerTitleStyle: headerTitleStyle,
          headerStyle: tabBarStyle,
          tabBarIcon: (tabInfo) => {
            return <AntDesign name="heart" size={25} color={tabInfo.color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
