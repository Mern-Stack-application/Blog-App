import express from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blog.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/" , verifyAdmin, createBlog);

//UPDATE
router.put("/:id" , verifyAdmin ,  updateBlog);

//DELETE

router.delete("/:id" , verifyAdmin, deleteBlog);

//GET

router.get("/:id" , getBlog);

//GET ALL

router.get("/" , getBlogs);

export default router