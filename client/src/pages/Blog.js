import React from "react";
import BlogCard from "../components/BlogCard";
import {Box} from "@mui/material";
import axios from "axios";
import {useState, useEffect} from "react";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const {data} = await axios.get("/api/v1/blog/all-blogs");
      if (data?.sucess) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  console.log(blogs);
  return (
    <React.Fragment>
      {blogs &&
        blogs.map((item) => (
          <BlogCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            username={item.user.username}
            time={item.createdAt}
          />
        ))}
    </React.Fragment>
  );
};

export default Blog;
