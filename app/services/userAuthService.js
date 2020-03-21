const model = require('../models/user');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const mailer = require('../middleware/mailer');
exports.registerUser = (option)=>{

return new Promise((resolve , reject)=>{
        model.findOne({email:option.email}).then(exists =>{
            const hash = bcrypt.hashSync(option.password , 10)
            const gen = Math.floor(1000 + Math.random() * 9000);

            if(exists){
                resolve({success:false , message:'Sorry user already exists !!!'})
            }else{
                const userDetails = {
                    firstName:option.firstName,
                    lastName:option.lastName,
                    address:option.address,
                    email:option.email,
                    phoneNumber:option.phoneNumber,
                    publicId:mongoose.Types.ObjectId(),
                    statusCode:gen ,
                    passwordToken:'',
                    password:hash ,
                    status: false,
                    userType:'client',
                }
                model.create(userDetails).then(created =>{
                    if(created){
                        mailer.SignUpMail(userDetails.email ,userDetails.statusCode).then(sent =>{
                            if(sent){
                                resolve({success:true , message:'user registration was successfull !!!'})
                            }else{
                                resolve({success:false , message:'Error occured while trying to register user !!!'})
                            }
                        })
                    }else{
                        resolve({success:false , message:'user registration was not successfull !!!'})
                    }
                }).catch(err =>{
                    reject(err);
                })
            }
        }).catch(err =>{
            reject(err);
        })
 
})
}

exports.verifyUser = (option)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({email:option.email}).then(found =>{
            if(found.statusCode == option.statusCode){
                model.findOneAndUpdate({email:option.email},{status:true}).then(updated =>{
                    if(updated){
                        resolve({success:true , message:'account verification completed !!!'})
                    }else{
                        resolve({success:false , message:'account verification failed !!!'})
                    }
                }).catch(err => reject(err));
            }else{
                resolve({success:false , message:'invalid email or veririfcation code '})
            }
        }).catch(err =>{
            reject(err);
        })
    })
}