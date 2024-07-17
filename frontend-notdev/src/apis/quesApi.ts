import axios from "axios";

const serverurl = import.meta.env.VITE_SERVER_URL;

type QuestionResponse = {
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
export const fetchQuesData = async (topicId: string, token: string, uid: string) => {
  const response = await axios.get(
    `${serverurl}/api/topics/topics/${topicId}/questions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'uid': uid
      },
      params: {
        uid: uid,
      },
    }
  );
  return response;
};


export const createDSAQues = async (formData: QuestionResponse, token: string, uid: string) => {
  const response = await axios.post(
    `${serverurl}/api/questions/upload-question`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'uid': uid
      },
      params: {
        uid: uid,
      },
    }
  );
  return response;
};


export const deleteDSAQues = async (id: string, token: string, uid: string) => {
  await axios.delete(`${serverurl}/api/questions/delete-question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'uid': uid
    },
    params: {
      uid: uid,
    },
  });
};


export const fetchSingleQuesData = async (id: string, token: string, uid: string) => {
  const response = await axios.get<QuestionResponse>(
    `${serverurl}/api/questions/question/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'uid': uid
      },
      params: {
        uid: uid,
      },
    }
  );
  return response;
};


export const updateDSAQues = async (formData: QuestionResponse, token: string, id: string, uid: string) => {
  await axios.patch(
    `${serverurl}/api/questions/update-question/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'uid': uid
      },
      params: {
        uid: uid,
      },
    }
  );
};

