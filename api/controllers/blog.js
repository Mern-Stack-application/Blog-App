import Blog from "../models/Blog.js";
import { createError } from "../utils/error.js";


// create Blog
export const createBlog = async (req,res,next) =>{
    const newBlog = new Blog(req.body)   
 try{
   const savedBlog = await newBlog.save()
   res.status(200).json(savedBlog)
 }catch(err){
    next(err);
 }
}

// update   blog
export const updateBlog = async (req,res,next) =>{
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new:true})
        res.status(200).json(updatedBlog)
      }catch(err){
         next(err)
      }
}


// delete blog
export const deleteBlog = async (req,res,next) =>{
    try{
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json("Blog has been deleted")
    }catch(err){
    next(err)
 }
}

// get blog
export const getBlog = async (req,res,next) =>{
    try{
        const blog = await Blog.findById(req.params.id)
        res.status(200).json(blog)
    }catch(err){
    next(err);
 }
}

// get all blogs
export const getBlogs = async (req,res,next) =>{
    try{
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    }catch(err){
    next(err);
 }
}

