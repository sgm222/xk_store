import {
  FETCHING_GOODS_SUCCESS,
  FETCHING_GOODS_FAILURE,
  FETCHING_GOODSDETAIL_SUCCESS,
  FETCHING_GOODSDETAIL_FAILURE,
} from './constants';
import {
  fetchGoods,
  fetchGoodsById
} from './api';

export const getGoods = () => {
  return (dispatch, getState) => {
    fetchGoods().then(
        (response) => {
            return response.data;
        }
    ).then(
        (json) => {
            if (json.length !== 0) {
              dispatch({ type: FETCHING_GOODS_SUCCESS, payload: json });
            } else {
              dispatch({ type: FETCHING_GOODS_FAILURE});
            }
        }
    ).catch(
      //dispatch({ type: FETCHING_USER_FAILURE })
    )
  }
};
export const getGoodsById = (goodsId) => {
    return (dispatch, getState) => {
      fetchGoodsById(goodsId).then(
          (response) => {
              return response.data;
          }
      ).then(
          (json) => {
              if (json.length !== 0) {
                dispatch({ type: FETCHING_GOODSDETAIL_SUCCESS, payload: json });
              } else {
                dispatch({ type: FETCHING_GOODSDETAIL_FAILURE});
              }
          }
      ).catch(
        //dispatch({ type: FETCHING_USER_FAILURE })
      )
    }
};
