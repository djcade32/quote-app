import React from "react";
import { useDispatch } from "react-redux";
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

  function addFavQuoteHandler(quoteId) {
    dispatch(quotesActions.addFavQuote(quoteId));
  }

  function deleteFavQuoteHandler(quoteId) {
    dispatch(quotesActions.deleteFavQuote(quoteId));
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CarouselComp
          layout="default"
          layoutCardOffset={15}
          data={FAVQUOTES}
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
