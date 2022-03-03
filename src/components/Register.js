import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
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

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAGliy2hNBe1_ePZhQVvog5osVuSNrq1L4",
  authDomain: "null-innovation-bb909.firebaseapp.com",
  projectId: "null-innovation-bb909",
  storageBucket: "null-innovation-bb909.appspot.com",
  messagingSenderId: "268341681787",
  appId: "1:268341681787:web:dace7cdaaa6c6deecfccde",
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
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
              navigate("/login");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log({ code: errorCode, message: errorMessage });
            });
        })}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, color: "#144372" }}
        >
          Register
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
            {...register("email", { required: true })}
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
            {...register("password", { required: true })}
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

export default Register;
