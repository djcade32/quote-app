import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, AntDesign, Octicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const QuoteCard = (props) => {
  const currentQuote = props.quote;
  const [isLiked, setIsLiked] = useState(currentQuote.isFavorite);
  function handleLikePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isLiked) {
      props.addFavQuoteHanlder(currentQuote);
      props.deleteQuoteHandler(currentQuote.id);
    } else {
      props.deleteFavQuoteHandler(currentQuote);
    }
  }

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
          <TouchableOpacity onPress={() => console.log("Share Clicked")}>
            <Entypo
              style={{ margin: 15 }}
              name="share"
              size={25}
              color={Colors.actionButtonColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLikePress}>
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
          <TouchableOpacity onPress={() => console.log("Download Clicked")}>
            <Ionicons
              style={{ margin: 15 }}
              name="ios-cloud-download"
              size={25}
              color={Colors.actionButtonColor}
            />
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
    justifyContent: "center",
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
