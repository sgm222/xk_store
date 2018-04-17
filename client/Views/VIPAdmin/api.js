/**
 * user profile apis
 */

import axios from 'axios';

export const fetchVIP = () => {
  return axios.get(`/api/user/getVip`);
};
