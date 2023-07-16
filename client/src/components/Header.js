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
import {useSelector} from "react-redux";

const Header = () => {
  const [value, setValue] = useState();
  const isLogin = useSelector((state) => state.isLogin);
  const style = {background: "#000", borderTop: "4px solid orangered"};

  return (
    <React.Fragment>
      <AppBar position="sticky" style={style}>
        <Toolbar>
          <Typography variant="h4">CRUX</Typography>
          {isLogin && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLogin && (
              <>
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
              </>
            )}

            {isLogin && (
              <Button
                sx={{margin: 1, color: "white"}}
                LinkComponent={Link}
                to="/logout"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
