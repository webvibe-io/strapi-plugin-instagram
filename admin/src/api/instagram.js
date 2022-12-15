import axiosInstance from '../../src/utils/axiosInstance';

const instagramRequests = {
  getTaskCount: async () => {
    const data = await axiosInstance.get(`/instagram/count`);
    return data;
  },
  getSettings: async () => {
    const data = await axiosInstance.get(`/instagram/settings`);
    return data;
  },
  setSettings: async data => {
    return await axiosInstance.post(`/instagram/settings`,
      data
    );
  },
};
export default instagramRequests;