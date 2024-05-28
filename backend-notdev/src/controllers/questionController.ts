import { Request, Response } from "express";
import DSATopic from "../models/DSATopic";
import Question from "../models/Question";
import IDSATopic from "../interfaces/dsatopic.interface";
import IQuestion from "../interfaces/question.interface";
import mongoose from "mongoose";

export const createQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      difficulty,
      topicId,
      tag,
      links,
      images,
      code,
      text,
      solutionLink,
      youtubeLink,
    } = req.body;

    const newQuestion = new Question({
      title,
      description,
      difficulty,
      topicId,
      tag,
      links,
      images,
      code,
      text,
      solutionLink,
      youtubeLink,
    });

    const dsatopic = await DSATopic.findById(topicId);

    if (!dsatopic) {
      res.status(404).json({ message: "DSATopic not found" });
      return;
    }
    const savedQuestion = await newQuestion.save();

    dsatopic.totalQuestions += 1;

    if (
      !savedQuestion._id ||
      !(savedQuestion._id instanceof mongoose.Types.ObjectId)
    ) {
      throw new Error("Invalid _id type");
    }

    dsatopic.questions.push(savedQuestion._id);

    if (difficulty === "easy") {
      dsatopic.easy.push(savedQuestion._id);
    } else if (difficulty === "medium") {
      dsatopic.medium.push(savedQuestion._id);
    } else if (difficulty === "hard") {
      dsatopic.hard.push(savedQuestion._id);
    }

    await dsatopic.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  const questionId = req.params.id;

  try {
    const questionToDelete = await Question.findById(questionId);
    if (!questionToDelete) {
      return res.status(404).json({ message: "Question not found" });
    }

    const topic = await DSATopic.findById(questionToDelete.topicId);
    if (!topic) {
      return res.status(404).json({ message: "DSATopic not found" });
    }
    topic.questions = topic.questions.filter(
      (id) => id.toString() !== questionId
    );

    switch (questionToDelete.difficulty) {
      case "easy":
        topic.easy = topic.easy.filter((id) => id.toString() !== questionId);
        break;
      case "medium":
        topic.medium = topic.medium.filter(
          (id) => id.toString() !== questionId
        );
        break;
      case "hard":
        topic.hard = topic.hard.filter((id) => id.toString() !== questionId);
        break;
    }

    topic.totalQuestions -= 1;

    await topic.save();

    await Question.deleteOne({ _id: questionId });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().populate("topicId", "title");

    const questionsWithTopicName = await Promise.all(
      questions.map(async (question) => {
        const topic = await DSATopic.findById(question.topicId);
        if (!topic) {
          throw new Error("DSATopic not found");
        }
        return {
          ...question.toObject(),
          topicId: topic.title,
        };
      })
    );

    res.status(200).json(questionsWithTopicName);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTopicName = async (req: Request, res: Response) => {
  const topicId = req.params.id;

  try {
    const topic = await DSATopic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "DSATopic not found" });
    }

    res.status(200).json({ topicName: topic.title });
  } catch (error) {
    console.error("Error fetching topic name:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  const questionId: string = req.params.id;

  try {
    let questionToUpdate = await Question.findById(questionId);
    if (!questionToUpdate) {
      return res.status(404).json({ message: "Question not found" });
    }

    const {
      title,
      description,
      difficulty,
      topicId,
      tag,
      links,
      images,
      code,
      text,
      solutionLink,
      youtubeLink,
    } = req.body;

    if (title) questionToUpdate.title = title;
    if (description) questionToUpdate.description = description;
    if (difficulty) questionToUpdate.difficulty = difficulty;
    if (topicId) questionToUpdate.topicId = topicId;
    if (tag) questionToUpdate.tag = tag;
    if (links) questionToUpdate.links = links;
    if (images) questionToUpdate.images = images;
    if (code) questionToUpdate.code = code;
    if (text) questionToUpdate.text = text;
    if (solutionLink) questionToUpdate.solutionLink = solutionLink;
    if (youtubeLink) questionToUpdate.youtubeLink = youtubeLink;

    if (difficulty && difficulty !== questionToUpdate.difficulty) {
      const topic = await DSATopic.findById(questionToUpdate.topicId);
      if (!topic) {
        return res.status(404).json({ message: "DSATopic not found" });
      }

      switch (questionToUpdate.difficulty) {
        case "easy":
          topic.easy = topic.easy.filter((id) => id.toString() !== questionId);
          break;
        case "medium":
          topic.medium = topic.medium.filter(
            (id) => id.toString() !== questionId
          );
          break;
        case "hard":
          topic.hard = topic.hard.filter((id) => id.toString() !== questionId);
          break;
      }

      const questionObjectId = new mongoose.Types.ObjectId(questionId);

      switch (difficulty) {
        case "easy":
          topic.easy.push(questionObjectId);
          break;
        case "medium":
          topic.medium.push(questionObjectId);
          break;
        case "hard":
          topic.hard.push(questionObjectId);
          break;
      }

      await topic.save();
    }

    questionToUpdate = await questionToUpdate.save();

    res
      .status(200)
      .json({
        message: "Question updated successfully",
        question: questionToUpdate,
      });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const filterQuestionsByDifficulty = async (
  req: Request,
  res: Response
) => {
  const { difficulty } = req.query;

  try {
    const filteredQuestions = await Question.find({ difficulty });

    res.status(200).json(filteredQuestions);
  } catch (error) {
    console.error("Error filtering questions by difficulty:", error);
    res.status(500).json({ message: "Server error" });
  }
};
