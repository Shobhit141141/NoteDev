import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import lc from "/leetcode.svg";
import gfg from "/gfg.svg";
import yt from "/youtube.svg";
import TabNav from "@/components-notdev/AceEditor";
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
import { MdDelete, MdEditDocument } from "react-icons/md";
import toast from "react-hot-toast";
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
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get<Question>(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/question/${id}`
        );
        console.log(response.data);
        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const getDifficultyClass = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy":
        return {
          text: "text-green-400",
          border: "border-green-400",
        };
      case "medium":
        return {
          text: "text-orange-300",
          border: "border-orange-300",
        };
      case "hard":
        return {
          text: "text-red-500",
          border: "border-red-500",
        };
      default:
        return {
          text: "",
          border: "",
        };
    }
  };

  const handleDelete = async () => {
    try {
      console.log(deleteTopicId);
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}api/questions/delete-question/${deleteTopicId}`
      );
      navigate("/");
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting topic:", error);

      toast.error("Failed to delete Question");
    }
  };

  return (
    <div>
      {loading ? (
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
        <div className="w-[95%] md:w-[90%] bg-[#00000090] p-4 shadow-md px-8  rounded-2xl mx-auto">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <h2 className="text-[30px]">{question.title}</h2>
              <span
                className={`${getDifficultyClass(question.difficulty).text} ${
                  getDifficultyClass(question.difficulty).border
                } px-4 rounded-[22px] border-2 flex justify-center items-center h-[35px] sm:h-[44px] md:h-[44px] lg:h-[44px] text-sm sm:text-base md:text-[20px] lg:text-[20px]`}
              >
                {question.difficulty}
              </span>
            </div>
            
          </div>
          <p className="my-6 text-[20px] font-light roboto">
            {question.description}
          </p>
          <div className="flex gap-5">
            {question.links.leetcode && (
              <a
                href={question.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={lc}
                  alt="LeetCode"
                  className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#000000] transition-all cursor-pointer"
                />
              </a>
            )}
            {question.links.gfg && (
              <a
                href={question.links.gfg}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={gfg}
                  alt="GeeksforGeeks"
                  className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#000000] transition-all cursor-pointer"
                />
              </a>
            )}

            {question.youtubeLink && (
              <a
                href={question.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={yt}
                  alt="GeeksforGeeks"
                  className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#000000] transition-all cursor-pointer"
                />
              </a>
            )}
          </div>

          <TabNav
            text={question.text ?? ""}
            code={question.code ?? ""}
            images={question.images ?? ""}
          />
          <div className="flex flex-wrap mt-4">
            {question.tag.map((tag, index) => (
              <span
                key={index}
                className="border-2 border-gray-200 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="flex justify-start items-center gap-4 mt-[20px]">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => setDeleteTopicId(id || null)}
                    className="text-white"
                  >
                    <MdDelete className="text-red-600 transition-all text-[40px] border-2 border-red-500 rounded p-2 hover:text-black hover:border-transparent hover:bg-red-500" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-appbg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
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

              <MdEditDocument
                className="text-blue-500 transition-all text-[40px] border-2 border-blue-500 rounded p-2 hover:text-black hover:border-transparent hover:bg-blue-500 cursor-pointer"
                onClick={() => navigate(`/update-question/${id}`)}
              />
            </span>
        </div>
      ) : (
        <div>No question found</div>
      )}
    </div>
  );
};

export default SingleQuestion;
