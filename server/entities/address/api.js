const AddressModel = require('./model');
const { getAddress, getAddressById } = require('./controller');
const ResponseUtil = require('../lib/ResponseUtil');
const addressAPI = (app) => {
  app.get('/api/address/getAddress', (req, res) => {
    let addressModel = new AddressModel();
    addressModel.findAddress().then(
        result => { console.log(result); res.send(result); },
        error => { res.send({error}); }
        );
  });
  app.post("/api/address/Modifyaddress/:addressId", (req, res) => {
    let addressModel = new AddressModel();
      let data = {
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address
      }
      addressModel.findAddressAndUpdate(req.params.addressId, data)
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

module.exports = addressAPI;