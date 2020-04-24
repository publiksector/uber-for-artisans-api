const catController = require('../controllers/categoryController');
const router = require('express').Router();
const multer = require('../middleware/multer')
const middleware = require('../middleware/authenticate')

module.exports = function(){
    const catCtrl = new catController();
    router.post('/create' , multer.upload.any(), catCtrl.create)
    router.post('/',  catCtrl.getAllCategories)
    router.get('/single_category',  catCtrl.getCategoryById)
    router.put('/update', multer.upload.any(), catCtrl.update)
    router.delete('/', catCtrl.deleteCategory)

    return router;
}