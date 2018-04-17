let MongoUtil = require("../lib/MongoUtil");

let userSechma = {
    userName: String,
    passWord: String,
    fileName: String,
    type: String
};
let modelName = "user";
class UserModel {
    constructor(userName, passWord, fileName, type) {
        this.userName = userName;
        this.passWord = passWord;
        this.fileName = fileName;
        this.type = type;
    }

    setUser(userName, passWord, fileName, type) {
        this.userName = userName;
        this.passWord = passWord;
        this.fileName = fileName;
        this.type = type;
    }

    createUser() {
        let userValue = {
            userName: this.userName,
            passWord: this.passWord,
            fileName: this.fileName,
            type: this.type
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
}

module.exports = UserModel;