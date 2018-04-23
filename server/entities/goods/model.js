/**
 * goods model
 */
let MongoUtil = require("../lib/MongoUtil");
let goodsSechma = {
  shopId: String,
  name: String,
  type: String ,
  price: String,
  weight: String,
  salecount: Number,
  count: Number,
  direction: String,
  fileName: String
};
let modelName = "goods";
class GoodsModel {
    constructor(shopId, name, type, price, weight, salecount, count, direction, fileName) {
      this.shopId = shopId;
      this.name = name;
      this.type = type;
      this.price = price;
      this.weight = weight;
      this.salecount = salecount;
      this.count = count;
      this.direction = direction;
      this.fileName = fileName;
    }

    setGoods(model) {
      this.shopId = model.shopId;
      this.name = model.name;
      this.type = model.type;
      this.price = model.price;
      this.weight = model.weight;
      this.salecount = model.salecount;
      this.count = model.count;
      this.direction = model.direction;
      this.fileName = model.fileName;
    }

    createGoods() {
        let goodsValue = {
          shopId: this.shopId,
          name: this.name,
          type: this.type,
          price:this.price ,
          weight:this.weight,
          salecount:this.salecount,
          count:this.count,
          direction:this.direction,
          fileName:this.fileName
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, goodsSechma, goodsValue);
    }
    findGoods() {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, goodsSechma);
    }
    findGoodsByUserId(shopId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, goodsSechma, {shopId, shopId});
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