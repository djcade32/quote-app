import React from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";

import Colors from "../../constants/Colors";
import RegisterForm from "../../components/Auth/RegisterForm";

const RegisterScreen = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <RegisterForm {...props} />
        <View style={{ flexDirection: "row", paddingTop: "10%" }}>
          <Text style={styles.signinHereText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Signin Screen")}
          >
            <Text style={styles.signinHereLink}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  signinHereText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-sans",
  },
  signinHereLink: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
