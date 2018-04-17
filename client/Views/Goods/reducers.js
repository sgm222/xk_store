import {
  FETCHING_GOODS_SUCCESS,
  FETCHING_GOODS_FAILURE,
} from './constants';

const initialState = {
  fetchingGoods: false,
  goods: null,
  error: null,
};

export const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_GOODS_SUCCESS:
      return Object.assign({}, state, {
        fetchingGoods: true,
        goods: action.payload,
        error: null,
      });

    case FETCHING_GOODS_FAILURE:
      return Object.assign({}, state, {
        fetchingGoods: false,
        error: 'Unable to fetch user profile. Please check out for correct username.',
      });

    default:
      return state;
  }
};
