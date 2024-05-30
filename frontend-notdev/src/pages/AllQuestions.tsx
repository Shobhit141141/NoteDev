import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

type Question = {
  _id:string;
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
        const response = await axios.get(
          "http://localhost:5000/api/questions/get-questions"
        );
        setQuestions(response.data);
        console.log(response.data)
      } catch (error) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {questions.map((question) => (
        <NavLink to={`/question/${question._id}`}>
          <div
          key={question._id}
          className="bg-white rounded-lg shadow-md p-6 text-black"
        >
          <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
          <p className="text-gray-600 mb-4">{question.description}</p>
          <p className="text-sm font-semibold">
            Difficulty: {question.difficulty}
          </p>
          <p className="text-sm font-semibold">Topic ID: {question.topicId}</p>
          <p className="text-sm font-semibold">
            Tags: {question.tag.join(", ")}
          </p>
          <div className="flex space-x-2 mt-4">
            <a
              href={question.links.leetcode}
              className="text-blue-600 hover:underline"
            >
              Leetcode
            </a>
            <a
              href={question.links.gfg}
              className="text-blue-600 hover:underline"
            >
              GFG
            </a>
            <a
              href={question.links.codeforces}
              className="text-blue-600 hover:underline"
            >
              Codeforces
            </a>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: question.text }}
            className="mt-4"
          ></div>
          <pre className="whitespace-pre-wrap mt-4">{question.code}</pre>
          <a
            href={question.solutionLink}
            className="text-blue-600 hover:underline block mt-4"
          >
            Solution Link
          </a>
          <a
            href={question.youtubeLink}
            className="text-blue-600 hover:underline block"
          >
            YouTube Link
          </a>
          <div className="mt-4">
            {question.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Question ${index}`}
                className="w-full h-auto mb-2 rounded"
              />
            ))}
          </div>
        </div>
        </NavLink>
      ))}
    </div>
  );
}

export default QuestionList;
