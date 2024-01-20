import express from "express";
import UserController from "../../controllers/users/user.controller.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
