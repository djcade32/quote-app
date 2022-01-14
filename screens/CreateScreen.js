import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const CreateScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Create Screen</Text>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
