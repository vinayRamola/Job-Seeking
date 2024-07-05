import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRoutes.js'
import applicationRouter from './routes/applicationRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express()


app.use(
    cors({
        origin: ["https://job-seeking-5xut.vercel.app"],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        })
);

// app.use(
//   cors({
//       origin: [`https://job-seeking-s5o4-frontend.vercel.app`],
//       method: ["GET", "POST", "DELETE", "PUT"],
//       credentials: true,
//       })
// );
// app.get("/",(req,res) => {
//   res.json("Hello")
// })

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

dbConnection();
  
app.use(errorMiddleware);

export default app;
