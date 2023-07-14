import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is require"],
    },

    description: {
      type: String,
      required: [true, "description is require"],
    },

    image: {
      type: String,
      required: [true, "image is require"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
  },

  {timestamps: true}
);

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
