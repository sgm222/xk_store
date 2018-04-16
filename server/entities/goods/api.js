const GoodsModel = require('./model');
const getGoods = require('./controller').getGoods;
const ResponseUtil = require('../lib/ResponseUtil');
const goodsAPI = (app) => {
  app.get('/api/goods', (req, res) => {
    let goodsModel = new GoodsModel();
    goodsModel.findGoodsByUserId(req.session.user._id)
    .then(
        (models) => {
          if (models !== null && models.length > 0) {
            return res.send(new ResponseUtil({result: models}, null));
          } else {
            return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
          }
        }
    ).catch((e) => {
      return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
    })
  });
//   app.post("/api/user/SignIn", new LoginCheck().ifLoginReturn,
//   (req, res) => {
//       let user = req.body;
//       let userModel = new UserModel();
//       userModel.findUserByName(user.userName)
//           .then(
//               (models) => {
//                   if (models !== null && models.length > 0) {
//                       let model = models[0];
//                       if (models[0].passWord === user.passWord) {
//                           req.session.user = model;
//                           req.session.user.passWord = null;
//                           return res.send(new ResponseUtil({redirect: "/"}, null));
//                       } else {
//                           return res.send(new ResponseUtil(null, {errorMsg: "用户名或密码错误", errorType: 2}));
//                       }
//                   } else {
//                       return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
//                   }
//               }
//           ).catch((e) => {
//           return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
//       });
//   }
// );
  app.post("/api/goods/AddGoods",(req, res) => {
        let goods = req.body;
        console.log('ewew');
        console.log(goods);
        let goodsModel = new GoodsModel(
          req.session.user._id,
          goods.name,
          goods.type,
          goods.price,
          goods.weight,
          goods.salecount,
          goods.count,
          goods.direction
        );
        goodsModel.createGoods().then(
            (model) => {
                return res.send(new ResponseUtil({redirect: "/Goods"}, null));
            }
        ).catch((e) => {
            console.error(e);
        });
    }
  );
};

module.exports = goodsAPI;
