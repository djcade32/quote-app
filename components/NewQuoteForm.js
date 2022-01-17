import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import Colors from "../constants/Colors";
import * as Haptics from "expo-haptics";

const NewQuoteForm = (props) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
      author: "",
    },
  });

  function onSubmit(data) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset({
      text: "",
      author: "",
    });
    console.log(data);
    props.createQuoteHandler(data);
  }

  function onError() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }

  return (
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
                style={[styles.textArea, errors.text && styles.errorInput]}
                multiline={true}
                numberOfLines={3}
                placeholder="Type quote"
                placeholderTextColor={"grey"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="text"
          />
          {errors.text && (
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
                style={[styles.input, errors.author && styles.errorInput]}
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
        <View style={styles.buttonWrapper}>
          <Button title="Create" onPress={handleSubmit(onSubmit, onError)} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewQuoteForm;

const styles = StyleSheet.create({
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
    borderRadius: 15,
    padding: 5,
    height: 85,
    width: "100%",
  },
  input: {
    color: "black",
    fontFamily: "open-sans",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    height: 40,
  },
  errorInput: {
    borderColor: Colors.heartColor,
    borderWidth: 1.5,
  },
  errorMessage: {
    marginTop: 5,
    color: Colors.heartColor,
  },
  buttonWrapper: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
  },
});
