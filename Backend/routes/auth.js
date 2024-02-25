import express from "express";
import { login, sendOTP, verifyOtp } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/otp-verification", verifyOtp);
router.post("/sendOtp", sendOTP);

export default router;
