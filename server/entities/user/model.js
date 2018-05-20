let MongoUtil = require("../lib/MongoUtil");

let userSechma = {
    userName: String,
    passWord: String,
    fileName: String,
    type: String,
    level: Number,
};
let modelName = "user";
class UserModel {
    constructor(userName, passWord, fileName, type, level) {
        this.userName = userName;
        this.passWord = passWord;
        this.fileName = fileName;
        this.type = type;
        this.level = level;
    }

    setUser(userName, passWord, fileName, type, level) {
        this.userName = userName;
        this.passWord = passWord;
        this.fileName = fileName;
        this.type = type;
        this.level = level;
    }

    createUser() {
        let userValue = {
            userName: this.userName,
            passWord: this.passWord,
            fileName: this.fileName,
            type: this.type,
            level: this.level,
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, userSechma, userValue);
    }

    findUserByName(userName) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, userSechma, {userName, userName});
    }

    findUserById(_id) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, userSechma, {_id, _id});
    }
    findUserByType(type) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, userSechma, {type, type});
    }
    deleteUser(id) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.deleteModel(modelName, userSechma, id);
    }
    findUserAndUpdate(id, data) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelAndUpdateByKeyMap(modelName, userSechma, id, data);
      }
}

module.exports = UserModel;