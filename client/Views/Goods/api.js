import axios from 'axios';

export const fetchGoods = () => {
  return axios.get(`/api/goods`);
};
export const fetchGoodsById = (goodsId) => {
  return axios.get(`/api/goods/getGoodsById/${goodsId}`);
};
export const passGoods = (goodsId) => {
  return axios.post(`/api/goods/passGoods/${goodsId}`);
};
export const delGoodsByShopId = (shopId) => {
  return axios.post(`/api/goods/delGoodsByShopId/${shopId}`);
};