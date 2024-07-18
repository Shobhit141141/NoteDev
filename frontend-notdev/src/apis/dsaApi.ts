import axios from "axios";

const serverurl = import.meta.env.VITE_SERVER_URL;

export const fetchTopicsData = async (uid: string) => {
  const response = await axios.get(`${serverurl}/api/topics/all-topics`, {
    withCredentials: true,
    headers: {
     
      'uid': uid
    },
    params: {
      uid: uid,
    },
  });
  return response;
};


export const fetchSingleTopicData = async (id: string, token: string, uid: string) => {
  const response = await axios.get(`${serverurl}/api/topics/topic/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'uid': uid
    },
    params: {
      uid: uid,
    },
  });
  return response;
};


export const createDSATopic = async (
  title: string,
  image: string,
  token: string,
  uid: string
) => {
  const response = await axios.post(
    `${serverurl}/api/topics/create-topic`,
    { title, image },
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


export const deleteDSATopic = async (deleteTopicId: string, token: string, uid: string) => {
  await axios.delete(`${serverurl}/api/topics/delete-topic/${deleteTopicId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'uid': uid
    },
    params: {
      uid: uid,
    },
  });
};


export const updateDSATopic = async (
  topicId: string,
  updateData: { title?: string; image?: string },
  token: string,
  uid: string
) => {
  const response = await axios.patch(
    `${serverurl}/api/topics/update/${topicId}`,
    { ...updateData },
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

