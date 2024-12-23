import express from "express";
import {
  RegisterUser,
  LoginUser,
  AuthMiddleware,
  LogoutUser,
  changeUserInfo,
  getAllUsers,
  deleteUser,
} from "../controllers/AuthController.js";

const router = express.Router();
router.get("/allUsers", getAllUsers);
router.put("/update/:id", changeUserInfo);
router.post("/logout", LogoutUser);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.delete("/delete-user/:id", deleteUser);
router.get("/check-auth", AuthMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user,
  });
});

export default router;
