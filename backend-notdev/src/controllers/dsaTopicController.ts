import { Request, Response } from "express";
import DSATopic from "../models/DSATopic";
import Question from "../models/Question";

const getUserUID = (req: Request): string | null => {
  return req.user?.uid || null;
};

export const createDSATopic = async (req: Request, res: Response) => {
  try {
    const { title, image, uid } = req.body;
    const createdBy = getUserUID(req);

    if (!createdBy) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required for the DSA topic" });
    }

    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required for the DSA topic" });
    }

    const newTopic = new DSATopic({
      title,
      image,
      createdBy,
    });

    await newTopic.save();

    res
      .status(201)
      .json({ message: "DSA topic created successfully", topic: newTopic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDSATopic = async (req: Request, res: Response) => {
  const topicId = req.params.id;
  const userUID = getUserUID(req);

  if (!userUID) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const topicToDelete = await DSATopic.findById(topicId);
    if (!topicToDelete) {
      return res.status(404).json({ message: "DSA topic not found" });
    }

    if (topicToDelete.createdBy !== userUID) {
      return res
        .status(403)
        .json({ message: "Forbidden: You cannot delete this topic" });
    }

    await topicToDelete.deleteOne();

    res.status(200).json({ message: "DSA topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting DSA topic:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllDSATopics = async (req: Request, res: Response) => {
  const userUID = getUserUID(req);

  if (!userUID) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const topics = await DSATopic.find({ createdBy: userUID }).sort({
      title: 1,
    });
    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error fetching DSA topics:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getSingleTopic = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const topic = await DSATopic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "DSA topic not found" });
    }
    res.status(200).json({ topic });
  } catch (error) {
    console.error("Error fetching DSA topic:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getQuestionsByTopicId = async (req: Request, res: Response) => {
  const userUID = getUserUID(req);

  if (!userUID) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const topicId = req.params.topicId;
    const topic = await DSATopic.findOne({
      _id: topicId,
      createdBy: userUID,
    }).populate("questions");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic.questions);
  } catch (error) {
    console.error("Error fetching questions for DSA topic:", error);
    res.status(500).json({ message: "Server error" });
  }
};
