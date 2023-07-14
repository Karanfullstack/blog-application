import express from "express";
import blogController from "../controllers/blogController";

// ROUTER
const router = express.Router();

// Routes
router.get("/all-blogs", blogController.getAll);
router.post("/create-blog", blogController.create);
router.put("/update-blog/:id", blogController.update);
router.get("/get-blog/:id", blogController.getSingle);
router.delete("/delete-blog/:id", blogController.delete);
router.get("/user-blog/:id", blogController.getUserBlogs);

export default router;
