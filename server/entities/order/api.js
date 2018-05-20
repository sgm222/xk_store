const OrderModel = require('./model');
const ResponseUtil = require('../lib/ResponseUtil');
const request = require('request');
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
    app.post("/api/order/modifyPrice", (req, res) => {
        let orderModel = new OrderModel();
          let data = {
           price: req.body.price
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
    })
    
    app.post('/api/order/fahuo', (req,res,next) => {
        // 手机号
        let mobile=req.body.message;
        // 6位随机验证码
        let random=req.body.text;
        // 短信内容
        let text=`【小康电子商城】您购买的商品${random}已发货，请注意查收`
        // 报文请求头
        let options = {
            method:'post',
            url: 'https://sms.yunpian.com/v2/sms/single_send.json',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            form:{
                apikey:'589d8954196f63c9e7aad13527e206fd',
                mobile:mobile,
                text:text,
            }
        }
    
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
               res.send({
                   status:true,
                   message:body,
                   checkCode:random
               })
            }else if (!error && response.statusCode != 200) {
                res.send({
                    status:false,
                    message:body
                })
            }else{
                res.send({
                    status:false,
                    message:error
                })
            }
        })
    
    })
};
module.exports = orderAPI;