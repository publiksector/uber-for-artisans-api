var authController = require('../controllers/userAuthController');
var router = require('express').Router();


module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.registerUser);
    router.put('/verify', authCtrl.verifyUser);

    return router;
}