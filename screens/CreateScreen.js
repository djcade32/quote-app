import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Text,
} from "react-native";
import { Overlay, Button } from "react-native-elements";

import NewQuoteForm from "../components/NewQuoteForm";
import Colors from "../constants/Colors";
import { quotesActions } from "../store/quotesSlice";

const CreateScreen = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  function createQuoteHandler(data) {
    dispatch(quotesActions.addQuote(data));
    toggleOverlay();
    // Alert.alert("New Quote", "Sucess!", [
    //   { text: "OK", onPress: () => console.log("OK Pressed") },
    // ]);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SafeAreaView style={{ width: "84%", maxWidth: "84%" }}>
          <NewQuoteForm createQuoteHandler={createQuoteHandler} />
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={styles.textPrimary}>SUCCESS!</Text>
            <Text style={styles.textSecondary}>New quote created.</Text>
            <Button
              buttonStyle={styles.button}
              title="Okay"
              onPress={toggleOverlay}
            />
          </Overlay>
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
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
