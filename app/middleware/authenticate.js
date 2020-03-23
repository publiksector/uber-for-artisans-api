const authVerify = require('../services/userAuthService')
const model = require('../models/user')
exports.authenticate = function(req,res,next){
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(token){
        authVerify.verifyToken(token).then(decode =>{
            model.findOne({publicId:decode.publicId}).then(data =>{
                if(data == null){
                    res.status(401).send({ success: false, message: "User does not exist" });
                }else{
                    req.auth ={
                        publicId: data.publicId,
                        userType:data.userType,
                        status:data.status,
                        email: data.email,
                        firstName: data.firstName,
                        Id: data._id,
                    }
                    res.locals.response = { data: decode, message: "", success: true };
                    next();
                }
            })
        }).catch(err => {res.status(401).send({success: false, message: "Invalid token", data: err})})
    }else{
        res.status(401).send({success:false , message:'No token Provided !!!'})
    }
}