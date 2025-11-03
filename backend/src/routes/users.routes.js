import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/refresh-token").post(refreshAccessToken);

//secured routes
router.route("/auth-test").post(authenticateToken, (req, res) => {
  return res
    .status(200)
    .json({ message: "user is authenticated", payload: req.user });
});
router.route("/logout").delete(authenticateToken, logoutUser);

router.route("/get-me").get(authenticateToken, getMe);

export default router;
