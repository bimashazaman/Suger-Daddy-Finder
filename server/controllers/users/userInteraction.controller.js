// userInteraction.controller.js

import UserInteraction from "../../models/userInteraction.model.js";

const addUserInteraction = async (req, res) => {
  try {
    const { userId, interactedUserId, interactionType } = req.body;

    // Check if interaction already exists
    const existingInteraction = await UserInteraction.findOne({
      userId,
      interactedUserId,
      interactionType,
    });

    if (existingInteraction) {
      return res.status(400).json({ message: "Interaction already exists." });
    }

    const newInteraction = new UserInteraction({
      userId,
      interactedUserId,
      interactionType,
    });
    const savedInteraction = await newInteraction.save();

    res.status(200).json(savedInteraction);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getUserInteractions = async (req, res) => {
  try {
    const { userId } = req.params;
    const interactions = await UserInteraction.find({ userId });
    res.status(200).json(interactions);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const removeUserInteraction = async (req, res) => {
  try {
    const { userId, interactedUserId, interactionType } = req.body;
    const interaction = await UserInteraction.findOneAndDelete({
      userId,
      interactedUserId,
      interactionType,
    });

    if (!interaction) {
      return res.status(404).json({ message: "Interaction not found." });
    }

    res.status(200).json({ message: "Interaction removed successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const updateUserInteraction = async (req, res) => {
  try {
    const { userId, interactedUserId, oldInteractionType, newInteractionType } =
      req.body;

    const interaction = await UserInteraction.findOneAndUpdate(
      { userId, interactedUserId, interactionType: oldInteractionType },
      { interactionType: newInteractionType },
      { new: true }
    );

    if (!interaction) {
      return res.status(404).json({ message: "Interaction not found." });
    }

    res.status(200).json(interaction);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const countUserInteractions = async (req, res) => {
  try {
    const { userId, interactionType } = req.params;
    const count = await UserInteraction.countDocuments({
      userId,
      interactionType,
    });

    res.status(200).json({ interactionType, count });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getMutualInteractions = async (req, res) => {
  try {
    const { userId, interactionType } = req.params;
    const userInteractions = await UserInteraction.find({
      userId,
      interactionType,
    });
    const mutualInteractions = await UserInteraction.find({
      userId: { $in: userInteractions.map((ui) => ui.interactedUserId) },
      interactedUserId: userId,
      interactionType,
    });

    res.status(200).json(mutualInteractions);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export default {
  addUserInteraction,
  getUserInteractions,
  removeUserInteraction,
  updateUserInteraction,
  countUserInteractions,
  getMutualInteractions,
};
