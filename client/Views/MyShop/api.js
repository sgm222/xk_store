import axios from 'axios';

export const fetchShop = () => {
  return axios.get(`/api/shop/getShop`);
};
export const delShop = (shopId) => {
    return axios.post(`/api/shop/delShop/${shopId}`);
};
export const delShopByUserId = (userId) => {
    return axios.post(`/api/shop/delShopByUserId/${userId}`);
};
export const passShop = (shopId) => {
    return axios.post(`/api/shop/passShop/${shopId}`);
};
export const fetchShopById = (shopId) => {
    return axios.get(`/api/shop/getShopById/${shopId}`);
};