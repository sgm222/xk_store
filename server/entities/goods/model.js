/**
 * goods model
 */
let MongoUtil = require("../lib/MongoUtil");
let goodsSechma = {
  userId: String,
  name: String,
  type: String ,
  price: String,
  weight: String,
  salecount: Number,
  count: Number,
  direction: String
};
let modelName = "goods";
class GoodsModel {
    constructor(userId, name, type, price, weight, salecount, count, direction) {
      this.userId = userId;
      this.name = name;
      this.type = type;
      this.price = price;
      this.weight = weight;
      this.salecount = salecount;
      this.count = count;
      this.direction = direction;
    }

    setGoods(model) {
      this.userId = model.userId;
      this.name = model.name;
      this.type = model.type;
      this.price = model.price;
      this.weight = model.weight;
      this.salecount = model.salecount;
      this.count = model.count;
      this.direction = model.direction;
    }

    createGoods() {
        let goodsValue = {
          userId: this.userId,
          name: this.name,
          type: this.type,
          price:this.price ,
          weight:this.weight,
          salecount:this.salecount,
          count:this.count,
          direction:this.direction
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, goodsSechma, goodsValue);
    }
    findGoods() {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, goodsSechma);
    }
    findGoodsByUserId(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, goodsSechma, {userId, userId});
    }
    findGoodsById(_id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, goodsSechma, {_id, _id});
    }
    findUserByType(type) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, goodsSechma, {type, type});
    }
    findGoodsAndUpdate(id, data) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelAndUpdateByKeyMap(modelName, goodsSechma, id, data);
    }
    delteGoods(id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.deleteModel(modelName, goodsSechma, id);
    }
}

module.exports = GoodsModel;