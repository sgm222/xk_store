import axios from 'axios';

export const fetchForums = (forum_id) => {
  return axios.get('/api/forum');
};

export const fetchUser = () => {
  return axios.get('/api/user/getUser', {credentials: 'include'});
};

export const fetchSignIn = (body) => {
  return axios.post('/api/user/SignIn', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
};