import { Request, Response } from "express";
import User from "../models/User.model";
import Otp from "../models/Otp.model";
import { generateOtp } from "../utils/otp";
import { generateToken } from "../utils/jwt";
import { sendOtpEmail } from "../utils/sendEmail";

//requestOtp----------------------------->>>>

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.findOneAndDelete({ email });
  await Otp.create({ email, otp, expiresAt });

  try {
  await sendOtpEmail(email, otp);
} catch (error) {
  console.error("❌ Email send failed:", error);
  return res.status(500).json({
    message: "Failed to send OTP email"
  });
}

res.status(200).json({ message: "OTP sent successfully" });

};

//verifyOtp------------------------->>>>

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp, name } = req.body;

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      name,
      authProvider: "local",
      isVerified: true
    });
  }

  await Otp.deleteOne({ _id: otpRecord._id });

  const token = generateToken(user._id.toString());

  res
  .cookie("token", token, {
    httpOnly: true,
    sameSite: "none",   
    secure: true,      
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  .status(200)
  .json({
    message: "Authentication successful",
    user: {
      id: user._id,
      email: user.email
    }
  });

};

//LogOut------------->>>>
export const logout = async (_req: Request, res: Response) => {
  res
  .clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  })
  .status(200)
  .json({ message: "Logged out successfully" });

};
