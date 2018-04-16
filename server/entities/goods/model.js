/**
 * goods model
 */
let MongoUtil = require("../lib/MongoUtil");
let goodsSechma = {
  userId: String,
  name: String,
  type: Number,
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

    setGoods(userId, name, type, price, weight, salecount, count, direction) {
      this.userId = userId;
      this.name = name;
      this.type = type;
      this.price = price;
      this.weight = weight;
      this.salecount = salecount;
      this.count = count;
      this.direction = direction;
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

    findGoodsByUserId(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, goodsSechma, {userId, userId});
    }

    findUserByType(type) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, goodsSechma, {type, type});
    }
}

module.exports = GoodsModel;