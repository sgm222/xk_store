import {
    FETCH_VIP_SUCCESS,
    FETCH_VIP_FAILURE,
  } from './constants';
  import {
    fetchVIP,
  } from './api';
  
  export const getVip = () => {
    return (dispatch, getState) => {
      fetchVIP().then(
        data => dispatch({ type: FETCH_VIP_SUCCESS, payload: data.data }),
        error => dispatch({ type: FETCH_VIP_FAILURE })
      );
    };
  };