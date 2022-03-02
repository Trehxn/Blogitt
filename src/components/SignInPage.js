import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="sign-in container--accent thin">
      <form
        onSubmit={handleSubmit((data) => {
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
        })}
      >
        <h1>Sign In</h1>
        <div className="inputs">
          <i className="fas fa-user"></i>
          <input
            {...register("email", { required: true })}
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputs">
          <i className="fas fa-unlock"></i>
          <input
            {...register("password", { required: true })}
            autoComplete="off"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="btn">Log In</button>
      </form>
    </div>
  );
};

export default SignInPage;
