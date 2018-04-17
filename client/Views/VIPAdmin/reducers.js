import {
    FETCH_VIP_SUCCESS,
    FETCH_VIP_FAILURE,
  } from './constants';
  
  const initialState = {
    fetchingVIP: false,
    vips: null,
    error: null,
  };
  
  export const vipsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_VIP_SUCCESS:
        return Object.assign({}, state, {
          fetchingVIP: true,
          vips: action.payload,
          error: null,
        });
  
      case FETCH_VIP_FAILURE:
        return Object.assign({}, state, {
          fetchingVIP: false,
          error: 'Unable to fetch user profile. Please check out for correct username.',
        });
  
      default:
        return state;
    }
  };
  