import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import AuthForm from "./AuthForm";
import isSignedIn from "../hoc/isSignedIn";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch({ type: "SIGN_IN_START" });
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch({
          type: "SIGN_IN_SUCCESS",
          payload: user,
        });
        navigate("/");
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

  return <AuthForm heading="Register" onSubmit={onSubmit} />;
};

export default isSignedIn(Register);
