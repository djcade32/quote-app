import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "react-native-get-random-values";
import app from "../firebase";
// import auth from "../firebase";
const auth = getAuth(app);
const user = auth.currentUser;

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    createNewUser(state, action) {
      const name = action.payload.name;
      const email = action.payload.email;
      const password = action.payload.password;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          user.displayName = name;
          console.log("New user registered: " + user.email);
          console.log(user.displayName);
        })
        .catch((error) => console.log("Could not register new user: " + error));
    },
    login(state, action) {
      const email = action.payload.email;
      const password = action.payload.password;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("User logged in: " + user.email);
        })
        .catch((error) => console.log("Could not login user: " + error));
    },
    signOut(state, action) {
      signOut(auth)
        .then(() => {
          console.log("Signed out");
        })
        .catch((error) => console.log("Could not sign out"));
    },
    isLoggedIn(state, action) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          unsubscribe;
          return true;
        } else {
          unsubscribe;
          return false;
        }
      });
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
