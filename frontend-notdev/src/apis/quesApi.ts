import axios from "axios";

const serverurl = import.meta.env.VITE_SERVER_URL;

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
// interface Question {
//     title: string;
//     description: string;
//     difficulty: "easy" | "medium" | "hard";
//     topicId: string;
//     tag: string[];
//     links: {
//       leetcode?: string;
//       gfg?: string;
//       codeforces?: string;
//     };
//     text?: string;
//     code?: string;
//     solutionLink?: string;
//     youtubeLink?: string;
//     images: string[];
//   }

export const fetchQuesData = async (topicId: string, token: string) => {
  const response = await axios.get(
    `${serverurl}/api/topics/topics/${topicId}/questions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const createDSAQues = async (formData: FormData, token: string) => {
  const response = await axios.post(
    `${serverurl}/api/questions/upload-question`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteDSAQues = async (id: string, token: string) => {
  await axios.delete(`${serverurl}/api/questions/delete-question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleQuesData = async (id: string, token: string) => {
  const response = await axios.get<FormData>(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/question/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateDSAQues = async (
  formData: FormData,
  token: string,
  id: string
) => {
  await axios.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/questions/update-question/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
