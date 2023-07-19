import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import toaster from "react-hot-toast";
const BlogDetails = () => {
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

  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setIntpus] = useState({});
  const navigate = useNavigate();

  // get blog details
  const getBlogDetails = async () => {
    try {
      const {data} = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data.success) {
        setBlog(data?.blog);
        setIntpus({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetails();
  }, [id]);

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
      const {data} = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      });
      console.log(data);
      if (data?.success) {
        toaster.success("Blog has been UPDATED");
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

  console.log(blog);
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
            Update Blog
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 4}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              placeholder="Title"
              name="title"
              autoFocus
              value={inputs.title}
              onChange={data}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              value={inputs.description}
              placeholder="Descriiption"
              name="description"
              autoFocus
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
              value={inputs.image}
              placeholder="Image URL"
              type="text"
              onChange={data}
              id="text"
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
              UPDATE
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BlogDetails;
