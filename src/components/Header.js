import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <a href="/">Blogitt</a>
          </Typography>
          {user ? (
            <>
              <a href="/posts">
                <Button color="inherit">Posts</Button>
              </a>
              <Button
                onClick={() => {
                  const auth = getAuth();
                  signOut(auth)
                    .then(() => {
                      dispatch({ type: "SIGN_OUT" });
                      console.log("Signed out");
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.log({ code: errorCode, message: errorMessage });
                    });
                }}
                color="inherit"
              >
                Sign-Out
              </Button>
            </>
          ) : (
            <>
              <a href="/signin">
                <Button color="inherit">Sign-In</Button>
              </a>
              <a href="/signup">
                <Button color="inherit">Sign-Up</Button>
              </a>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
