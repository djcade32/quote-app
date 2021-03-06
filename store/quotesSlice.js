import { createSlice } from "@reduxjs/toolkit";
import { FAVQUOTES } from "../data/favQuotes";
import QuoteModel from "../models/quoteModel";
import "react-native-get-random-values";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

const initialQuotesState = {
  quotesList: [],
  favQuotesList: [],
};
const quotesSlice = createSlice({
  name: "quotes",
  initialState: initialQuotesState,
  reducers: {
    async addQuote(state, action) {
      try {
        const docRef = await addDoc(collection(db, "quotes"), {
          text: action.payload.text,
          author: action.payload.author,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    importToAllQuotes(state, action) {
      state.quotesList.push(action.payload);
    },
    importToFavQuotes(state, action) {
      state.favQuotesList.push(action.payload);
    },
    addQuotes(state, action) {
      // action.payload.forEach((quote) => {
      //   state.quotesList.unshift(
      //     new QuoteModel(quoteId, "u1", quote.q, quote.a, false)
      //   );
      // });
      // console.log("New Quotes Added: " + action.payload.length);
    },
    addFavQuote(state, action) {
      console.log("Favorited: " + action.payload.quote.id);
      try {
        const data = {
          text: action.payload.quote.text,
          author: action.payload.quote.author,
          id: action.payload.quote.id,
        };
        updateDoc(doc(db, "users", action.payload.userId), {
          favQuotes: arrayUnion(data),
        }).then(() => {});
        state.favQuotesList.push(data);
      } catch (error) {
        console.log(error);
      }
    },
    deleteFavQuote(state, action) {
      try {
        updateDoc(doc(db, "users", action.payload.userId), {
          favQuotes: arrayRemove(action.payload.quote),
        }).then(() => {});
        state.favQuotesList = state.favQuotesList.filter(
          (quote) => quote.id !== action.payload.quote.id
        );
      } catch (error) {
        console.log(error);
      }
    },
    deleteQuote(state, action) {
      state.quotesList = state.quotesList.filter(
        (quote) => quote.id !== action.payload.id
      );
      console.log("Quote List Deleted: " + action.payload);
    },
    resetInitialState(state) {
      state.quotesList = [];
      state.favQuotesList = [];
    },
  },
});

export const quotesActions = quotesSlice.actions;

export default quotesSlice.reducer;
