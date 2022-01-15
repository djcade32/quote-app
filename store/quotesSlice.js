import { createSlice } from "@reduxjs/toolkit";
import { QUOTES } from "../data/quotes";
import { FAVQUOTES } from "../data/favQuotes";
import QuoteModel from "../models/quoteModel";
import "react-native-get-random-values";
import { v1 as uuidv1 } from "uuid";

const initialQuotesState = {
  quotesList: QUOTES,
  favQuotesList: FAVQUOTES,
};
const quotesSlice = createSlice({
  name: "quotes",
  initialState: initialQuotesState,
  reducers: {
    addQuote(state, action) {
      const quoteId = uuidv1();
      state.quotesList.unshift(
        new QuoteModel(
          quoteId,
          "u1",
          action.payload.text,
          action.payload.author,
          false
        )
      );
    },
    addQuotes(state, action) {
      const quoteId = uuidv1();
      action.payload.forEach((quote) => {
        state.quotesList.unshift(
          new QuoteModel(quoteId, "u1", quote.q, quote.a, false)
        );
      });
      console.log("New Quotes Added: " + action.payload.length);
    },
    addFavQuote(state, action) {
      state.favQuotesList.push(action.payload);
      console.log("Fav Quote List Added To: " + action.payload);
    },
    deleteFavQuote(state, action) {
      state.favQuotesList = state.favQuotesList.filter(
        (quoteId) => quoteId !== action.payload
      );
      console.log("Fav Quote List Deleted: " + action.payload);
    },
  },
});

export const quotesActions = quotesSlice.actions;

export default quotesSlice.reducer;
