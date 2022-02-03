import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import QuoteCard from "../components/QuoteCard";
import CarouselComp from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { quotesActions } from "../store/quotesSlice";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const SavedScreen = (props) => {
  const favQuotesList = useSelector((state) => state.quotes.favQuotesList);

  const dispatch = useDispatch();
  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      title: "Saved Quotes",
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

  function addFavQuoteHandler(quote) {
    console.log(quote);
    // const data = { quote: quote, userId: userId };
    // console.log("saved screen: " + data);
    // dispatch(quotesActions.addFavQuote(userId));
  }

  function deleteFavQuoteHandler(quoteId) {
    dispatch(quotesActions.deleteFavQuote(quoteId));
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {favQuotesList.length > 0 ? (
          <CarouselComp
            layout="default"
            layoutCardOffset={15}
            data={favQuotesList}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            renderItem={({ item }) => (
              <QuoteCard
                quote={item}
                addFavQuoteHandler={addFavQuoteHandler}
                deleteFavQuoteHandler={deleteFavQuoteHandler}
              />
            )}
          />
        ) : (
          <Text
            style={{ color: "white", fontFamily: "open-sans", fontSize: 20 }}
          >
            You have no saved quotes.
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
});
