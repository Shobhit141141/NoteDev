import api from '../config/api';

export const fetchTopicsData = async (uid: string) => {
  const response = await api.get(`/api/topics/all-topics`, {
    withCredentials: true,
    headers: {
      uid: uid,
    },
    params: {
      uid: uid,
    },
  });
  return response;
};

export const fetchSingleTopicData = async (id: string, uid: string) => {
  const response = await api.get(`/api/topics/topic/${id}`, {
    withCredentials: true,
    headers: {
      uid: uid,
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
  uid: string
) => {
  const response = await api.post(
    `/api/topics/create-topic`,
    { title, image },
    {
      withCredentials: true,
      headers: {
        uid: uid,
      },
      params: {
        uid: uid,
      },
    }
  );
  return response;
};

export const deleteDSATopic = async (deleteTopicId: string, uid: string) => {
  await api.delete(`/api/topics/delete-topic/${deleteTopicId}`, {
    withCredentials: true,
    headers: {
      uid: uid,
    },
    params: {
      uid: uid,
    },
  });
};

export const updateDSATopic = async (
  topicId: string,
  updateData: { title?: string; image?: string },

  uid: string
) => {
  const response = await api.patch(
    `/api/topics/update/${topicId}`,
    { ...updateData },
    {
      withCredentials: true,
      headers: {
        uid: uid,
      },
      params: {
        uid: uid,
      },
    }
  );
  return response;
};
