import express from "express"
import { signIn, signUp, logout } from "../controllers/authController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.post("/logout", logout)
// authRouter.post("/send-verify-otp", authMiddleware, sendVerifyOTP);
// authRouter.post("/verify-account", authMiddleware, verifyEmail);
// authRouter.post("/is-auth", authMiddleware, isAuthenticated);

export default authRouter;