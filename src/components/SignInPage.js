import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(errors);

  return (
    <div className="thin">
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
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, color: "#144372" }}
        >
          Sign In
        </Typography>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
            margin: "1rem",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...register("email", { required: true, minLength: 10 })}
            autoComplete="off"
          />
        </Box>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
            marginBottom: "1rem",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            {...register("password", { required: true })}
            autoComplete="off"
          />
        </Box>
        <Button type="submit" variant="contained" className="btn">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
