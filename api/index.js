import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"

const app  = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to the mongoDB.")
      } catch (error) {
        throw error
      }
};

//middleware
app.use("/auth" , authRoute);

app.listen(8800, () => {
    connect()
    console.log("connected to backend!")
})
