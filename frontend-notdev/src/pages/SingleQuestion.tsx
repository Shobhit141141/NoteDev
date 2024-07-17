import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import lc from "/leetcode.svg";
import gfg from "/gfg.svg";
import yt from "/youtube.svg";
import sl from "/idea.svg";

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
import { useAuth } from "@/context/GoogleAuthContext";
import { deleteDSAQues, fetchSingleQuesData } from "@/apis/quesApi";

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

interface QuestionResponse {
  title: string;
  description: string;
  difficulty: string;
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
const isQuestion = (data: QuestionResponse): data is Question => {
  return ["easy", "medium", "hard"].includes(data.difficulty);
};

const SingleQuestion: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {  uid } = useAuth();

  // Function to format date to IST
  function convertUTCtoIST(createdAt: Date) {
    // Create new date object using UTC values
    const istDate = new Date(
      createdAt.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    // Define month names for formatting
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract components
    const day = istDate.getDate().toString().padStart(2, "0");
    const month = monthNames[istDate.getMonth()];
    const year = istDate.getFullYear();
    const hours = istDate.getHours().toString().padStart(2, "0");
    const minutes = istDate.getMinutes().toString().padStart(2, "0");
    const seconds = istDate.getSeconds().toString().padStart(2, "0");

    // Return formatted date and time string
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if (!id ) {
          return;
        }
        if (!uid) {
          return;
        }
        const response = await fetchSingleQuesData(id, uid);
        // console.log(response.status);
        if (response.status === 403) {
          // Handle forbidden access
          console.error("Access Denied. Status code:", response.status);
          toast.error("Access Denied, Don't try to be fishy");
          return;
        }
        const data: QuestionResponse = response.data;

        if (isQuestion(data)) {
          setQuestion(data);
        } else {
          console.error("Invalid question data:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);
  // @ts-ignore
  // if(userLoading && uid !== question?.createdBy) {
  //   return (
  //     <div className="flex justify-center items-center h-[80%]">
  //       <h1 className="text-3xl font-bold text-red-500 bg-[#00000080] p-4 rounded-[16px]">Access Denied , Dont Try to be fishy</h1>
  //     </div>
  //   );
  // }

  const getDifficultyClass = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy":
        return {
          text: "text-green-400",
          bg: "bg-green-400",
        };
      case "medium":
        return {
          text: "text-orange-500",
          bg: "bg-orange-400",
        };
      case "hard":
        return {
          text: "text-red-500",
          bg: "bg-red-500",
        };
      default:
        return {
          text: "",
          bg: "",
        };
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) {
        return;
      }
      if (!uid) {
        return;
      }
      await deleteDSAQues(id, uid);
      navigate("/");
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    }
  };

  return (
    <div>
      {loading ? (
        <SkeletonTheme baseColor="#ffffff20" highlightColor="#fff40">
          <div className="w-[95%] md:w-[90%] bg-[#00000090] p-4 shadow-md px-8 rounded-2xl mx-auto">
            <div className="flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <Skeleton
                  height={40}
                  width={200}
                  className="animate-pulse rounded-[6px]"
                />
                <Skeleton
                  height={40}
                  width={100}
                  className=" animate-pulse rounded-[22px]"
                />
              </div>
              <Skeleton
                height={100}
                width="100%"
                className="my-6 animate-pulse rounded-[6px]"
              />
              <div className="flex gap-5">
                <Skeleton
                  height={50}
                  width={50}
                  className=" animate-pulse rounded-[15px]"
                />
                <Skeleton
                  height={50}
                  width={50}
                  className=" animate-pulse rounded-[15px]"
                />
                <Skeleton
                  height={50}
                  width={50}
                  className=" animate-pulse rounded-[15px]"
                />
              </div>
              <Skeleton
                height={200}
                width="100%"
                className="my-6  animate-pulse rounded-[6px]"
              />
              <div className="flex flex-wrap mt-4 gap-2">
                <Skeleton
                  height={30}
                  width={60}
                  className=" animate-pulse rounded-full"
                />
                <Skeleton
                  height={30}
                  width={60}
                  className=" animate-pulse rounded-full"
                />
                <Skeleton
                  height={30}
                  width={60}
                  className=" animate-pulse rounded-full"
                />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      ) : question ? (
        <div className="w-[95%] md:w-[90%] bg-[#00000090] p-4 shadow-md px-8 rounded-2xl mx-auto">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <h2 className="text-[30px]">{question.title}</h2>
              <span
                className={`{getDifficultyClass(question.difficulty).text} ${
                  getDifficultyClass(question.difficulty).bg
                } text-black px-4 rounded-[22px] flex justify-center items-center h-[35px] sm:h-[44px] md:h-[44px] lg:h-[44px] text-sm sm:text-base md:text-[20px] lg:text-[20px]`}
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
                  className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#4b4b4b] transition-all cursor-pointer"
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
                  className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#4b4b4b] transition-all cursor-pointer"
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
                  alt="YouTube"
                  className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#4b4b4b] transition-all cursor-pointer"
                />
              </a>
            )}
            {question.solutionLink && (
              <a
                href={question.solutionLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-[50px] h-[50px] bg-[#111010] p-2 rounded-[15px] hover:bg-[#4b4b4b] transition-all cursor-pointer">
                  <img src={sl} alt="LeetCode" className="scale-[1.3]" />
                </div>
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
          <span className="flex justify-start items-center gap-4 my-[20px] mb-[40px]">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-white">
                  <MdDelete className="text-red-600 transition-all text-[40px] border-2 border-red-500 rounded p-2 hover:text-black hover:border-transparent hover:bg-red-500" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-appbg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your questions from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="text-red-500"
                    onClick={() => {
                      handleDelete();
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

            {/* @ts-ignore */}
            {question.createdAt ? convertUTCtoIST(question.createdAt) : ""}
          </span>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-3xl font-bold text-red-500 bg-[#00000080] p-4 rounded-[16px]">
            Fobidden :(
          </h1>
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
