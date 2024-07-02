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
dotenv.config({ path: "./config/.env" });

// app.use(
//     cors({
//         origin: [process.env.FRONTEND_URL],
//         method: ["GET", "POST", "DELETE", "PUT"],
//         credentials: true,
//         })
// );

app.use(
  cors({
      origin: ["job-seeking-r7l42i3tf-vinayramolas-projects.vercel.app"],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
      })
);
app.get("/",(req,res) => {
  res.json("Hello");
})

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
