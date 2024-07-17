import api from '../config/api';

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
export const fetchQuesData = async (topicId: string, uid: string) => {
  const response = await api.get(
    `/api/topics/topics/${topicId}/questions`,
    {
      withCredentials: true,
      params: {
        uid: uid,
      },
    }
  );
  return response;
};

export const createDSAQues = async (
  formData: QuestionResponse,

  uid: string
) => {
  const response = await api.post(
    `/api/questions/upload-question`,
    formData,
    {
      withCredentials: true,
      params: {
        uid: uid,
      },
    }
  );
  return response;
};

export const deleteDSAQues = async (id: string, uid: string) => {
  await api.delete(`/api/questions/delete-question/${id}`, {
    withCredentials: true,
    params: {
      uid: uid,
    },
  });
};

export const fetchSingleQuesData = async (
  id: string,

  uid: string
) => {
  const response = await api.get<QuestionResponse>(
    `/api/questions/question/${id}`,
    {
      withCredentials: true,
      params: {
        uid: uid,
      },
    }
  );
  return response;
};

export const updateDSAQues = async (
  formData: QuestionResponse,

  id: string,
  uid: string
) => {
  await api.patch(
    `/api/questions/update-question/${id}`,
    formData,
    {
      withCredentials: true,
      params: {
        uid: uid,
      },
    }
  );
};
