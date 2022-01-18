import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Button } from "react-native-elements";
import { Foundation } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const AuthScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.logo}>
          INSPR <Foundation name="comment-quotes" size={50} color={"white"} />
        </Text>
        <View style={styles.actionButtons}>
          <View style={styles.signInButtonWrapper}>
            <Button
              buttonStyle={{
                borderRadius: 15,
                backgroundColor: Colors.actionButtonColor,
              }}
              style={styles.signInButton}
              title={"SIGN IN"}
              onPress={() => props.navigation.navigate("Signin Screen")}
            />
          </View>
          <View style={styles.registerButtonWrapper}>
            <Button
              buttonStyle={{
                borderRadius: 15,
                backgroundColor: "transparent",
                borderColor: "white",
                borderWidth: 1.5,
              }}
              style={styles.registerButton}
              title={"REGISTER"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    width: "70%",
    height: "60%",
    justifyContent: "space-around",
  },
  logo: {
    color: "white",
    fontFamily: "montserrat",
    fontSize: 50,
    textAlign: "center",
  },
  actionButtons: {
    width: "100%",
  },
  signInButtonWrapper: {
    borderRadius: 15,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    marginVertical: 20,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButtonWrapper: {
    overflow: "hidden",
    borderRadius: 15,
    marginVertical: 20,
  },
  signInButton: {
    fontFamily: "open-sans",
  },
  registerButton: {
    fontFamily: "open-sans",
  },
});
