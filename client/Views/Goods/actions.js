import {
  FETCH_GOODS_SUCCESS,
  FETCH_GOODS_FAILURE,
} from './constants';
import {
  fetchGoods,
} from './api';

export const getGoods = () => {
  return (dispatch, getState) => {
    fetchGoods().then(
      data => dispatch({ type: FETCH_GOODS_SUCCESS, payload: data.data }),
      error => dispatch({ type: FETCH_GOODS_FAILURE })
    );
  };
};