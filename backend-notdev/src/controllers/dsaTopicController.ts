import { Request, Response } from "express";
import DSATopic from "../models/DSATopic";

export const createDSATopic = async (req: Request, res: Response) => {
  try {
    const { title: title , image:image} = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Name is required for the DSA topic" });
    }

    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required for the DSA topic" });
    }

    const newTopic = new DSATopic({
      title: title,
      image:image,
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

  try {
    const topicToDelete = await DSATopic.findById(topicId);
    if (!topicToDelete) {
      return res.status(404).json({ message: "DSA topic not found" });
    }

    await topicToDelete.deleteOne();

    res.status(200).json({ message: "DSA topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting DSA topic:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllDSATopics = async (req: Request, res: Response) => {
  try {
    const topics = await DSATopic.find().sort({ title: 1 }); // Sort by title in ascending order
    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error fetching DSA topics:", error);
    res.status(500).json({ message: "Server error" });
  }
};