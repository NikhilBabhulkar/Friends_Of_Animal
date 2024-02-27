import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendVerificationEmail } from "../middleware/Email.js";
import { generateOTP } from "../middleware/OneTimePassword.js";

const otpStorage=new Map();

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      role
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      role,
      viewedProfile: 0,
      impressions: 0,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id, role: user.role }, "invuaegnouaerbvavnguhngiuheraghwoeu");
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// sending Verification mail
export const sendOTP = (req, res) => {
  const { email, name } = req.body;
  const otp = generateOTP();
  otpStorage.set("otp",otp)
  //console.log(otpStorage.get("otp"));
 // console.log(req.session);
  sendVerificationEmail(name, email, otp);
  res.status(200).json({message:`otp send successfull`});
}

// verify the otp
export const verifyOtp = (req,res) => {
  const otptoCheck = req.body.otp;
  const otpwehave = otpStorage.get("otp");
 // console.log(otpwehave);
  //console.log(req.session);
  if (otptoCheck == otpwehave) {
    otpStorage.delete("otp");
    res.status(200).json({ message: "User Verified" });
  }
  else {
    
    res.status(400).json({ message: "Invalid Otp" });
  }
}



