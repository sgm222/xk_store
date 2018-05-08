let MongoUtil = require("../lib/MongoUtil");
let orderSechma = {
  userId: String,
  time: String,
  goodsId: Array,
  shopsId: Array,
  addressId: String,
  price: String,
  status: Number
};
let modelName = "order";
class OrderModel {
    constructor(userId, time, goodsId, shopsId, addressId, price, status) {
      this.userId = userId;
      this.time = time;
      this.goodsId = goodsId;
      this.shopsId = shopsId;
      this.addressId = addressId;
      this.price = price;
      this.status = status;
    }

    createOrder() {
        let orderValue = {
          userId: this.userId,
          time: this.time,
          goodsId: this.goodsId,
          shopsId: this.shopsId,
          addressId:this.addressId,
          price:this.price,
          status:this.status
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, orderSechma, orderValue);
    }
    findOrder() {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModel(modelName, orderSechma);
    }
    findOrderByUserId(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, orderSechma, {shopsId: userId});
    }
    findOrderAndUpdate(id, data) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelAndUpdateByKeyMap(modelName, orderSechma, id, data);
    }
    deleteOrderById(_id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.deleteModelByKeyMap(modelName, orderSechma, {_id: _id});
  }
}

module.exports = OrderModel;
