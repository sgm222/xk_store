import {
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE,
    DEL_ORDER
} from './constants';
import {
    fetchOrder,
} from './api';

export const getOrder = () => {
    return (dispatch, getState) => {
        fetchOrder().then(
        data => dispatch({ type: FETCH_ORDER_SUCCESS, payload: data.data }),
        error => dispatch({ type: FETCH_ORDER_FAILURE })
        );
    };
};
export const deleteById = (orderId) => {
    return (dispatch, getState) => {
        let body = {
            "orderId": orderId
        };
        let url = "/api/order/delOrderById";
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
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        window.location.href = result.redirect;
                    }
                    else {
                        // this.setState({failureOpen: true})
                    }
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};
export const fahuo = (orderId) => {
    return (dispatch, getState) => {
        let body = {
            "orderId": orderId,
            "status": 1
        };
        let url = "/api/order/modifyOrderById";
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
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        window.location.href = result.redirect;
                    }
                    else {
                        // this.setState({failureOpen: true})
                    }
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};