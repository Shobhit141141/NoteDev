import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  MdDelete,
  MdEditDocument,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchQuesData } from "@/apis/quesApi";
import { useAuth } from "@/context/GoogleAuthContext";
import "daisyui/dist/full.css"; // Add this line to include DaisyUI styles
import "./AllQuestions.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDSATopic } from "@/apis/dsaApi";
import toast from "react-hot-toast";
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
  const [searchByTag, setSearchByTag] = useState<boolean>(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("title");
  const topicId = queryParams.get("topicId");
  const navigate = useNavigate();
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null);

  const { token, uid } = useAuth();
  const fetchQuestions = async () => {
    try {
      if (!token || !topicId) {
        return;
      }
      if (!uid) {
        return;
      }
      const response = await fetchQuesData(topicId, token, uid);
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    } catch (error) {
      setError("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [topicId, token]);

  useEffect(() => {
    const filtered = questions.filter((question) => {
      const matchesSearchQuery = searchByTag
        ? question.tag.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : question.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter
        ? question.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
        : true;
      return matchesSearchQuery && matchesDifficulty;
    });
    setFilteredQuestions(filtered);
  }, [searchQuery, difficultyFilter, searchByTag, questions]);

  const handleDelete = async () => {
    try {
      if (!token || !deleteTopicId) {
        return;
      }
      if (!uid) {
        return;
      }
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this topic?"
      );
      if (confirmDelete) {
        await deleteDSATopic(deleteTopicId, token, uid);
        navigate("/");
        toast.success("Topic deleted successfully");
      } else {
        return;
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Failed to delete topic");
    }
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return {
          bgClass: "bg-green-400",
          textClass: "text-green-400",
        };
      case "medium":
        return {
          bgClass: "bg-orange-300",
          textClass: "text-orange-300",
        };
      case "hard":
        return {
          bgClass: "bg-red-600",
          textClass: "text-red-600",
        };
      default:
        return {
          bgClass: "",
          textClass: "",
        };
    }
  };

  const isActiveTabAll = difficultyFilter === "";

  if (loading) {
    return (
      <div className="w-full h-max px-4 sm:px-8">
        <SkeletonTheme
          baseColor="#ffffff20"
          highlightColor="#fff"
          duration={500}
          direction="ltr"
          enableAnimation={true}
        >
          <div className="flex justify-end">
            <Skeleton width={150} height={40} className="animate-pulse" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 items-center">
            <Skeleton width={200} height={40} className="animate-pulse" />
            <Skeleton width={50} height={30} className="animate-pulse" />
          </div>
          <div className="w-full sm:w-[60%] flex justify-between px-4 sm:px-8 items-center my-4">
            <Skeleton width="100%" height={40} className="animate-pulse" />
          </div>
          <div className="w-[80%] sm:w-[40%] md:w-[20%] flex justify-between px-4 sm:px-8 items-center my-4 gap-[10px]">
            <Skeleton width={60} height={30} className="animate-pulse" />
            <Skeleton width={60} height={30} className="animate-pulse" />
            <Skeleton width={60} height={30} className="animate-pulse" />
            <Skeleton width={60} height={30} className="animate-pulse" />
          </div>
          <div className="w-full sm:w-[60%] h-max flex flex-col justify-center px-4 sm:px-8">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index}>
                <div className="question-item h-[50px] my-1 mx-auto rounded-[4px] transition duration-300 ease-in-out">
                  <div className="flex h-[50px] justify-between items-center px-4 font-light">
                    <Skeleton
                      width={40}
                      height={40}
                      className="animate-pulse"
                    />
                    <Skeleton
                      width={200}
                      height={40}
                      className="animate-pulse"
                    />
                    <Skeleton
                      width={15}
                      height={15}
                      circle={true}
                      className="animate-pulse"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-3xl font-bold text-red-500 bg-[#00000080] p-4 rounded-[16px]">
          Forbidden :(
        </h1>
      </div>
    );

  return (
    <div className="w-full h-max px-4 sm:px-8">
      <div className="flex justify-end">
        <div className="flex justify-between items-center w-full sm:w-fit sm:gap-2">
          <Link to={`/question-form/${topicId}/?topic=${topic}`}>
            <span className="flex justify-center items-center bg-btnbg w-[120px] sm:w-[150px] text-[16px] sm:text-[20px] rounded-[5px] py-2 hover:bg-[#2cd269] transition-all active:scale-[0.95] text-green-600 hover:text-white cursor-pointer ">
              <MdOutlineCreateNewFolder className="text-[20px] sm:text-[25px] mr-2" />
              <span className="text-white">Create</span>
            </span>
          </Link>

          <Link to={`/update-topic/${topicId}/?topic=${topic}`}>
            <span className="flex justify-center items-center bg-btnbg w-[120px] sm:w-[150px] text-[16px] sm:text-[20px] rounded-[5px] py-2 hover:bg-[#007ffe] transition-all active:scale-[0.95] text-blue-600 hover:text-white cursor-pointer ">
              <MdEditDocument className="text-[20px] sm:text-[25px] mr-2" />
              <span className="text-white">Update</span>
            </span>
          </Link>

          {/* <span className="flex justify-center items-center bg-btnbg w-[120px] sm:w-[150px] text-[16px] sm:text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#de0303] transition-all active:scale-[0.95] text-red-600 hover:text-white">
            <MdDelete className="text-[20px] sm:text-[25px] mr-2 " />
            <span className="text-white">Delete</span>
          </span> */}
        
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span
                  className="flex justify-center items-center bg-btnbg w-[120px] sm:w-[150px] text-[16px] sm:text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#de0303] transition-all active:scale-[0.95] text-red-600 hover:text-white"
                  onClick={() => setDeleteTopicId(topicId)}
                >
                  <MdDelete className="text-[20px] sm:text-[25px] mr-2 " />
                  <span className="text-white">Delete</span>
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-appbg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove
                    your DSA Topic and related questions from our servers
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="text-red-500"
                    onClick={() => {
                      handleDelete();
                      setDeleteTopicId(null);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 items-center">
        <h1 className="text-[28px] sm:text-[40px]">{topic}</h1>
        <h1 className="text-[20px] sm:text-[30px]">
          {filteredQuestions.length}
        </h1>
      </div>
      <div className="w-full sm:w-[60%] flex justify-between px-4 sm:px-8 items-center my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchByTag ? "Search by tag..." : "Search questions..."}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center px-4 sm:px-8 mb-4 gap-4">
        <span className="text-lg">Search by Tag</span>
        <input
          type="checkbox"
          className="toggle toggle-primary "
          checked={searchByTag}
          onChange={() => setSearchByTag(!searchByTag)}
        />
      </div>
      <div className="w-[80%] sm:w-[40%] md:w-[20%] flex justify-between px-4 sm:px-8 items-center my-4 gap-[15px]">
        <button
          onClick={() => setDifficultyFilter("")}
          className={`px-2 py-1 rounded ${
            isActiveTabAll ? "bg-blue-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setDifficultyFilter("easy")}
          className={`px-2 py-1 rounded ${
            difficultyFilter === "easy"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficultyFilter("medium")}
          className={`px-2 py-1 rounded ${
            difficultyFilter === "medium"
              ? "bg-orange-400 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setDifficultyFilter("hard")}
          className={`px-2 py-1 rounded ${
            difficultyFilter === "hard"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Hard
        </button>
      </div>
      <div className="w-full sm:w-[60%] h-[55vh] flex flex-col justify-start px-4 sm:px-8 overflow-y-scroll mb-[20px] custom-scrollbar">
        {filteredQuestions.map((question, index) => (
          <NavLink key={question._id} to={`/question/${question._id}`}>
            <div
              className={`question-item h-[50px] bg-[#212020] my-1 mx-auto rounded-[4px] transition duration-300 ease-in-out hover:bg-[#302f2f] `}
            >
              <div className="flex h-[50px] justify-between items-center px-4 font-light">
                <div className="flex">
                  <p
                    className={`font-bold ${
                      isActiveTabAll
                        ? "text-blue-500"
                        : getDifficultyClass(question.difficulty).textClass
                    }`}
                  >
                    {index + 1} )
                  </p>
                  <h2 className="ml-[20px] text-[14px] sm:text-[16px]">
                    {question.title}
                  </h2>
                </div>
                {question.difficulty && (
                  <h3
                    className={`${
                      getDifficultyClass(question.difficulty).bgClass
                    } w-[15px] h-[15px] rounded-[50%]`}
                  ></h3>
                )}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
