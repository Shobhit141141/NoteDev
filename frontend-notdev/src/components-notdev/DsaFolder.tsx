import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdDelete, MdOutlineCreateNewFolder } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import "./DsaFolder.css";
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
import { deleteDSATopic, fetchTopicsData } from "@/apis/dsaApi";
import { useAuth } from "@/context/GoogleAuthContext";
import { TbPhotoCode } from "react-icons/tb";
import { LiaFileCode } from "react-icons/lia";
import { LuCode } from "react-icons/lu";
interface Topic {
  title: string;
  image: string;
  totalQuestions: number;
  _id: string;
}

function DsaFolder() {
  const [loading, setLoading] = useState<boolean>(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user, token, userLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await fetchTopicsData(token);
        setTopics(response.data.topics);
        setFilteredTopics(response.data.topics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTopics(filtered);
  }, [searchQuery, topics]);

  const handleDelete = async () => {
    try {
      if (!token || !deleteTopicId) {
        return;
      }

      await deleteDSATopic(deleteTopicId, token);

      const response = await fetchTopicsData(token);
      setTopics(response.data.topics);
      setFilteredTopics(response.data.topics);

      toast.success("Topic deleted successfully");
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Failed to delete topic");
    }
  };
  if (userLoading) {
    return (
      <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-[#00000080] bg-opacity-50 z-50">
        <span className="loading loading-dots loading-sm text-white"></span>
      </div>
    );
  }
  

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="login-prompt-card p-6 bg-[#00000090] shadow-md text-center rounded-2xl">
          <div className="flex w-[100%] justify-center gap-4">
            <span className="text-white">
              <TbPhotoCode className="text-[30px]" />
            </span>
            <span className="text-white">
              <LuCode className="text-[30px]" />
            </span>
            <span className="text-white">
              <LiaFileCode className="text-[30px]" />
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-800 via-pink-500 to-pink-300 bg-clip-text text-transparent my-4">
            Welcome to NOTEDEV
          </h2>
          <p className="mb-4">
            Please{" "}
            <Link
              to={"/signin"}
              className="mx-1 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-300 bg-clip-text text-transparent border-b-[1px]"
            >
              sign in
            </Link>{" "}
            to start your DSA journey.
          </p>
        </div>
      </div>
    );
  }
  // if (userLoading || filteredTopics.length === 0) {
  //   return (
  //     <>
  //       <div className="flex justify-between items-center">
  //         <div className="flex justify-start my-4 pl-10 w-[60%]">
  //           <input
  //             type="text"
  //             value={searchQuery}
  //             onChange={(e) => setSearchQuery(e.target.value)}
  //             placeholder="Search topics..."
  //             className="w-[100%] sm:w-[50%] p-2 border border-gray-300 rounded"
  //           />
  //         </div>

  //         <Link to={"/dsa-topic-form"}>
  //           <span className="flex justify-center items-center bg-btnbg w-[150px] text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#302f2f] transition-all active:scale-[0.95] m-2 mr-6">
  //             <MdOutlineCreateNewFolder className="text-[25px] mr-2 text-green-400" />
  //             <span>Create</span>
  //           </span>
  //         </Link>
  //       </div>
  //       <div className="flex justify-center items-center h-[60vh]">
  //         <div className="empty-topics-message p-6 bg-[#00000090] shadow-md text-center rounded-2xl">
  //           <h2 className="text-2xl font-bold mb-4 text-yellow-500">
  //             Oops! <p className="text-red-500">404</p>No topics found
  //           </h2>
  //           <p className="mb-4">
  //             Start your DSA journey by creating a new topic.
  //           </p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className="dsa-wrapper relative">
      {user && (
        <div className="flex justify-between items-center">
          <div className="flex justify-start my-4 pl-10 w-[60%]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-[100%] sm:w-[50%] p-2 border border-gray-300 rounded"
            />
          </div>

          <Link to={"/dsa-topic-form"}>
            <span className="flex justify-center items-center bg-btnbg w-[150px] text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#302f2f] transition-all active:scale-[0.95] m-2 mr-6">
              <MdOutlineCreateNewFolder className="text-[25px] mr-2 text-green-400" />
              <span>Create</span>
            </span>
          </Link>
        </div>
      )}

      <div className="grid-container">
        {loading
          ? Array.from({ length: 12 }, (_, index) => (
              <div key={index}>
                <SkeletonTheme
                  baseColor="#ffffff10"
                  highlightColor="#fff"
                  duration={500}
                  direction="ltr"
                  enableAnimation={true}
                >
                  <Skeleton
                    width={250}
                    height={150}
                    className="animated-skeleton animate-pulse"
                  />
                  <div className="flex justify-between w-[250px]">
                    <Skeleton
                      width={190}
                      height={50}
                      className="animated-skeleton animate-pulse"
                    />
                    <Skeleton
                      width={50}
                      height={50}
                      circle={true}
                      className="animated-skeleton animate-pulse"
                    />
                  </div>
                </SkeletonTheme>
              </div>
            ))
          : filteredTopics.length === 0 ? (
            <div className="flex justify-center items-center h-[60vh] w-[100vw]">
              <div className="empty-topics-message p-6 bg-[#00000090] shadow-md text-center rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 text-yellow-500">
                  Oops! 404 No topics found
                </h2>
                <p className="mb-4">
                  Start your DSA journey by creating a new topic.
                </p>
              </div>
            </div>
          ) :  filteredTopics.map((topic, index) => (
              <div key={index} className="grid-item">
                <div className="img-container">
                  <NavLink
                    to={`/questions?title=${topic.title}&topicId=${topic._id}`}
                  >
                    <img src={topic.image} alt={topic.title} />
                  </NavLink>
                </div>

                <div className="topic-details">
                  <div className="title">
                    <p>{topic.title}</p>
                  </div>

                  <div className="flex justify-between w-[60px] items-center">
                    <div className="no-of-ques text-[15px] w-[30px] h-[30px] flex justify-center items-center">
                      {/* <div
                        className="radial-progress bg-green-700"
                        style={
                          {
                            "--value": 0,
                            "--size": "30px",
                            "--thickness": "4px",
                          } as any
                        }
                        role="progressbar"
                      >
                        {topic.totalQuestions}
                      </div> */}
                      <div className="bg-green-400 w-[50px] text-black h-[30px] flex justify-center items-center rounded-[6px]">
                        {topic.totalQuestions}
                      </div>
                    </div>
                    <div className="text-[25px] hover:text-red-600 hover:rotate-6 transition-all cursor-pointer  h-[30px] ">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setDeleteTopicId(topic._id)}
                            className="text-white"
                          >
                            <MdDelete className="text-white hover:text-red-600 transition-all" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-appbg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently remove your DSA Topic and related
                              questions from our servers
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
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default DsaFolder;
