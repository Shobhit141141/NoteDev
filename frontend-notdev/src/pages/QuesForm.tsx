import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import QuillEditor from "@/components-notdev/TextEditor";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { LuInfo } from "react-icons/lu";
// import "./QuestionForm.css";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

type FormData = {
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

function QuestionForm() {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    difficulty: "",
    topicId: "",
    tag: [],
    links: {
      leetcode: "",
      gfg: "",
      codeforces: "",
    },
    text: "",
    code: "",
    solutionLink: "",
    youtubeLink: "",
    images: [],
  });
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicId = queryParams.get("topicId");

    if (topicId) {
      setFormData((prevData) => ({
        ...prevData,
        topicId,
      }));
    }
  }, [location.search]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLinkChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      links: {
        ...prevData.links,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/questions/upload-question",
        formData
      );
      console.log(response.data); // handle response from the backend
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const filePromises = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result.toString());
          } else {
            reject(new Error("File reading failed"));
          }
        };
        reader.onerror = () => reject(new Error("File reading error"));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then((base64Files) => {
        setFormData((prevData) => ({
          ...prevData,
          images: base64Files,
        }));
      })
      .catch((error) =>
        console.error("Error converting images to base64:", error)
      );
  };

  // const handleSelectChange = (value: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     difficulty: value,
  //   }));
  // };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Question Form</h2>
      <div className="tabs">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 1
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-900 text-white"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Basic Info
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 2
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-900 text-white"
            }`}
            onClick={() => setActiveTab(2)}
          >
            Links
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 3
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-900 text-white"
            }`}
            onClick={() => setActiveTab(3)}
          >
            Content
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block">
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  ></textarea>
                </label>
              </div>
              <div>
                <label className="block">
                  Difficulty:
                  <div className="flex space-x-4 bg-[#121212] h-[50px] border-[1px] border-white rounded-[6px] justify-evenly">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="difficulty"
                        value="easy"
                        checked={formData.difficulty === "easy"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 rounded-full cursor-pointer border border-gray-300 ${
                          formData.difficulty === "easy" ? "bg-green-500" : ""
                        }`}
                      ></span>
                      <span className="text-green-500">Easy</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="difficulty"
                        value="medium"
                        checked={formData.difficulty === "medium"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 rounded-full cursor-pointer border border-gray-300 ${
                          formData.difficulty === "medium"
                            ? "bg-orange-500"
                            : ""
                        }`}
                      ></span>
                      <span className="text-orange-500">Medium</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={formData.difficulty === "hard"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 rounded-full cursor-pointer border border-gray-300 ${
                          formData.difficulty === "hard" ? "bg-red-500" : ""
                        }`}
                      ></span>
                      <span className="text-red-500">Hard</span>
                    </label>
                  </div>
                </label>
              </div>
              <div>
                <label className="block">
                  Topic ID:
                  <input
                    type="text"
                    name="topicId"
                    value={formData.topicId}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  Tags:
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag.join(", ")}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        tag: e.target.value.split(",").map((tag) => tag.trim()),
                      }))
                    }
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block">
                  Leetcode Link:
                  <input
                    type="text"
                    name="leetcode"
                    value={formData.links.leetcode}
                    onChange={handleLinkChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  GFG Link:
                  <input
                    type="text"
                    name="gfg"
                    value={formData.links.gfg}
                    onChange={handleLinkChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  Codeforces Link:
                  <input
                    type="text"
                    name="codeforces"
                    value={formData.links.codeforces}
                    onChange={handleLinkChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block">

                  Text:
                  <QuillEditor/>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  ></textarea>
                </label>
              </div>
              <div>
                <label className="block">
                  Code:
                  <textarea
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  ></textarea>
                </label>
              </div>
              <div>
                <label className="block">
                  Solution Link:
                  <input
                    type="text"
                    name="solutionLink"
                    value={formData.solutionLink}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  YouTube Link:
                  <input
                    type="text"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div>
                <label className="block">
                  Images:
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-32 flex justify-center items-center border border-gray-300 rounded overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
