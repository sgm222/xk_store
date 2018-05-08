const OrderModel = require('./model');
const ResponseUtil = require('../lib/ResponseUtil');
const orderAPI = (app) => {
    app.get('/api/order/getOrder', (req, res) => {
        let orderModel = new OrderModel();
        if(req.session.user) {
            if(req.session.user.type === '2') {
                orderModel.findOrder().then(
                    result => { res.send(result); },
                    error => { res.send({error}); }
                );
            } else {
                orderModel.findOrderByUserId(req.session.user._id).then(
                    result => { res.send(result); },
                    error => { res.send({error}); }
                );
            }
        }
    });
    app.post("/api/order/delOrderById", (req, res) => {
        let orderModel = new OrderModel();
        orderModel.deleteOrderById(req.body.orderId)
        .then(
            (model) => {
                if(model.result.ok === 1){
                    return res.send(new ResponseUtil({redirect: "/Order"}, null));
                } else {
                    return res.send(new ResponseUtil(null, {errorMsg: "删除失败"}));
                }
            }
        ).catch((e) => {
            console.error('error');
        });
    });
    app.post("/api/order/modifyOrderById", (req, res) => {
        let orderModel = new OrderModel();
          let data = {
           status: req.body.status
          }
          orderModel.findOrderAndUpdate(req.body.orderId, data)
          .then(
              (model) => {
                if (model !== null) {
                  return res.send(new ResponseUtil({redirect: "/Order"}, null));
                } else {
                  return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
                }
              }
          ).catch((e) => {
            return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
          })
    });
};
module.exports = orderAPI;