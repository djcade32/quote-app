import React from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import SigninForm from "../../components/Auth/SigninForm";

import Colors from "../../constants/Colors";

const SigninScreen = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <SigninForm {...props} />
        <View style={{ flexDirection: "row", paddingTop: "10%" }}>
          <Text style={styles.registerHereText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register Screen")}
          >
            <Text style={styles.registerHereLink}> Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  registerHereText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-sans",
  },
  registerHereLink: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
