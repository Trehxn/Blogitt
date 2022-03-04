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
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ padding: ".4rem 0" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", paddingLeft: "3rem" }}
          >
            <Link to="/">Blogitt</Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "right" }}
          >
            {user ? (
              <>
                <Link to="/posts">
                  <Button sx={{ marginInline: "1rem" }} color="inherit">
                    Posts
                  </Button>
                </Link>
                <Button
                  sx={{ marginInline: "1rem" }}
                  onClick={() => {
                    const auth = getAuth();
                    signOut(auth)
                      .then(() => {
                        dispatch({ type: "SIGN_OUT" });
                        console.log("Signed out");
                        navigate("/");
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log({ code: errorCode, message: errorMessage });
                      });
                  }}
                  color="inherit"
                >
                  Signout
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button sx={{ marginInline: "1rem" }} color="inherit">
                    Register
                  </Button>
                </Link>
                <Link to="/login">
                  <Button sx={{ marginInline: "1rem" }} color="inherit">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
