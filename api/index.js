import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import blogRoute from "./routes/blog.js"
import userRoute from "./routes/users.js"
import cookieParser from "cookie-parser";

const app  = express()
app.use(cors())
dotenv.config()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to the mongoDB.")
      } catch (error) {
        throw error
      }
};

//middleware

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth" , authRoute);
app.use("/api/blogs" , blogRoute);
app.use("/api/users" , userRoute);


app.use((err,req,res,next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something Went Wrong!"
  return res.status(errorStatus).json(errorMessage).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  });
});

app.listen(8800, () => {
    connect()
    console.log("connected to backend!")
})
