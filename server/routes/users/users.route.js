import express from "express";
import UserController from "../../controllers/users/user.controller.js";
import verifyToken from "../../middleware/auth.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.put(
  "/update/:id",
  upload.single("profilePicture"),
  verifyToken,
  UserController.updateUser
);

export default router;
