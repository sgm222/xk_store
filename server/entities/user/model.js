let MongoUtil = require("../lib/MongoUtil");

let userSechma = {
    userName: String,
    passWord: String,
    fileName: String
};
let modelName = "user";
class UserModel {
    constructor(userName, passWord, fileName) {
        this.userName = userName;
        this.passWord = passWord;
        this.fileName = fileName;
    }

    setUser(userName, passWord, fileName) {
        this.userName = userName;
        this.passWord = passWord;
        this.fileName = fileName;
    }

    createUser() {
        let userValue = {
            userName: this.userName,
            passWord: this.passWord,
            fileName: this.fileName
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
}

module.exports = UserModel;