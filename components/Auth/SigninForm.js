import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Button } from "react-native-elements";
import { Foundation } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import FormTextInput from "../FormTextInput";
import Colors from "../../constants/Colors";
import * as Haptics from "expo-haptics";

const SigninForm = (props) => {
  const dispatch = useDispatch();

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
    dispatch(authActions.login(data));
    if (dispatch(authActions.isLoggedIn())) {
      props.navigation.replace("Home Screen");
    } else {
      console.log("Incorrect Credentials");
    }
  }

  function onError() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
  return (
    <View style={styles.formContainer}>
      <Text style={styles.logo}>
        INSPR <Foundation name="comment-quotes" size={50} color={"white"} />
      </Text>
      <FormTextInput
        labelName="Email"
        placeholder="Email"
        control={control}
        controllerName="email"
        errors={errors.email}
        rules={{ required: true }}
      />
      <FormTextInput
        labelName="Password"
        placeholder="Password"
        control={control}
        controllerName="password"
        errors={errors.password}
        hidden={true}
        rules={{ required: true }}
      />

      {errors.email || errors.password ? (
        <Text style={styles.errorMessage}>
          Incorrect credentials. Try again
        </Text>
      ) : null}

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
  );
};

export default SigninForm;

const styles = StyleSheet.create({
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
});
