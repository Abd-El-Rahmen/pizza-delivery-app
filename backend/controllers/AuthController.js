import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const RegisterUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const userAlreadyExist = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (userAlreadyExist)
      return res.json({
        success: false,
        message: "Username or email already exist please change the info",
      });

    const hashedPwd = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashedPwd,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User Saved",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.json({
        sucess: false,
        message: "User doesn't exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      secretKey,
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword, currentPassword } = req.body;

    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const checkPassword = await bcrypt.compare(
      currentPassword,
      findUser.password
    );

    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Password Incorrect",
      });
    }

    const hashedNewPwd = await bcrypt.hash(newPassword, 12);
    findUser.password = hashedNewPwd;

    await findUser.save();

    res.status(200).json({
      success: true,
      message: "Password Changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user",
    });
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user",
    });
  }
};

const LogoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out successfully",
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findOneAndDelete({ _id: id, role: "user" });
    
    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: "user" });

    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export {
  RegisterUser,
  LoginUser,
  AuthMiddleware,
  LogoutUser,
  changeUserInfo,
  getAllUsers,
  deleteUser,
};
