import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import QuoteCard from "../components/QuoteCard";
import { FAVQUOTES } from "../data/favQuotes";
import CarouselComp from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { quotesActions } from "../store/quotesSlice";

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const SavedScreen = (props) => {
  const dispatch = useDispatch();
  const favQuotesList = useSelector((state) => state.quotes.favQuotesList);

  function addFavQuoteHandler(quoteId) {
    dispatch(quotesActions.addFavQuote(quoteId));
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
                addFavQuoteHanlder={addFavQuoteHandler}
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
