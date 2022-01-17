import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

// import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      color={"white"}
      //   color={Platform.OS === "android" ? "white" : Colors.primaryColor}
      {...props}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
