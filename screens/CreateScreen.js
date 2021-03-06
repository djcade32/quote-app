import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import { Overlay, Button } from "react-native-elements";

import NewQuoteForm from "../components/NewQuoteForm";
import Colors from "../constants/Colors";
import { quotesActions } from "../store/quotesSlice";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { v1 as uuidv1 } from "uuid";

const CreateScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const userId = useSelector((state) => state.auth.currentUser.uid);
  const dispatch = useDispatch();
  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      title: "Create Quote",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons
            name="ios-menu"
            size={30}
            color={Colors.actionButtonColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  function createQuoteHandler(quote) {
    const quoteId = uuidv1();

    const newQuote = {
      text: quote.text,
      author: quote.author,
      id: quoteId,
    };
    const data = { quote: newQuote, userId: userId };
    dispatch(quotesActions.addFavQuote(data));
    toggleOverlay();
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
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 17,
  },
});
