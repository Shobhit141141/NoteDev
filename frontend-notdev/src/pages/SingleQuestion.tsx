import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Question {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topicId: string;
  tag: string[];
  links: {
    leetcode?: string;
    gfg?: string;
    codeforces?: string;
  };
  text?: string;
  code?: string;
  solutionLink?: string;
  youtubeLink?: string;
  images: string[];
}

const SingleQuestion: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get<Question>(
          `http://localhost:5000/api/questions/question/${id}`
        );
        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  return (
    <div>
      {!loading ? (
        <div>
          <SkeletonTheme
            baseColor="#ffffff20"
            highlightColor="#fff"
            direction="rtl"
            enableAnimation={true}
          >
            <Skeleton
              height={50}
              width={200}
              className="animated-skeleton animate-pulse rounded-[6px]"
            />
          </SkeletonTheme>
        </div>
      ) : question ? (
        <div>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
        </div>
      ) : (
        <div>No question found</div>
      )}
    </div>
  );
};

export default SingleQuestion;
