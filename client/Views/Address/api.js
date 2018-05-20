import axios from 'axios';

export const fetchAddress = () => {
  return axios.get(`/api/address/getAddress`);
};