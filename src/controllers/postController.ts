import { Request, Response } from "express";
import {
  createPostService,
  getPostsService,
  getPostByIdService,
  updatePostService,
  deletePostService,
} from "../services/postService";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, gameId, content, rating } = req.body;
    const post = await createPostService(userId, gameId, content, rating);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPostsService();
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getPostByIdService(Number(id));
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    res.json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;
    const post = await updatePostService(Number(id), content, rating);
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletePostService(Number(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
