import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toster from "react-hot-toast";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateBlog() {
  const id = localStorage.getItem("userID");
  const [inputs, setIntpus] = useState({});
  const navigate = useNavigate();
  // userData
  const data = (event) => {
    event.preventDefault();
    setIntpus({...inputs, [event.target.name]: event.target.value});
  };
  console.log(inputs);

  // Form function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post(`/api/v1/blog/create-blog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toster.success('Blog has been created')
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Reset Button

  const reset = function (event) {
    event.preventDefault();
    setIntpus({title: "", description: "", image: ""});
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Create A Blog
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 4}}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={inputs.title}
              id="text"
              label="Title"
              name="title"
              autoFocus
              onChange={data}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Descriiption"
              name="description"
              autoFocus
              value={inputs.description}
              onChange={data}
              inputProps={{
                style: {
                  height: "60px",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image URL"
              type="text"
              id="text"
              onChange={data}
              value={inputs.image}
            />
            <Button variant="outlined" onClick={reset}>
              RESET
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2, padding: 2, textAlign: "center"}}
            >
              POST
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
