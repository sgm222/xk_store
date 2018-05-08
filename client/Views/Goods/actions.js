import {
  FETCHING_GOODS_SUCCESS,
  FETCHING_GOODS_FAILURE,
  FETCHING_GOODSDETAIL_SUCCESS,
  FETCHING_GOODSDETAIL_FAILURE,
} from './constants';
import {
  fetchGoods,
  fetchGoodsById,
  passGoods,
  delGoodsByShopId
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
export const getGoodsById = (goodsId = '') => {
    return (dispatch, getState) => {
      if(goodsId === '') {
        dispatch({ type: FETCHING_GOODSDETAIL_FAILURE});
      } else {
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
          dispatch({ type: FETCHING_GOODSDETAIL_FAILURE})
        )
      }
    }
};
export const onPass = (goodsId) => {
  return (dispatch, getState) => {
      passGoods(goodsId).then(
          (response) => {
              return response.data;
          }
      ).then(
          (json) => {
              if (json.result) {
                  let result=json.result;
                  if (result.redirect) {
                      window.location.href = result.redirect;
                  }
                  else {
                      // this.setState({failureOpen: true})
                  }
              }
          }
      ).catch(
      //dispatch({ type: FETCHING_USER_FAILURE })
      )
  }
};
export const onDelGoods = (shopId) => {
    delGoodsByShopId(shopId).then(
        (response) => {
            return response.data;
        }
    ).then(
        (json) => {
            if (json.result) {
                let result=json.result;
                if (result.redirect) {
                    window.location.href = result.redirect;
                }
                else {
                    // this.setState({failureOpen: true})
                }
            }
        }
    ).catch(
    //dispatch({ type: FETCHING_USER_FAILURE })
    )
};

