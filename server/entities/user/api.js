const passport = require('passport');
// const { signIn, signUp } = require('./controller');
const getFullProfile = require('./controller').getFullProfile;
const multer = require('multer');
const ResponseUtil = require('../lib/ResponseUtil');
const LoginCheck = require('./LoginCheck');
const UserModel = require('./model');

let storage = multer.diskStorage({
    destination: './public/build/uploadFiles/',
    filename: function (req, file, cb) {
        console.log("fileName=" + file.originalname);
        fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
});
// let upload = multer({dest: 'uploads/'});
let upload = multer({storage: storage});
let fileName;

/**
 * user apis
 */
const userAPI = (app) => {

    app.get('/api/user/getUser', (req, res) => {
        let hasLogin = new LoginCheck().checkLogin(req, res);
        res.json(
            new ResponseUtil({
                hasLogin: hasLogin,
                user: req.session.user
        }, null));
    });

    app.post("/api/user/SignUp", new LoginCheck().ifLoginReturn,
        upload.single('avatar'),
        new LoginCheck().userNameHasOccupied,
        (req, res) => {
            let user = req.body;
            let userModel = new UserModel(user.userName, user.passWord, fileName);
            userModel.createUser().then(
                (model) => {
                    delete user.passWord;
                    req.session.user = model;
                    req.session.user.passWord = null;
                    // 跳转到首页
                    return res.send(new ResponseUtil({redirect: "/"}, null));
                }
            ).catch((e) => {
                console.error(e);
            });
        }
    );

    app.post("/api/user/SignIn", new LoginCheck().ifLoginReturn,
        (req, res) => {
            let user = req.body;
            let userModel = new UserModel();
            userModel.findUserByName(user.userName)
                .then(
                    (models) => {
                        if (models !== null && models.length > 0) {
                            let model = models[0];
                            if (models[0].passWord === user.passWord) {
                                req.session.user = model;
                                req.session.user.passWord = null;
                                return res.send(new ResponseUtil({redirect: "/"}, null));
                            } else {
                                return res.send(new ResponseUtil(null, {errorMsg: "用户名或密码错误", errorType: 2}));
                            }
                        } else {
                            return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
                        }
                    }
                ).catch((e) => {
                return res.send(new ResponseUtil(null, {errorMsg: "没有此用户", errorType: 1}));
            });
        }
    );

    app.post("/api/user/SignOut", (req, res) => {
        req.session.user = null;
        req.flash('success', '登出成功');
        return res.json({redirect: "/"});
    });
};

module.exports = userAPI;
