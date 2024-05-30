import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdDelete, MdOutlineCreateNewFolder } from "react-icons/md";
import axios from "axios";
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

interface Topic {
  title: string;
  image: string;
  totalQuestions: number;
  _id: string;
}

function DsaFolder() {
  const [loading, setLoading] = useState<boolean>(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ topics: Topic[] }>(
          "http://localhost:5000/api/topics/all-topics"
        );
        setTopics(response.data.topics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/topics/delete-topic/${deleteTopicId}`
      );

      const response = await axios.get<{ topics: Topic[] }>(
        "http://localhost:5000/api/topics/all-topics"
      );
      setTopics(response.data.topics);

      toast.success("Topic deleted successfully");
    } catch (error) {
      console.error("Error deleting topic:", error);

      toast.error("Failed to delete topic");
    }
  };

  return (
    <div className="dsa-wrapper relative">
      <div className="flex justify-end">
        <Link to={"/dsa-topic-form"}>
          <span className="flex justify-center items-center bg-btnbg w-[150px] text-[20px] rounded-[5px] cursor-pointer py-2 hover:bg-[#302f2f] transition-all active:scale-[0.95] m-2 mr-6">
            <MdOutlineCreateNewFolder className="text-[25px] mr-2 text-green-400" />
            <span>Create</span>
          </span>
        </Link>
      </div>
      <div className="grid-container">
        {loading ? (
          Array.from({ length: 12 }, (_, index) => (
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
        ) : (
          // Render actual content once data is loaded
          topics.map((topic, index) => (
            <div key={index} className="grid-item">
              <div className="img-container">
               <NavLink to={`/question?topicId=${topic._id}`}>
               <img src={topic.image} alt={topic.title} />
               </NavLink>
              </div>

              <div className="topic-details">
                <div className="title">
                  <p>{topic.title}</p>
                </div>

                <div className="flex justify-between w-[60px] items-center">
                  <div className="no-of-ques text-[15px] w-[30px] h-[30px] flex justify-center items-center">
                    {/* <p>{topic.totalQuestions}</p> */}
                    <div className="radial-progress text-green-400" style={{ "--value": 0 ,  "--size": "30px", "--thickness": "4px" } as any} role="progressbar">{topic.totalQuestions}</div>
                  </div>
                  <div className="text-[25px] hover:text-red-600 hover:rotate-6 transition-all cursor-pointer">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setDeleteTopicId(topic._id)}
                          className="text-white"
                        >
                          <MdDelete className="text-white hover:text-red-600 transition-all"/>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-appbg">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>
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
                    </AlertDialog>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}

export default DsaFolder;
