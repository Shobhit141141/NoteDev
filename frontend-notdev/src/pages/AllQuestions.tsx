import  { useEffect, useState } from "react";
import axios from "axios";
// import "./QuestionList.css";

type Question = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topicId: string;
  tag: string[];
  links: {
    leetcode: string;
    gfg: string;
    codeforces: string;
  };
  text: string;
  code: string;
  solutionLink: string;
  youtubeLink: string;
  images: string[];
};

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions/get-questions");
        setQuestions(response.data);
      } catch (error) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="question-list">
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <h3 className="text-xl font-bold">{question.title}</h3>
          <p>{question.description}</p>
          <p>Difficulty: {question.difficulty}</p>
          <p>Topic ID: {question.topicId}</p>
          <p>Tags: {question.tag.join(", ")}</p>
          <div>
            <a href={question.links.leetcode}>Leetcode</a>
            <a href={question.links.gfg}>GFG</a>
            <a href={question.links.codeforces}>Codeforces</a>
          </div>
          <p>Text: {question.text}</p>
          <pre>{question.code}</pre>
          <a href={question.solutionLink}>Solution Link</a>
          <a href={question.youtubeLink}>YouTube Link</a>
          <div className="images">
            {question.images.map((image, index) => (
              <img key={index} src={image} alt={`Question ${index}`} className="question-image" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
