let MongoUtil = require("../lib/MongoUtil");
let shopSechma = {
  userId: String,
  name: String,
  status: Number,
  level : Number,
  statusError: String,
  corporation: String ,
  tel: String,
  idcard: String,
  qualification: String,
  fileName: String
};
let modelName = "shop";
class ShopModel {
    constructor(userId, name, status, level, statusError, corporation, tel, idcard, qualification, fileName) {
      this.userId = userId;
      this.name = name;
      this.status = status;
      this.level = level;
      this.statusError = statusError;
      this.corporation = corporation;
      this.tel = tel;
      this.idcard = idcard;
      this.qualification = qualification;
      this.fileName = fileName;
    }

    createShop() {
        let shopValue = {
          userId: this.userId,
          name: this.name,
          status: this.status,
          level: this.level,
          statusError: this.statusError,
          corporation:this.corporation ,
          tel:this.tel,
          idcard:this.idcard,
          qualification:this.qualification,
          fileName:this.fileName
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, shopSechma, shopValue);
    }
    findShop() {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, shopSechma);
    }
    findShopByUserId(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, shopSechma, {userId, userId});
    }
    findShopAndUpdate(id, data) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelAndUpdateByKeyMap(modelName, shopSechma, id, data);
    }
    findShopById(_id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, shopSechma, {_id, _id});
    }
    deleteShop(id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.deleteModel(modelName, shopSechma, id);
    }
    deleteShopByUserId(id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.deleteModelByKeyMap(modelName, shopSechma, {userId: id});
    }
}

module.exports = ShopModel;