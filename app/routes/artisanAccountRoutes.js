const artisanAccountController = require('../controllers/artisanAccountController');
const router = require('express').Router();
const middleware = require('../middleware/authenticate')

module.exports = function(){
    const artisanActCtrl = new artisanAccountController();
    router.post('/create', middleware.authenticateArtisan , artisanActCtrl.AddAccount);
    router.get('/getAccount', middleware.authenticateArtisan , artisanActCtrl.getArtisanAccount);
    return router;
}