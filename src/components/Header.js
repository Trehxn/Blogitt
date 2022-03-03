import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ padding: ".8rem 0" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", paddingLeft: "3rem" }}
          >
            <a href="/">Blogitt</a>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "right" }}
          >
            {user ? (
              <>
                <a href="/posts">
                  <Button sx={{ marginInline: "1rem" }} color="inherit">
                    Posts
                  </Button>
                </a>
                <Button
                  sx={{ marginInline: "1rem" }}
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
                <a href="/signup">
                  <Button sx={{ marginInline: "1rem" }} color="inherit">
                    Sign-Up
                  </Button>
                </a>
                <a href="/signin">
                  <Button sx={{ marginInline: "1rem" }} color="inherit">
                    Sign-In
                  </Button>
                </a>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
