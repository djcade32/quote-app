import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Colors from "../constants/Colors";

const FormTextInput = (props) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);

  return (
    <View>
      {inputIsFocused && (
        <Text
          style={
            props.errors
              ? [styles.label, { color: Colors.heartColor }]
              : styles.label
          }
        >
          {props.labelName}
        </Text>
      )}
      <Controller
        control={props.control}
        rules={props.rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry={props.hidden && true}
            selectionColor={"white"}
            onFocus={() => {
              setInputIsFocused(true);
            }}
            style={[
              styles.input,
              inputIsFocused
                ? {
                    borderBottomColor: "white",
                  }
                : { borderBottomColor: Colors.actionButtonColor },
              props.errors && styles.errorInput,
            ]}
            placeholder={inputIsFocused ? "" : props.placeholder}
            placeholderTextColor={
              props.errors ? Colors.heartColor : Colors.actionButtonColor
            }
            onBlur={() => {
              setInputIsFocused(false);
            }}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={props.controllerName}
      />
      {props.errors && (
        <Text style={styles.errorMessage}>{props.errorMessage}</Text>
      )}
    </View>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
  },
  errorInput: {
    borderBottomColor: Colors.heartColor,
    borderBottomWidth: 1,
  },
  errorMessage: {
    marginTop: 5,
    color: Colors.heartColor,
  },
});
