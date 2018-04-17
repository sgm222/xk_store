import {
    FETCHING_GOODSDETAIL_SUCCESS,
    FETCHING_GOODSDETAIL_FAILURE,
  } from './constants';
  
  const initialState = {
    fetchingGoods: false,
    goods: null,
    error: null,
  };
  
  export const goodsDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_GOODSDETAIL_SUCCESS:
        return Object.assign({}, state, {
          fetchingGoods: true,
          goods: action.payload,
          error: null,
        });
  
      case FETCHING_GOODSDETAIL_FAILURE:
        return Object.assign({}, state, {
          fetchingGoods: false,
          error: 'Unable to fetch user profile. Please check out for correct username.',
        });
  
      default:
        return state;
    }
  };
