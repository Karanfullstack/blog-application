import React, {useState} from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../redux/store";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState();
  const isLogin = useSelector((state) => state.isLogin);
  const style = {
    background: "#000",

    borderBottom: "2px solid orangered",
  };

  const handelLogOut = () => {
    try {
      dispatch(authActions.logout());
      alert("Log out sucessfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <AppBar position="sticky" style={style}>
        <Toolbar>
          <Typography variant="h6">CRUX</Typography>
          {isLogin && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            <div>
              {!isLogin && (
                <div>
                  <Button
                    sx={{margin: 1, color: "white"}}
                    LinkComponent={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{margin: 1, color: "white"}}
                    LinkComponent={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </div>
              )}

              {isLogin && (
                <Button
                  onClick={handelLogOut}
                  sx={{margin: 1, color: "white"}}
                  LinkComponent={Link}
                >
                  Logout
                </Button>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
