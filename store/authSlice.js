import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "react-native-get-random-values";
import app from "../firebase";

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
          const user = userCredentials.user;
          user.displayName = name;
          console.log("New user registered: " + user.email);
        })
        .catch((error) => console.log("Could not register new user: " + error));
      signOut(auth)
        .then(() => {
          console.log("Signed out newly created user");
        })
        .catch((error) => {
          console.log("Could not sign out newly created user");
        });
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

    // isLoggedin(state, action) {
    //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //     if (currentUser) {
    //       console.log("There is user");
    //       return true;
    //     } else {
    //       console.log("There is no user");
    //       return false;
    //     }
    //   });
    //   unsubscribe;
    // },

    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },

    isLoggedin(state, action) {
      console.log("Login set to: " + action.payload);
      state.isLoggedin = action.payload;
      // const unsubscribe = onAuthStateChanged(auth, () => {
      //   console.log("isLoggedin: " + auth.currentUser);
      //   if (auth.currentUser) {
      //     unsubscribe;
      //     return true;
      //   } else {
      //     unsubscribe;
      //     return false;
      //   }
      // });
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
