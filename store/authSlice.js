import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import "react-native-get-random-values";
import app, { db } from "../firebase";

const auth = getAuth(app);
const initialUserState = { currentUser: null, isLoggedin: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    createNewUser(state, action) {
      const name = action.payload.name;
      const email = action.payload.email;
      const password = action.payload.password;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          user = userCredentials.user;
          user.displayName = name;
          console.log("New user registered: " + user.email);
          setDoc(doc(db, "users", user.uid), {
            email: email,
            name: name,
            favQuotes: [],
          });
        })
        .catch((error) => console.log("Could not register new user: " + error));
    },

    login(state, action) {
      const email = action.payload.data.email;
      const password = action.payload.data.password;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("User logged in: " + user.email);
        })
        .catch((error) => {
          action.payload.triggerReset({ email: "", password: "" });
          action.payload.triggerError();
          console.log("Could not login user: " + error);
        });
    },

    signOut(state, action) {
      signOut(auth)
        .then(() => {
          console.log("Signed out");
        })
        .catch((error) => {
          return console.log("Could not sign out");
        });
      state.isLoggedin = false;
    },

    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },

    isLoggedin(state, action) {
      state.isLoggedin = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
