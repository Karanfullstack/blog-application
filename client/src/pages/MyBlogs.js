import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Oval } from 'react-loader-spinner'
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
      {userBlog && userBlog.length === 0 ? (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'10rem'}}>
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <h5>No Blog Post..</h5>
        </div>
      ) : (
        userBlog.map((item) => (
          <BlogCard
            key={item.id}
            isUser={true}
            id={item._id}
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
