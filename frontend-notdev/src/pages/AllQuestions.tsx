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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("title");
  const topicId = queryParams.get("topicId");


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/questions/get-questions"
        );
        setQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-400";
      case "medium":
        return "bg-orange-400";
      case "hard":
        return "bg-red-600";
      default:
        return "";
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">{error}</div>;

  return (
    <div className="w-[100vw] h-max">
      <div className="flex justify-end">
        <Link to={`/question/${topicId}`}>
          <span className="flex justify-center items-center bg-btnbg w-[150px] text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#302f2f] transition-all active:scale-[0.95] m-2 mr-6">
            <MdOutlineCreateNewFolder className="text-[25px] mr-2 text-green-400" />
            <span>Create</span>
          </span>
        </Link>
      </div>
      <div className="w-[60%] flex justify-between px-8 items-center">
        <h1 className="text-[40px] ">{topic}</h1>
        <h1 className="text-[30px]">25</h1>
      </div>
      <div className="w-[60%] h-max flex flex-col justify-center px-8">
        {questions.map((question, index) => (
          <NavLink key={question._id} to={`/question/${question._id}`}>
            <div className="h-[50px] bg-btnbg my-1 mx-auto rounded-[4px]  ease-in-out hover:bg-gradient-to-r hover:from-[#2f2d2d] hover:to-[#505050] transition duration-300">
              <div className="flex h-[50px] justify-between items-center px-4 font-light">
                <p>{index + 1}</p>
                <h2>{question.title}</h2>
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
