import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateDSATopic, fetchSingleTopicData } from "@/apis/dsaApi"; // Assumes you have this API function
import { useAuth } from "@/context/GoogleAuthContext";

interface TopicData {
  title: string;
  image: string;
}

const UpdateTopic = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const [topicData, setTopicData] = useState<TopicData>({
    title: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const { user, token ,uid} = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || !token) {
          return;
        }
        if(!uid){
          return;
        }
        setSubmitting(true)
        const response = await fetchSingleTopicData(id, token,uid);
        setTopicData({
          title: response.data.topic.title,
          image: response.data.topic.image,
        });
        setSubmitting(false)
      } catch (error) {
        setSubmitting(false)
        toast.error("Failed to fetch topic data");
        console.error(error);
      }
    };
    fetchData();
  }, [id, token]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTopicData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // console.log(createdBy)
  //@ts-ignore
  // if(uid !== createdBy) {
  //   return (
  //     <div className="flex justify-center items-center h-[80%]">
  //       <h1 className="text-3xl font-bold text-red-500 bg-[#00000080] p-4 rounded-[16px]">Access Denied , Dont Try to be fishy</h1>
  //     </div>
  //   );
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !token) {
      toast.error("You must be logged in to submit the form");
      return;
    }

    if (!id) {
      toast.error("Provide a valid ID");
      return;
    }

    if(!uid){
      return;
    }

    setSubmitting(true);
    try {
      const updatedData = {
        title: topicData.title,
        image: topicData.image,
      };

      await updateDSATopic(id, updatedData, token,uid);
      toast.success("Form submitted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit form");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTopicData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 rounded-[20px] shadow-lg bg-[#00000090]">
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Title</label>
          <input
            type="text"
            name="title"
            value={topicData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {submitting ? (
            <span className="loading loading-dots loading-md flex mx-auto"></span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateTopic;
