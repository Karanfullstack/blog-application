import express from "express";
import userController from "../controllers/userController";

// router object
const router = express.Router();

// GET ALL USER || GET
router.get("/all-users", userController.getAllUsers);

// CREATE USER || POST
router.post("/register", userController.registerUser);

// LOGIN USER || POST
router.post("/login", userController.loginUser);

export default router;
