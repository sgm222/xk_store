
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
// // userModel.findUserByName(user.userName)
// // .then(
// //     (models) => {
// //         if (models !== null && models.length > 0) {
// //             let model = models[0];
// //             if (models[0].passWord === user.passWord) {
// //                 req.session.user = model;
// //                 req.session.user.passWord = null;
// //                 return res.send(new ResponseUtil({redirect: "/"}, null));
// //             } else {
// //                 return res.send(new ResponseUtil(null, {errorMsg: "用户名或密码错误", errorType: 2}));
// //             }
// //         } else {
// //             return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
// //         }
// //     }
// // ).catch((e) => {
// // return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
// // });
// module.exports = {
//   getGoods,
// };