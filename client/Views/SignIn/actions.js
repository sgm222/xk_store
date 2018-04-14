import {
    START_FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_FAILURE,
    SIGNIN_NAMENULL,
    SIGNIN_PASSNULL,
    SIGNIN_FAILURE
  } from './constants';
import {
    fetchUser,
} from './api';

export const getUser = () => {
  return (dispatch, getState) => {
    console.log('return getuser');
    fetchUser().then(
        (response) => {
            return response.data.result;
        }
    ).then(
        (json) => {
            if (json) {
              if (!json.hasLogin) dispatch({ type: FETCHING_USER_FAILURE });
              else dispatch({ type: FETCHING_USER_SUCCESS, payload: json.user });
            }
        }
    ).catch(
      dispatch({ type: FETCHING_USER_FAILURE })
    )
  }
};

export const fetchSignIn = (body) => {
        let url = "/api/user/SignIn";
        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                console.log(JSON.stringify(json));
                if (json.result) {
                    if (json.result.redirect) {
                        //window.location = json.result.redirect;
                    }
                } else if (json.error) {
                    dispatch(SIGNIN_FAILURE);
                }
            }
        ).catch(
            dispatch(SIGNIN_FAILURE)
        )
  };
