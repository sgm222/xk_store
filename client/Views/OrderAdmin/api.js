import axios from 'axios';

export const fetchOrder = () => {
  return axios.get(`/api/order/getOrder`);
};
