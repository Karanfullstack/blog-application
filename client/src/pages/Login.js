import React, {useState} from "react";
import {Box, Typography, TextField, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const userData = (event) => {
    event.preventDefault();
    setUser({...user, [event.target.name]: event.target.value});
  };

  // handel Submit
  const handel = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/api/v1/user/login", {
        email: user.email,
        password: user.password,
      });
      if (data.sucess) {
        localStorage.setItem("userID", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Sucessfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    setUser({email: "", password: ""});
  };

  return (
    <React.Fragment>
      <form onSubmit={handel}>
        <Box
          maxWidth={500}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          margin={"auto"}
          marginTop={10}
          boxShadow={"10px 10px 20px #ccc"}
          padding={9}
          borderRadius={5}
        >
          <Typography variant="h4" marginBottom={1}>
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            placeholder="Email"
            name="email"
            type={"email"}
            onChange={userData}
            value={user.email}
          />

          <TextField
            fullWidth
            margin="normal"
            placeholder="Password"
            name="password"
            type={"password"}
            onChange={userData}
            value={user.password}
          />
          <Button
            type="submit"
            variant="contained"
            style={{background: "orangered"}}
            sx={{borderRadius: 3, marginBottom: 2, marginTop: 2}}
          >
            Submit
          </Button>
          <Button onClick={() => navigate("/register")}>
            Not a User ? Please Registred
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Login;
