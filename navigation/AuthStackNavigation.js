import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import AuthScreen from "../screens/Auth/AuthScreen";
import SigninScreen from "../screens/Auth/SigninScreen";
import DrawerNavigation from "./DrawerNavigation";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "../firebase";
import { quotesActions } from "../store/quotesSlice";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [isLoggedinState, setIsLoggedinState] = useState(isLoggedin);
  const [quotesFetched, setQuotesFetched] = useState(false);

  const dispatch = useDispatch();
  const auth = getAuth(app);

  function fetchFavQuotes() {
    getDoc(doc(db, "users", currentUser.uid))
      .then((snapshot) => {
        snapshot.data().favQuotes.forEach((quote) => {
          dispatch(quotesActions.importToFavQuotes(quote));
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function fetchAllQuotes() {
    getDocs(collection(db, "quotes"))
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setAllQuotes((prevState) => [...prevState, doc.data()]);
          dispatch(
            quotesActions.importToAllQuotes({ ...doc.data(), id: doc.id })
          );
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    // dispatch(quotesActions.importToAllQuotes());
  }

  useEffect(() => {
    if (currentUser) {
      fetchFavQuotes();
      fetchAllQuotes();
      setQuotesFetched(true);
    }
  }, [currentUser]);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(authActions.setCurrentUser(currentUser));

      // dispatch(authActions.isLoggedin(true));
    } else {
      dispatch(authActions.setCurrentUser(""));
      // dispatch(authActions.isLoggedin(false));
    }
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {currentUser ? (
        <Stack.Screen name="Home Screen" component={DrawerNavigation} />
      ) : (
        <React.Fragment>
          <Stack.Screen name="Auth Screen" component={AuthScreen} />
          <Stack.Screen name="Signin Screen" component={SigninScreen} />
          <Stack.Screen name="Register Screen" component={RegisterScreen} />
        </React.Fragment>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
