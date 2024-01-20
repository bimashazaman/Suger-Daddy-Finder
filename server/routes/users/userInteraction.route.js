// userInteraction.route.js

import express from "express";
import UserInteractionController from "../../controllers/users/userInteraction.controller.js"; // Adjust the path based on your structure
import verifyToken from "../../middleware/auth.js";

const router = express.Router();

// Route to handle adding a new interaction
router.post("/", verifyToken, UserInteractionController.addUserInteraction);

// Route to get all interactions for a specific user
router.get(
  "/:userId",
  verifyToken,
  UserInteractionController.getUserInteractions
);

// Route to remove a specific interaction
router.delete(
  "/remove",
  verifyToken,
  UserInteractionController.removeUserInteraction
);

// Route to update a specific interaction
router.patch(
  "/update",
  verifyToken,
  UserInteractionController.updateUserInteraction
);

// Route to get count of specific interactions for a user
router.get(
  "/count/:userId/:interactionType",
  verifyToken,
  UserInteractionController.countUserInteractions
);

// Route to get mutual interactions
router.get(
  "/mutual/:userId/:interactionType",
  verifyToken,
  UserInteractionController.getMutualInteractions
);

export default router;
