import axiosInstance from "../../src/utils/axiosInstance";

const instagramBasicApiRequest = {
  getShortLivedToken: async (data) => {
    return await axiosInstance.post('/instagram/getShortLivedToken', data);
  },
  downloadImages: async (data) => {
    return await axiosInstance.get('/instagram/downloadImages', data);
  },
};
export default instagramBasicApiRequest;
