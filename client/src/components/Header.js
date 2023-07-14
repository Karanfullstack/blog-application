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

const Header = () => {
  const [value, setValue] = useState(2);
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
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
          <Box display="flex" marginLeft="auto">
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
            <Button
              sx={{margin: 1, color: "white"}}
              LinkComponent={Link}
              to="/logout"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
