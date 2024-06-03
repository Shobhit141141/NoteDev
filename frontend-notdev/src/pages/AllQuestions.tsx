import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";

type Question = {
  _id: string;
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
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("title");
  const topicId = queryParams.get("topicId");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/topics/topics/${topicId}/questions`
        );
        setQuestions(response.data);
        setFilteredQuestions(response.data);
      } catch (error) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId]);

  useEffect(() => {
    const filtered = questions.filter((question) => {
      const matchesSearchQuery = question.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter ? question.difficulty.toLowerCase() === difficultyFilter.toLowerCase() : true;
      return matchesSearchQuery && matchesDifficulty;
    });
    setFilteredQuestions(filtered);
  }, [searchQuery, difficultyFilter, questions]);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-400";
      case "medium":
        return "bg-orange-300";
      case "hard":
        return "bg-red-600";
      default:
        return "";
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">{error}</div>;

  return (
    <div className="w-full h-max px-4 sm:px-8">
      <div className="flex justify-end">
        <Link to={`/question-form/${topicId}/?topic=${topic}`}>
          <span className="flex justify-center items-center bg-btnbg w-[120px] sm:w-[150px] text-[16px] sm:text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#302f2f] transition-all active:scale-[0.95] m-2 mr-4 sm:mr-6">
            <MdOutlineCreateNewFolder className="text-[20px] sm:text-[25px] mr-2 text-green-400" />
            <span>Create</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 items-center">
        <h1 className="text-[28px] sm:text-[40px]">{topic}</h1>
        <h1 className="text-[20px] sm:text-[30px]">{filteredQuestions.length}</h1>
      </div>
      <div className="w-full sm:w-[60%] flex justify-between px-4 sm:px-8 items-center my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-[80%] sm:w-[25%] flex justify-between px-4 sm:px-8 items-center my-4">
        <button
          onClick={() => setDifficultyFilter("")}
          className={`px-2 py-1 rounded ${difficultyFilter === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
        >
          All
        </button>
        <button
          onClick={() => setDifficultyFilter("easy")}
          className={`px-2 py-1 rounded ${difficultyFilter === "easy" ? "bg-green-700 text-white" : "bg-gray-200 text-black"}`}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficultyFilter("medium")}
          className={`px-2 py-1 rounded ${difficultyFilter === "medium" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Medium
        </button>
        <button
          onClick={() => setDifficultyFilter("hard")}
          className={`px-2 py-1 rounded ${difficultyFilter === "hard" ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Hard
        </button>
      </div>
      <div className="w-full sm:w-[60%] h-max flex flex-col justify-center px-4 sm:px-8">
        {filteredQuestions.map((question, index) => (
          <NavLink key={question._id} to={`/question/${question._id}`}>
            <div className="question-item h-[50px] bg-[#212020] my-1 mx-auto rounded-[4px] transition duration-300 ease-in-out hover:bg-[#302f2f]">
              <div className="flex h-[50px] justify-between items-center px-4 font-light">
                <div className="flex">
                  <p>{index + 1}</p>
                  <h2 className="ml-[20px] text-[14px] sm:text-[16px]">{question.title}</h2>
                </div>
                <h3
                  className={`${getDifficultyClass(
                    question.difficulty
                  )} w-[15px] h-[15px] rounded-[50%]`}
                >
                  {/* {question.difficulty} */}
                </h3>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
