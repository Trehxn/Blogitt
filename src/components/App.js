import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Posts from "./Posts";
import Author from "./Author";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SIGN_IN_START" });
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      } else {
      }
    });
  }, []);

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
