import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./quotesSlice";
import authSlice from "./authSlice";
export const store = configureStore({
  reducer: {
    quotes: quotesSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
