import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
// import {Oval} from "react-loader-spinner";
const MyBlogs = () => {
  const [userBlog, setUserBlog] = useState([]);
 const [userData, setUserData] = useState({});
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
  const userDetails = async()=>{
    try {
      const id = localStorage.getItem("userID");
      const {data} = await axios.get(`api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setUserData(data.blog.username)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userDetails()
    getUserBlogs();
  }, []);
  
  console.log(userData);
  return (
    <React.Fragment>
      <h2 style={{textAlign: "center", marginTop: 30}}>My Blogs</h2>
      {userBlog && userBlog.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10rem",
          }}
        >
          <h5>No Blog Post..</h5>
        </div>
      ) : (
        userBlog.map((item) => (
          <BlogCard
            key={item.id}
            isUser={true}
            id={item._id}
            title={item?.title}
            description={item?.description}
            image={item?.image}
            time={item?.createdAt}
            username={userData}
          />
        ))
      )}
    </React.Fragment>
  );
};

export default MyBlogs;
