import {
    FETCH_SELLER_SUCCESS,
    FETCH_SELLER_FAILURE,
  } from './constants';
  import {
    fetchSeller,
  } from './api';
  
  export const getSeller = () => {
    return (dispatch, getState) => {
      fetchSeller().then(
        data => dispatch({ type: FETCH_SELLER_SUCCESS, payload: data.data }),
        error => dispatch({ type: FETCH_SELLER_FAILURE })
      );
    };
  };