const cardDetailsController = require('../controllers/cardDetailsController');
const router = require('express').Router();
const middleware = require('../middleware/authenticate')

module.exports = function(){
    const cardCtrl = new cardDetailsController();
    router.post('/create',middleware.authenticate, cardCtrl.saveCardDetails);
    router.get('/single_card',middleware.authenticate, cardCtrl.getSingleCardDetails);
    router.get('/card_details',middleware.authenticate, cardCtrl.getAllCardDetails);
    router.delete('/delete_card',middleware.authenticate, cardCtrl.deleteCardDetails);
    return router;
}