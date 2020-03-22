const model = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const mailer = require("../middleware/mailer");
const secret = process.env.Secret
const jwt = require('jsonwebtoken')

//register user
exports.registerUser = option => {
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
            userType: "client"
          };
          model
            .create(userDetails)
            .then(created => {
              if (created) {
                mailer
                  .SignUpMail(userDetails.email, userDetails.statusCode)
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

//verify user 
exports.verifyUser = option => {
  return new Promise((resolve, reject) => {
    model
      .findOne({ email: option.email })
      .then(found => {
          if(found.status !== 'client'){
            if (found.statusCode == option.statusCode) {
                model
                  .findOneAndUpdate({ email: option.email }, { status: true })
                  .then(updated => {
                    if (updated) {
                      resolve({
                        success: true,
                        message: "account verification completed !!!"
                      });
                    } else {
                      resolve({
                        success: false,
                        message: "account verification failed !!!"
                      });
                    }
                  })
                  .catch(err => reject(err));
              } else {
                resolve({
                  success: false,
                  message: "invalid email or veririfcation code "
                });
              }
          }else{
              resolve({success:false , message:'Forbidden !!!'})
          }
     
      })
      .catch(err => {
        reject(err);
      });
  });
};

//user login
exports.userLogin = (email , password)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({email:email}, { _id: 0, __v: 0  , }).then(user =>{
            if(user){
                if(user.status != true)reject({success:false , message:'account not veririfed !!!'})
                const comparePassword = bcrypt.compareSync(password , user.password)
                if(comparePassword){
                    getUserDetail(user , user.publicId).then(activeUser =>{
                        console.log(activeUser , 'hmmmmm')
                        generateToken(activeUser).then(token =>{
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

//get user details
function getUserDetail(user, Id) {
    return new Promise((resolve, reject) => {

      //console.log('this is user detail', user.status);
      model.findOne({publicId: Id }, { _id: 0, __v: 0 })
        .then(data => {
          var specificUserDetail = {
            email: user.email,
            fullname: user.firstName +' '+ user.lastName, 
            phone: user.phoneNumber,
            publicId: user.publicId,
            userType: user.userType,
            imageUrl:user.imageUrl,
            status:user.status
          };
          resolve(specificUserDetail);
        })
        .catch(error => reject(error));
    });
  }
  exports.getUserDetail = getUserDetail
  
  //generate token
  function generateToken(data = {}) {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...data }, secret, { expiresIn: "24hrs" }, function(err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  
  exports.generateToken = generateToken;
  
  //verify user token
  function verifyToken(token = "") {
    return new Promise((resolve, reject) => {
      jwt.verify(token.replace("Bearer", ""), secret, function(
        err,
        decodedToken
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    });
  }