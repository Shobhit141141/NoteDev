import { Request, Response } from "express";
import DSATopic from "../models/DSATopic";
import Question from "../models/Question";

const getUsergoogleId = (req: Request): string | null => {
    return req.user?.googleId || null;
};

export const createDSATopic = async (req: Request, res: Response) => {
    try {
        const { title, image, googleId } = req.body;
        const createdBy = getUsergoogleId(req);

        if (!createdBy) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!title) {
            return res
                .status(400)
                .json({ message: "Title is required for the DSA topic" });
        }

        const newTopic = new DSATopic({
            title,
            image,
            createdBy,
        });

        await newTopic.save();

        res.status(201).json({
            message: "DSA topic created successfully",
            topic: newTopic,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteDSATopic = async (req: Request, res: Response) => {
    const topicId = req.params.id;
    const usergoogleId = getUsergoogleId(req);

    if (!usergoogleId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const topicToDelete = await DSATopic.findById(topicId);
        if (!topicToDelete) {
            return res.status(404).json({ message: "DSA topic not found" });
        }

        if (topicToDelete.createdBy !== usergoogleId) {
            return res
                .status(403)
                .json({ message: "Forbidden: You cannot delete this topic" });
        }

        await Question.deleteMany({ topicId: topicId });

        await topicToDelete.deleteOne();

        res.status(200).json({ message: "DSA topic deleted successfully" });
    } catch (error) {
        console.error("Error deleting DSA topic:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllDSATopics = async (req: Request, res: Response) => {
    const usergoogleId = getUsergoogleId(req);

    if (!usergoogleId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const topics = await DSATopic.find({ createdBy: usergoogleId }).sort({
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
    const usergoogleId = getUsergoogleId(req);

    if (!usergoogleId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const topicId = req.params.topicId;
        const topic = await DSATopic.findOne({
            _id: topicId,
            createdBy: usergoogleId,
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

export const patchDSATopic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usergoogleId = getUsergoogleId(req);
    const { title, image } = req.body;

    if (!usergoogleId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const topicToUpdate = await DSATopic.findById(id);
        if (!topicToUpdate) {
            return res.status(404).json({ message: "DSA topic not found" });
        }

        if (topicToUpdate.createdBy !== usergoogleId) {
            return res
                .status(403)
                .json({ message: "Forbidden: You cannot update this topic" });
        }

        const updateObject = { title, image };
        // Update only the properties that exist in the request body
        topicToUpdate.set(updateObject);

        await topicToUpdate.save();

        res.status(200).json({
            message: "DSA topic updated successfully",
            topic: topicToUpdate,
        });
    } catch (error) {
        console.error("Error updating DSA topic:", error);
        res.status(500).json({ message: "Server error" });
    }
};
