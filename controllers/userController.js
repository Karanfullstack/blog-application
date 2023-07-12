import userModel from "../models/userModel";
import bcrypt from "bcrypt";

const userController = {
  // @REGISTER CONTROLLER
  async registerUser(req, res) {
    try {
      const {username, email, password} = req.body;
      // validation
      if (!username || !email || !password) {
        return res.status(400).send({
          sucess: false,
          message: "Please fill all fields",
        });
      }
      // existing user
      const existingUser = await userModel.findOne({email});
      if (existingUser) {
        return res.status(401).send({
          sucess: false,
          message: "User is already exists",
        });
      }
      // hash password
      const hashPassword = await bcrypt.hash(password, 10);
      // save user
      const user = new userModel({username, email, password: hashPassword});
      await user.save();
      return res.status(201).send({
        sucess: true,
        message: "New user is created",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register Callback",
        sucess: false,
        error,
      });
    }
  },

  // @GET-ALL-USERS CONTROLLER
  async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      return res.status(200).send({
        sucess: true,
        userLength: users.length,
        message: "all user data",
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        sucess: false,
        message: "Error In All User Controller",
        error,
      });
    }
  },

  // @LOGIN USER CONTROLLER
  async loginUser(req, res) {
    try {
      const {email, password} = req.body;
      // validation
      if (!email || !password) {
        return res.status(401).send({
          sucess: false,
          message: "Please fill all fields ",
        });
      }
      const user = await userModel.findOne({email});
      // if user email exists
      if (!user) {
        return res.status(200).send({
          sucess: false,
          message: "User is not registerd",
        });
      }
      // if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({
          sucess: false,
          message: "Password do not match",
        });
      }
      return res.status(200).send({
        sucess: true,
        message: "Login Sucessfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        sucess: false,
        message: "Error in Login Controller",
        error,
      });
    }
  },
};

export default userController;
