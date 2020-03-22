var authController = require('../controllers/artisanAuthController');
var router = require('express').Router();


module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.registerArtisan);
    router.post('/authenticate', authCtrl.artisanLogin);

    return router;
}