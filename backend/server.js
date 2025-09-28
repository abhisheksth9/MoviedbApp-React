import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(bodyParser.json())
app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true, // allow cookies
}));
app.use(express.json());

app.get('/',(req,res) => res.send("API Working fine"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));