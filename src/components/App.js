import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";

import Header from "./Header";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";
import Posts from "./Posts";
import Author from "./Author";

initializeApp({
  apiKey: "AIzaSyAGliy2hNBe1_ePZhQVvog5osVuSNrq1L4",
  authDomain: "null-innovation-bb909.firebaseapp.com",
  projectId: "null-innovation-bb909",
  storageBucket: "null-innovation-bb909.appspot.com",
  messagingSenderId: "268341681787",
  appId: "1:268341681787:web:dace7cdaaa6c6deecfccde",
});

const App = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: "SIGN_IN_START" });
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      } else {
        dispatch({ type: "NO_USER_FOUND" });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      {userAuth.loading && !userAuth.isFetched ? (
        <div style={{ color: "#000", textAlign: "left" }}>Loading...</div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/author/:id" element={<Author />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
