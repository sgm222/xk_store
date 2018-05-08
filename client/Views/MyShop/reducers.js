import {
    FETCHING_SHOP_SUCCESS,
    FETCHING_SHOP_FAILURE,
    DEL_SHOP_SUCCESS,
    DEL_SHOP_FAILURE,
    PASS_SHOP_SUCCESS,
    PASS_SHOP_FAILURE,
  } from './constants';
  
  const initialState = {
    fetchingShop: false,
    shop: null,
    error: null,
  };
  
export const shopReducer = (state = initialState, action) => {
switch (action.type) {
    case FETCHING_SHOP_SUCCESS:
    return Object.assign({}, state, {
        fetchingShop: true,
        shop: action.payload,
        error: null,
    });

    case FETCHING_SHOP_FAILURE:
    return Object.assign({}, state, {
        fetchingShop: false,
        error: 'Unable to fetch',
    });

    case PASS_SHOP_SUCCESS:
    return Object.assign({}, state, {
        fetchingShop: true,
        shop: action.payload,
        error: null,
    });

    case DEL_SHOP_SUCCESS:
        var id = state.shop.indexOf(action.payload)
        state.shop.splice(id, 1)
        return state
    default:
    return state;
}
};
