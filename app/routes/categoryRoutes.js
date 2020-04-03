const catController = require('../controllers/categoryController');
const router = require('express').Router();
const multer = require('../middleware/multer')
const middleware = require('../middleware/authenticate')

module.exports = function(){
    const catCtrl = new catController();
    router.post('/create' , multer.upload.any(), catCtrl.create)

    return router;
}