const authController = require('../controllers/userAuthController');
const router = require('express').Router();
//const _base64ToFile = require('../utility/utils').base64ToFile;
//const _cloudinaryHelper = require('../utility/utils').cloudinaryHelper;
//const _config = require('../config');
const multer = require('../middleware/multer')
const middleware = require('../middleware/authenticate')

module.exports = function(){
    const authCtrl = new authController();
    router.post('/register', authCtrl.registerUser);
    router.put('/verify', authCtrl.verifyUser);
    router.post('/authenticate', authCtrl.loginUser);
    router.put('/update', middleware.authenticate,multer.upload.single('profile'), authCtrl.updateClientProfile)


    return router;
}