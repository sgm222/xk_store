import {
    FETCHING_SHOP_SUCCESS,
    FETCHING_SHOP_FAILURE,
    DEL_SHOP_SUCCESS,
    DEL_SHOP_FAILURE,
    PASS_SHOP_SUCCESS,
    PASS_SHOP_FAILURE,
} from './constants';
import {
fetchShop,
delShop,
passShop,
delShopByUserId
} from './api';
import { onDelGoods } from '../Goods/actions'
export const getShop = () => {
return (dispatch, getState) => {
    fetchShop().then(
        (response) => {
            return response.data;
        }
    ).then(
        (json) => {
            if (json.length !== 0) {
            dispatch({ type: FETCHING_SHOP_SUCCESS, payload: json });
            } else {
            dispatch({ type: FETCHING_SHOP_FAILURE});
            }
        }
    ).catch(
    //dispatch({ type: FETCHING_USER_FAILURE })
    )
}
};
export const onDel = (shopId) => {
    return (dispatch, getState) => {
        delShop(shopId).then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        onDelGoods(shopId);
                    }
                    else {
                        // this.setState({failureOpen: true})
                    }
                }
            }
        ).catch(
        //dispatch({ type: FETCHING_USER_FAILURE })
        )
    }
};
export const onDelShop = (userId) => {
    return (dispatch, getState) => {
        delShopByUserId(userId).then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        onDelGoods(userId);
                        //window.location.href = result.redirect;
                    }
                    else {
                        // this.setState({failureOpen: true})
                    }
                }
            }
        ).catch(
        //dispatch({ type: FETCHING_USER_FAILURE })
        )
    }
};
export const onPass = (shopId) => {
    return (dispatch, getState) => {
        passShop(shopId).then(
            (response) => {
                return response.data;
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
        //dispatch({ type: FETCHING_USER_FAILURE })
        )
    }
};
