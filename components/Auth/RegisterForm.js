import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import Colors from "../../constants/Colors";
import * as Haptics from "expo-haptics";
import FormTextInput from "../FormTextInput";

const RegisterForm = (props) => {
  const dispatch = useDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      reenterPassword: "",
    },
  });

  function onSubmit(data) {
    reset({
      name: "",
      email: "",
      password: "",
      reenterPassword: "",
    });
    console.log(data);
    dispatch(authActions.createNewUser(data));
    props.navigation.replace("Signin Screen");
  }

  function onError() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Create New Account</Text>
      <FormTextInput
        labelName="Full Name"
        placeholder="Full Name"
        control={control}
        controllerName="name"
        errors={errors.name}
        rules={{ required: true }}
        errorMessage={"Must enter valid name"}
      />
      <FormTextInput
        labelName="Email"
        placeholder="Email"
        control={control}
        controllerName="email"
        errors={errors.email}
        rules={{
          required: true,
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
        errorMessage={"Must enter valid email"}
      />
      <FormTextInput
        labelName="Password"
        placeholder="Password"
        control={control}
        controllerName="password"
        errors={errors.password}
        hidden={true}
        rules={{
          required: true,
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        }}
        errorMessage={"Must have at least one capital letter"}
      />
      <FormTextInput
        labelName="Re-enter Password"
        placeholder="Re-enter Password"
        control={control}
        controllerName="reenterPassword"
        errors={errors.reenterPassword}
        hidden={true}
      />

      <View style={styles.signInButtonWrapper}>
        <Button
          buttonStyle={{
            borderRadius: 15,
            backgroundColor: Colors.actionButtonColor,
          }}
          style={styles.signInButton}
          title={"REGISTER"}
          onPress={handleSubmit(onSubmit, onError)}
        />
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: {
    width: "70%",
    height: "60%",
    justifyContent: "space-between",
  },

  title: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 25,
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
