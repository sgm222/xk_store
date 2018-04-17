
// // models
// const Goods = require('./model');
// // controllers

// const getGoods = (userId) => {
//   return new Promise((resolve, reject) => {
//     Goods.findGoodsByUserId(userId).then(
//       (models) => {
//         console.log(models);
//     });
//   }
// };
// export const getGoodsById = (goodsId) => {
//     return (dispatch, getState) => {
//       fetchGoodsById(goodsId).then(
//           (response) => {
//               return response.data;
//           }
//       ).then(
//           (json) => {
//               if (json.length !== 0) {
//                 dispatch({ type: FETCHING_GOODSDETAIL_SUCCESS, payload: json });
//               } else {
//                 dispatch({ type: FETCHING_GOODSDETAIL_FAILURE});
//               }
//           }
//       ).catch(
//         //dispatch({ type: FETCHING_USER_FAILURE })
//       )
//     }
// };

// // // userModel.findUserByName(user.userName)
// // // .then(
// // //     (models) => {
// // //         if (models !== null && models.length > 0) {
// // //             let model = models[0];
// // //             if (models[0].passWord === user.passWord) {
// // //                 req.session.user = model;
// // //                 req.session.user.passWord = null;
// // //                 return res.send(new ResponseUtil({redirect: "/"}, null));
// // //             } else {
// // //                 return res.send(new ResponseUtil(null, {errorMsg: "用户名或密码错误", errorType: 2}));
// // //             }
// // //         } else {
// // //             return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
// // //         }
// // //     }
// // // ).catch((e) => {
// // // return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
// // // });
// // module.exports = {
// //   getGoods,
// // };