import {
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE,
    DEL_ORDER
  } from './constants';
  
  const initialState = {
    fetchingOrder: false,
    order: null,
    error: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDER_SUCCESS:
        return Object.assign({}, state, {
          fetchingOrder: true,
          order: action.payload,
          error: null,
        });
      case FETCH_ORDER_FAILURE:
        return Object.assign({}, state, {
          fetchingOrder: false,
          error: 'Unable to fetch ',
        });
      case DEL_ORDER:
        var id = state.order.indexOf(action.payload)
        state.order.splice(id, 1)
        return state

      default:
        return state;
    }
  };
  