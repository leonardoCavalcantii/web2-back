import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
