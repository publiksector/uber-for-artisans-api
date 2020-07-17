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
    router.put('/verify', middleware.authenticate , authCtrl.verifyUser);
    router.put('/complete_signup', middleware.authenticate, multer.upload.single('profile'), authCtrl.completeClientRegistration)
    router.post('/authenticate', authCtrl.loginUser);
    router.put('/update', middleware.authenticate,multer.upload.single('profile'), authCtrl.updateClientProfile)
    router.post('/logout', middleware.authenticate , authCtrl.logout)
    router.post('/forgotpassword_token', authCtrl.forgotPasswordToken)
    router.post('/change_forgot_password', middleware.authenticate , authCtrl.changeForgotPassword)
    router.put('/new_password', middleware.authenticate , authCtrl.changePassword)
    router.get('/user_profile', middleware.authenticate , authCtrl.userProfileDetails);
    router.put('/edit_user_profile', middleware.authenticate, authCtrl.editProfileDetails)
    router.put('/add_home_address', middleware.authenticate , authCtrl.addAddress)
    return router;
}