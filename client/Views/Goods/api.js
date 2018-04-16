/**
 * user profile apis
 */

import axios from 'axios';

export const fetchGoods = () => {
  return axios.get(`/api/goods`);
};
