import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAGliy2hNBe1_ePZhQVvog5osVuSNrq1L4",
  authDomain: "null-innovation-bb909.firebaseapp.com",
  projectId: "null-innovation-bb909",
  storageBucket: "null-innovation-bb909.appspot.com",
  messagingSenderId: "268341681787",
  appId: "1:268341681787:web:dace7cdaaa6c6deecfccde",
});

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="sign-in container--accent thin">
      <form
        onSubmit={handleSubmit((data) => {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
              navigate("/signin");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log({ code: errorCode, message: errorMessage });
            });
        })}
      >
        <h1>Sign Up</h1>
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

export default SignUpPage;
