import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const MyBlogs = () => {
  const [userBlog, setUserBlog] = useState([]);

  // getting all user blogs function
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userID");
      const {data} = await axios.get(`api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setUserBlog(data.blog.blogs);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <React.Fragment>
      <h2 style={{textAlign: "center", marginTop: 30}}>My Blogs</h2>
      {userBlog && userBlog.length === 0 ? (<h2 style={{textAlign:'center', marginTop:40}}>LOADING....</h2>): (
        userBlog.map((item) => (
          <BlogCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            username={item.user.username}
            time={item.createdAt}
          />
        ))
      )}
    </React.Fragment>
  );
};

export default MyBlogs;
