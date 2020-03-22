var authController = require('../controllers/artisanAuthController');
var router = require('express').Router();


module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.registerArtisan);

    return router;
}