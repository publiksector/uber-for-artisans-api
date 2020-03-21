const service = require('../services/userAuthService');

module.exports = function userAuthController (){
    this.registerUser = (req,res)=>{
        service.registerUser(req.body).then(data =>{
            res.json(data)
        }).catch(err =>{
            res.json(err);
        })
    }

    this.verifyUser = (req,res)=>{
        service.verifyUser(req.body).then(data =>{
            res.json(data)
        }).catch(err =>{
            res.json(err);
        })
    }
}