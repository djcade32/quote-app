import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import QuoteCard from "../components/QuoteCard";
import { QUOTES } from "../data/quotes";
import { FAVQUOTES } from "../data/favQuotes";
import CarouselComp from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { quotesActions } from "../store/quotesSlice";
import { authActions } from "../store/authSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const HomeScreen = (props) => {
  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      title: "Quotes",
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

  const [isLoading, setLoading] = useState(true);
  const [quotesFetched, setQuotesFetched] = useState(false);
  const [quote, setQuote] = useState([]);
  const [count, setCount] = useState(0);
  const [allQuotes, setAllQuotes] = useState([]);

  const quotesList = useSelector((state) => state.quotes.quotesList);
  const userId = useSelector((state) => state.auth.currentUser.uid);
  const dispatch = useDispatch();

  const getQuotesApi = async () => {
    try {
      const response = await fetch("https://zenquotes.io/api/quotes/");
      const json = await response.json();
      setQuote(json);
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!quotesFetched) {
  //     fetchAllQuotes();
  //     setQuotesFetched(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (count === 0) {
  //     getQuotesApi();
  //     setCount(1);
  //   }
  //   if (!isLoading) {
  //     dispatch(quotesActions.addQuotes(quote));
  //   }
  // }, [isLoading]);

  function addFavQuoteHandler(quote) {
    console.log("added Fav Quote");
    const data = {
      quote: quote,
      userId: userId,
    };

    dispatch(quotesActions.addFavQuote(data));
  }

  function deleteFavQuoteHandler(quote) {
    console.log("delete Fav Quote");

    // dispatch(quotesActions.deleteFavQuote(quote));
  }

  function deleteQuoteHandler(quote) {
    console.log("delete Quote");

    dispatch(quotesActions.deleteQuote(quote));
  }

  return (
    <View style={styles.container}>
      {/* {isLoading ? (
        <ActivityIndicator />
      ) : ( */}
      <SafeAreaView>
        <CarouselComp
          layout="default"
          layoutCardOffset={15}
          data={quotesList}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          renderItem={({ item }) => (
            <QuoteCard
              quote={item}
              addFavQuoteHandler={addFavQuoteHandler}
              deleteFavQuoteHandler={deleteFavQuoteHandler}
              deleteQuoteHandler={deleteQuoteHandler}
              initialSaveState={false}
            />
          )}
        />
      </SafeAreaView>
      {/* )} */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
});
