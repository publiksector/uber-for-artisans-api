const model = require("../models/user");
const artisanModel = require('../models/artisan')
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const mailer = require("../middleware/mailer");
const Detail = require('../services/userAuthService')
const token = require('../services/userAuthService');
exports.registerArtisan = option => {
  return new Promise((resolve, reject) => {
    model
      .findOne({ email: option.email })
      .then(exists => {
        const hash = bcrypt.hashSync(option.password, 10);
        const gen = Math.floor(1000 + Math.random() * 9000);

        if (exists) {
          resolve({ success: false, message: "Sorry user already exists !!!" });
        } else {
          const userDetails = {
            firstName: option.firstName,
            lastName: option.lastName,
            address: option.address,
            email: option.email,
            phoneNumber: option.phoneNumber,
            publicId: mongoose.Types.ObjectId(),
            statusCode: gen,
            passwordToken: "",
            password: hash,
            status: false,
            userType: "artisan"
          };
          model
            .create(userDetails)
            .then(created => {
              if (created) {
                  let artisanId = created._id

                  artisanModel.create({userId:artisanId}).then(done =>{
                      if(done){
                        mailer
                        .ArtisanSignUpMail(userDetails.email)
                        .then(sent => {
                          if (sent) {
                            resolve({
                              success: true,
                              message: " registration was successfull !!!"
                            });
                          } else {
                            resolve({
                              success: false,
                              message:
                                "Error occured while trying to register  !!!"
                            });
                          }
                        });
                      }else{
                          resolve({success:false , message:'Error ecountered during signup'})
                      }
                  })
              } else {
                resolve({
                  success: false,
                  message: " registration was not successfull !!!"
                });
              }
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

//user login
exports.artisanLogin = (email , password)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({email:email}, { _id: 0, __v: 0  , }).then(user =>{
            if(user){
                if(user.status != true)reject({success:false , message:'account not veririfed !!!'})
                const comparePassword = bcrypt.compareSync(password , user.password)
                if(comparePassword){
                    Detail.getUserDetail(user , user.publicId).then(activeUser =>{
                        console.log(activeUser , 'hmmmmm')
                        token.generateToken(activeUser).then(token =>{
                            resolve({success:true , data:{activeUser , token:token },
                            message:'authentication successfull !!!'
                            })
                        }).catch(err => reject(err))
                    }).catch(err => reject(err))
                }else{
                    resolve({success:false , message:'incorrect email or password '})
                }
            }else{
                resolve({success:false , message:'user does not exist !!!'})  
            }
        }).catch(err =>{
            reject(err)
        })
    })
}
