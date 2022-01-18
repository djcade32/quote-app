import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { Foundation } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import Colors from "../constants/Colors";

const LoginScreen = (props) => {
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    reset({
      email: "",
      password: "",
    });
    props.navigation.navigate("Home Screen");
  }

  function onError() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <View style={styles.formContainer}>
          <Text style={styles.logo}>
            INSPR <Foundation name="comment-quotes" size={50} color={"white"} />
          </Text>
          <View>
            {emailIsFocused && (
              <Text
                style={
                  errors.email
                    ? [styles.label, { color: Colors.heartColor }]
                    : styles.label
                }
              >
                Email
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  selectionColor={"white"}
                  onFocus={() => {
                    setEmailIsFocused(true);
                  }}
                  style={[
                    styles.input,
                    emailIsFocused
                      ? {
                          borderBottomColor: "white",
                        }
                      : { borderBottomColor: Colors.actionButtonColor },
                    errors.email && styles.errorInput,
                  ]}
                  placeholder={emailIsFocused ? "" : "Email"}
                  placeholderTextColor={
                    errors.email ? Colors.heartColor : Colors.actionButtonColor
                  }
                  onBlur={() => {
                    setEmailIsFocused(false);
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {/* {errors.email && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )} */}
          </View>
          <View>
            {passwordIsFocused && (
              <Text
                style={
                  errors.password
                    ? [styles.label, { color: Colors.heartColor }]
                    : styles.label
                }
              >
                Password
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry={true}
                  selectionColor={"white"}
                  onFocus={() => {
                    setPasswordIsFocused(true);
                  }}
                  style={[
                    styles.input,
                    passwordIsFocused
                      ? {
                          borderBottomColor: "white",
                        }
                      : { borderBottomColor: Colors.actionButtonColor },
                    errors.password && styles.errorInput,
                  ]}
                  placeholder={passwordIsFocused ? "" : "Password"}
                  placeholderTextColor={
                    errors.password
                      ? Colors.heartColor
                      : Colors.actionButtonColor
                  }
                  onBlur={() => {
                    setPasswordIsFocused(false);
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {/* {errors.password && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )} */}
          </View>
          {errors.password && (
            <Text style={styles.errorMessage}>
              Incorrect credentials. Try again
            </Text>
          )}
          <View style={styles.signInButtonWrapper}>
            <Button
              buttonStyle={{
                borderRadius: 15,
                backgroundColor: Colors.actionButtonColor,
              }}
              style={styles.signInButton}
              title={"SIGN IN"}
              onPress={handleSubmit(onSubmit, onError)}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingTop: "20%" }}>
          <Text style={styles.registerHereText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.registerHereLink}> Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  formContainer: {
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
  label: {
    color: "white",
    fontSize: 20,
    fontFamily: "open-sans",
    padding: 5,
  },
  input: {
    color: "white",
    fontSize: 20,
    fontFamily: "open-sans",
    padding: 5,
    borderBottomWidth: 1.5,
  },
  errorInput: {
    borderBottomColor: Colors.heartColor,
    borderBottomWidth: 1.5,
  },
  errorMessage: {
    textAlign: "center",
    marginTop: 5,
    color: Colors.heartColor,
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
  signInButton: {
    fontFamily: "open-sans",
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
