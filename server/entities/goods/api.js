const GoodsModel = require('./model');
const {getGoods, getGoodsById} = require('./controller');
const ResponseUtil = require('../lib/ResponseUtil');
const multer = require('multer');
let fileName;
let storage = multer.diskStorage({
  destination: './public/build/uploadFiles/',
  filename: function (req, file, cb) {
      if(file) {
          fileName = Date.now() + '-' + file.originalname;
      } else {
          fileName = "";
      }
      cb(null, fileName);
  }
});
let upload = multer({storage: storage});

const goodsAPI = (app) => {
  app.get('/api/goods', (req, res) => {
    let goodsModel = new GoodsModel();
    if(req.session.user.type === '2') {
      goodsModel.findGoods()
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
    } else {
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
    }
  });
  app.get('/api/goods/getGoodsById/:goodsId', (req, res) => {
      let goodsModel = new GoodsModel();
      goodsModel.findGoodsById(req.params.goodsId)
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
  app.post("/api/goods/AddGoods", upload.single('avatar'), (req, res) => {
        let goods = req.body;
        let goodsModel = new GoodsModel(
          req.session.user._id,
          goods.name,
          goods.type,
          goods.price,
          goods.weight,
          0,
          goods.count,
          goods.direction,
          fileName,
          0,
          ''
        );
        goodsModel.createGoods().then(
            (model) => {
                return res.send(new ResponseUtil({redirect: "/Goods"}, null));
            }
        ).catch((e) => {
            console.error(e);
        });
  });
  app.post("/api/goods/ModifyGoods/:goodsId", upload.single('avatar'), (req, res) => {
    let goodsModel = new GoodsModel();
    let data = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      weight: req.body.weight,
      count: req.body.count,
      direction: req.body.direction,
      fileName: fileName ? fileName : req.body.fileName
    }
    goodsModel.findGoodsAndUpdate(req.params.goodsId, data)
    .then(
        (model) => {
          if (model !== null) {
            return res.send(new ResponseUtil({redirect: "/Goods"}, null));
          } else {
            return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
          }
        }
    ).catch((e) => {
      return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
    })
  });
  app.post("/api/goods/DeleteGoods",(req, res) => {
    let goodsModel = new GoodsModel();
    goodsModel.delteGoods(req.body._id)
    .then(() => {
      return res.send(new ResponseUtil({redirect: "/Goods"}, null));
    }).catch((e) => {
      return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
    })
  });
  app.post("/api/goods/nopass", (req, res) => {
    let goodsModel = new GoodsModel();
    let data = {
        statusError: req.body.ression,
        status: 1
    }
    goodsModel.findGoodsAndUpdate(req.body.goodsId, data)
    .then(
        (model) => {
        if (model !== null) {
            return res.send(new ResponseUtil({redirect: "/Goods"}, null));
        } else {
            return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
        }
        }
    ).catch((e) => {
    return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
    })
  });
  app.post("/api/goods/passGoods/:goodsId", (req, res) => {
      let goodsModel = new GoodsModel();
      let data = {
          status: 2
      }
      goodsModel.findGoodsAndUpdate(req.params.goodsId, data)
      .then(
          (model) => {
          if (model !== null) {
              return res.send(new ResponseUtil({redirect: "/Goods"}, null));
          } else {
              return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
          }
          }
      ).catch((e) => {
      return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
      })
  });
  app.post("/api/goods/delGoodsByShopId/:shopId",(req, res) => {
    let goodsModel = new GoodsModel();
    goodsModel.delteGoodsByShopId(req.params.shopId)
    .then(() => {
    return res.send(new ResponseUtil({redirect: "/Seller"}, null));
    }).catch((e) => {
    return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
    })
});
};

module.exports = goodsAPI;
