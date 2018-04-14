import {
    START_FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_FAILURE,
    SIGNIN_NAMENULL,
    SIGNIN_PASSNULL,
    SIGNIN_FAILURE
  } from './constants';

const initialUserState = {
    fetchingUser: false,
    error: null,
    userName: null,
    passWord: null,
    fileName: null,
    role: null,
    nameError: null,
    passError: null,
  };
  
  export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case FETCHING_USER_SUCCESS:
        const {
          userName,
          passWord,
          fileName,
          role,
          nameError,
          passError,
        } = action.payload;
  
        return Object.assign({}, state), {
          fetchingUser: true,
          error: null,
          userName,
          passWord,
          fileName,
          role,
          nameError,
          passError,
        };
  
      case FETCHING_USER_FAILURE:
        return Object.assign({}, initialUserState, {
          fetchingUser: false,
        });

      case SIGNIN_NAMENULL:
        return Object.assign({}, initialUserState, {
          nameError: '不能为空',
        }); 
      
      case SIGNIN_PASSNULL:
        return Object.assign({}, initialUserState, {
          passError: '不能为空',
        });
      
      case SIGNIN_FAILURE:
        console.log('signin-falure')
        return Object.assign({}, initialUserState, {
          error: '不能为不能为空',
        }); 
      
      default:
        return state;
    }
  };