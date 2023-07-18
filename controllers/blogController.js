import mongoose from "mongoose";
import blogModel from "../models/blogModel";
import userModel from "../models/userModel";

const blogController = {
  // GET ALL BLOG POSTS
  async getAll(req, res) {
    try {
      const blogs = await blogModel.find({}).populate("user");
      if (!blogs || blogs.length === 0) {
        return res.status(200).send({
          sucess: false,
          message: "No Blogs Records",
        });
      }
      return res.status(200).send({
        sucess: true,
        Length: blogs.length,
        message: "All Blogs Lists",
        blogs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        sucess: false,
        message: "Error while getting all blogs",
        error,
      });
    }
  },

  // CREATE A NEW BLOG POST

  async create(req, res) {
    try {
      const {title, description, image, user} = req.body;

      // validation
      if (!title || !description || !image || !user) {
        return res.status(400).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }

      const existingUser = await userModel.findById(user);
      if (!existingUser) {
        return res.status(404).send({
          success: false,
          message: "No User Found",
        });
      }

      const newBlog = await blogModel.create({title, description, image, user});

      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({session});
      existingUser.blogs.push(newBlog);
      await existingUser.save({session});
      await session.commitTransaction();
      await newBlog.save();

      return res.status(201).send({
        success: true,
        message: "Blog Created",
        newBlog,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        sucess: false,
        message: "Error While Creating A Blog",
        error,
      });
    }
  },

  // UPDATE A BLOG POST
  async update(req, res) {
    try {
      const {title, description, image} = req.body;
      const {id} = req.params;

      // validation
      if (!title || !description || !image) {
        return res.status(400).send({
          sucess: false,
          message: "Please Provide All Fields",
        });
      }
      const updateBlog = await blogModel.findByIdAndUpdate(
        {_id: id},
        {title, description, image},
        {new: true}
      );
      return res.status(200).send({
        sucess: true,
        message: "Blog has updated sucessfully",
        updateBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        sucess: false,
        message: "Errro while updating a blog",
        error,
      });
    }
  },

  // GET SINGLE BLOG POST
  async getSingle(req, res) {
    try {
      const {id} = req.params;
      const blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(404).send({
          success: false,
          message: "Blog not found with this ID",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Blog Fetched Sucessfully",
        blog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Getting Single Blog",
        error,
      });
    }
  },

  // DELETE A BLOG POST
  async delete(req, res) {
    try {
      const blog = await blogModel
        .findByIdAndDelete(req.params.id)
        .populate("user");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
      return res.status(202).send({
        success: true,
        message: "A Blog Has been Deleted Sucessfully",
        blog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Deleting a Blog",
        error: error,
      });
    }
  },

  // getting user blogs
  async getUserBlogs(req, res) {
    try {
      const blog = await userModel.findById(req.params.id).populate("blogs");
      if (!blog) {
        return res.status(404).send({
          sucess: false,
          message: "No Blogs Found for single user",
        });
      }
      return res.status(200).send({
        success: true,
        message: "User Blogs Found",
        length: blog.blogs.length,
        blog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error in Get User Blogs",
        error,
      });
    }
  },
};

export default blogController;
