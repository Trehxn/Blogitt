import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(5)
      .matches(/^[a-z0-9]+$/i, "Must contain alphanumeric characters")
      .required(),
  })
  .required();

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
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
          Login
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
            {...register("email")}
            autoComplete="off"
            error={errors.email ? true : false}
            helperText={errors.email?.message}
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
            {...register("password")}
            autoComplete="off"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
        </Box>
        <Button type="submit" variant="contained" className="btn">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
