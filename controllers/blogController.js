import mongoose from "mongoose";
import blogModel from "../models/blogModel";
import userModel from "../models/userModel";

const blogController = {
  // GET ALL BLOG POSTS
  async getAll(req, res) {
    try {
      const blogs = await blogModel.find({}).select("-__v");
      if (!blogs) {
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
      const {title, description, image, userID} = req.body;
      // validation
      if (!title || !description || !image || !userID) {
        return res.status(400).send({
          sucess: false,
          message: "Please Provide All Fields",
        });
      }
      const existningUser = await userModel.findById(userID);
      if (!existningUser) {
        return res.status(404).send({
          sucess: false,
          message: "Unable to find User",
        });
      }

      const newBlog = await blogModel.create({title, description, image});

      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({session});
      existningUser.blogs.push(newBlog);
      await existningUser.save({session});
      await session.commitTransaction();

      await newBlog.save();
      return res.status(201).send({
        sucess: true,
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
          sucess: false,
          message: "Blog not found with this ID",
        });
      }
      return res.status(200).send({
        sucess: true,
        message: "Blog Fetched Sucessfully",
        blog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        sucess: false,
        message: "Error While Getting Single Blog",
        error,
      });
    }
  },

  // DELETE A BLOG POST
  async delete(req, res) {
    try {
      const {id} = req.params;
      const blog = await blogModel.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).send({
          sucess: false,
          message: "No Blog Found With Given ID",
        });
      }
      return res.status(202).send({
        sucess: true,
        message: "A Blog Has been Deleted Sucessfully",
        blog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        sucess: false,
        message: "Error While Deleting a Blog",
        error,
      });
    }
  },
};

export default blogController;
