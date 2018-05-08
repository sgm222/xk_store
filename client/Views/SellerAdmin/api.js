import axios from 'axios';

export const fetchSeller = () => {
  return axios.get(`/api/user/getSeller`);
};
