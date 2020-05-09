let service = require('../services/cardDetailsService');

module.exports =  function paymentDetailsService(){
    this.saveCardDetails = (req,res)=>{
        service.saveCardDetails(req.auth.publicId, req.body).then(data =>{
            res.status(200).send(data);
        }).catch(err => res.status(500).send(err));
    }

    this.getSingleCardDetails = (req,res)=>{
        service.getSingleCardDetails(req.auth.publicId , req.query.id).then(data =>{
            res.status(200).send(data);
        }).catch(err => res.status(500).send(err));
    }


    this.getAllCardDetails = (req,res)=>{
        service.getAllCardDetails(req.auth.publicId).then(data =>{
            res.status(200).send(data);
        }).catch(err => res.status(500).send(err));
    }

    this.deleteCardDetails = (req,res)=>{
        service.deleteCardDetails(req.query.id).then(data =>{
            res.status(200).send(data);
        }).catch(err => res.status(500).send(err));
    }
}