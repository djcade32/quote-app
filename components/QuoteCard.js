import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import { Entypo, AntDesign, Octicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const QuoteCard = (props) => {
  const favQuotesList = useSelector((state) => state.quotes.favQuotesList);
  const currentQuote = props.quote;
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (favQuotesList.find((quote) => quote.id === currentQuote.id)) {
      console.log("It is in favorites list");
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, []);
  function handleLikePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (favQuotesList.find((quote) => quote.id === currentQuote.id)) {
      console.log("It is in favorites list");
      setIsLiked(false);
      // props.deleteFavQuoteHandler(currentQuote);
    } else {
      setIsLiked(true);
      props.addFavQuoteHandler(currentQuote);
    }
  }

  const shareHandler = async () => {
    const message = '"' + currentQuote.text + '"\n\n-' + currentQuote.author;
    try {
      await Share.share({
        message: message,
        // const result = await Share.share({
        //   message:
        //     'React Native | A framework for building native apps using React',
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      if (Share.dismissedAction) {
        console.log("Dissmissed!!!!");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <LinearGradient
      colors={[Colors.cardBgColor, Colors.backgroundColor]}
      style={{
        borderRadius: 15,
      }}
    >
      <View style={styles.quoteCard} key={currentQuote.id}>
        <View style={styles.quoteSection}>
          <Octicons
            style={styles.quotationMark}
            name="quote"
            size={30}
            color={"white"}
          />
          <Text style={styles.quoteText}>{currentQuote.text}</Text>
          <Text style={styles.quoteAuthor}>- {currentQuote.author}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={handleLikePress}
            style={{ marginRight: 10 }}
          >
            <View
              style={{
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <LinearGradient
                colors={["#df673f", Colors.heartColor]}
                style={styles.heartIconContainer}
              >
                <AntDesign
                  name={isLiked ? "heart" : "hearto"}
                  size={25}
                  color={"white"}
                />
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareHandler}>
            <View
              style={{
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              {/* <LinearGradient
                colors={["#df673f", Colors.heartColor]}
                style={styles.heartIconContainer}
              > */}
              <Entypo name="share" size={25} color={Colors.actionButtonColor} />
              {/* </LinearGradient> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default QuoteCard;

const styles = StyleSheet.create({
  quoteCard: {
    padding: 20,
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  },
  quotationMark: {
    marginBottom: 20,
  },
  quoteText: {
    color: "white",
    fontSize: 30,
    fontFamily: "montserrat",
    lineHeight: 50,
  },
  quoteAuthor: {
    marginTop: 10,
    color: "white",
    fontSize: 20,
    fontFamily: "montserrat-italic",
    textAlign: "right",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  heartIconContainer: {
    backgroundColor: Colors.heartColor,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    margin: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
