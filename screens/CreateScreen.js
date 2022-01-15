import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";

const CreateScreen = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quote: "",
      author: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SafeAreaView style={{ width: "84%", maxWidth: "84%" }}>
          <LinearGradient
            colors={[Colors.cardBgColor, Colors.backgroundColor]}
            style={{
              borderRadius: 15,
            }}
          >
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Create New Quote</Text>
              <View>
                <Text style={styles.label}>Quote</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textArea}
                      multiline={true}
                      numberOfLines={3}
                      placeholder="Type quote"
                      placeholderTextColor={"grey"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="quote"
                />
                {errors.quote && (
                  <Text style={styles.errorMessage}>This is required.</Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Author</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Who said it?"
                      placeholderTextColor={"grey"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="author"
                />
                {errors.author && (
                  <Text style={styles.errorMessage}>This is required.</Text>
                )}
              </View>
              <Button title="Create" onPress={handleSubmit(onSubmit)} />
            </View>
          </LinearGradient>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  formContainer: {
    height: "90%",
    justifyContent: "space-around",
    padding: 20,
  },
  formTitle: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 30,
  },
  label: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 25,
    marginBottom: 5,
  },
  textArea: {
    color: "black",
    fontFamily: "open-sans",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    height: 85,
    width: "100%",
  },
  input: {
    color: "black",
    fontFamily: "open-sans",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    height: 40,
  },
  errorMessage: {
    color: Colors.heartColor,
  },
});
