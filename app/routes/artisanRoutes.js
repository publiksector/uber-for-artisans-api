const authController = require('../controllers/artisanAuthController');
const router = require('express').Router();
const middleware = require('../middleware/authenticate')

module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.registerArtisan);
    router.post('/verify',middleware.authenticateArtisan , authCtrl.verifyArtisan )
    router.put('/completeSignup',middleware.authenticateArtisan , authCtrl.completeArtisanSignup )
    router.post('/authenticate', authCtrl.artisanLogin);

    return router;
}