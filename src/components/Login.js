import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import AuthForm from "./AuthForm";
import isSignedIn from "../hoc/isSignedIn";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch({ type: "SIGN_IN_START" });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        dispatch({
          type: "SIGN_IN_SUCCESS",
          payload: user,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ code: errorCode, message: errorMessage });
        dispatch({
          type: "SIGN_IN_ERROR",
          payload: errorMessage,
        });
      });
  };
  return <AuthForm heading="Login" onSubmit={onSubmit} />;
};

export default isSignedIn(LogIn);
