const ShopModel = require('./model');
const ResponseUtil = require('../lib/ResponseUtil');
const multer = require('multer');
const request = require('request');
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

const shopAPI = (app) => {
    app.get('/api/shop/getShop', (req, res) => {
        let shopModel = new ShopModel();
        if(req.session.user && req.session.user.type === '2') {
        shopModel.findShop()
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
        } else if(req.session.user && req.session.user.type === '1') {
        shopModel.findShopByUserId(req.session.user._id)
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
    app.post("/api/shop/nopass", (req, res) => {
        let shopModel = new ShopModel();
        let data = {
            statusError: req.body.ression,
            status: 1
        }
        shopModel.findShopAndUpdate(req.body.shopId, data)
        .then(
            (model) => {
            if (model !== null) {
                return res.send(new ResponseUtil({redirect: "/Shop"}, null));
            } else {
                return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
            }
            }
        ).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
        })
    });
    app.post("/api/shop/passShop/:shopId", (req, res) => {
        let shopModel = new ShopModel();
        let data = {
            status: 2
        }
        shopModel.findShopAndUpdate(req.params.shopId, data)
        .then(
            (model) => {
            if (model !== null) {
                return res.send(new ResponseUtil({redirect: "/Shop"}, null));
            } else {
                return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
            }
            }
        ).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
        })
    });
    app.post("/api/shop/delShop/:shopId",(req, res) => {
        let shopModel = new ShopModel();
        shopModel.deleteShop(req.params.shopId)
        .then(() => {
        return res.send(new ResponseUtil({redirect: "/Shop"}, null));
        }).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
        })
    });
    app.post("/api/shop/delShopByUserId/:userId",(req, res) => {
        let shopModel = new ShopModel();
        shopModel.deleteShopByUserId(req.params.userId)
        .then(() => {
        return res.send(new ResponseUtil({redirect: "/Seller"}, null));
        }).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
        })
    });
    app.get('/api/shop/getShopById/:shopId', (req, res) => {
        let shopModel = new ShopModel();
        shopModel.findShopById(req.params.shopId)
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
    app.post("/api/shop/AddShop", upload.single('avatar'), (req, res) => {
            let shop = req.body;
            let shopModel = new ShopModel(
                req.session.user._id,
                shop.name,
                0,
                0,
                '',
                shop.corporation,
                shop.tel,
                shop.idcard,
                shop.qualification,
                fileName
            );
            shopModel.createShop().then(
                (model) => {
                    return res.send(new ResponseUtil({redirect: "/Shop"}, null));
                }
            ).catch((e) => {
                console.error(e);
            });
    });
    app.post("/api/shop/ModifyShop/:shopId", upload.single('avatar'), (req, res) => {
        let shopModel = new ShopModel();
        let data = {
            name: req.body.name,
            status:0,
            corporation: req.body.corporation,
            tel: req.body.tel,
            idcard: req.body.idcard,
            qualification: req.body.qualification,
            fileName: fileName ? fileName : req.body.fileName
        }
        shopModel.findShopAndUpdate(req.params.shopId, data)
        .then(
            (model) => {
            if (model !== null) {
                return res.send(new ResponseUtil({redirect: "/Shop"}, null));
            } else {
                return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
            }
            }
        ).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
        })
    });
    app.post("/api/shop/modifyLevel",(req, res) => {
        let shopModel = new ShopModel();
        let data = {
            level: req.body.level,
        }
        shopModel.findShopAndUpdate(req.body.shopId, data)
        .then(
            (model) => {
            if (model !== null) {
                return res.send(new ResponseUtil({redirect: "/Seller"}, null));
            } else {
                return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
            }
            }
        ).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
        })
    });
};

module.exports = shopAPI;
