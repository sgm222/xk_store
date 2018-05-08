import {
    FETCH_SELLER_SUCCESS,
    FETCH_SELLER_FAILURE,
  } from './constants';
  
  const initialState = {
    fetchingSeller: false,
    seller: null,
    error: null,
  };
  
  export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SELLER_SUCCESS:
        return Object.assign({}, state, {
          fetchingSeller: true,
          seller: action.payload,
          error: null,
        });
  
      case FETCH_SELLER_FAILURE:
        return Object.assign({}, state, {
          fetchingSeller: false,
          error: 'Unable to fetch',
        });
  
      default:
        return state;
    }
  };
  