const model = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const mailer = require("../middleware/mailer");
const secret = process.env.Secret
const jwt = require('jsonwebtoken')
const baseRepo = require('../repository/baseRepository')
const userRepo = new baseRepo(model)
const sms = require('../middleware/sms')

//user feeds in his phonenumber and country code and recieves token via sms , also this method returns a jwt token for verifying the token with that which exists in the db
exports.UserRegistrationToken = option => {
  return new Promise((resolve, reject) => {
    const gen = Math.floor(1000 + Math.random() * 9000);
    model.findOne({ phoneNumber: option.phoneNumber }).exec((err, exists) => {
      if (err) reject(err);
      if (exists) {
        getUserDetail(exists, exists.publicId).then(activeUser => {
          generateToken(activeUser).then(token => {
            resolve({
              success: true, data: token,
              message: 'please complete your registration !!!'
            })
          }).catch(err => reject(err))
        }).catch(err => reject(err))
      } else {
        const details = {
          phoneNumber: option.phoneNumber,
          statusCode: gen,
          publicId: mongoose.Types.ObjectId()
        }
        model.create(details).then(created => {
          if (created) {
            sms.sendToken(option.countryCode, option.phoneNumber, gen).then(sent => {
              if (sent) {
                getUserDetail(created, created.publicId).then(User => {
                  generateToken(User).then(token => {
                    resolve({
                      success: true, data: token,
                      message: 'proceed to verifying account registration !!!'
                    })
                  }).catch(err => reject(err))
                }).catch(err => reject(err))
              } else {
                resolve({ success: false, message: 'Error signing up user' })
              }
            }).catch(err => reject(err))
          } else {
            resolve({ success: false, message: 'Error creating user account ' })
          }
        }).catch(err => reject(err))
      }
    })
  })
};

//user is verified and the status code changes so as to make user not be able to use code again 
exports.verifyUser = (publicId, option) => {
  return new Promise((resolve, reject) => {
    model
      .findOne({ publicId: publicId })
      .then(found => {
        if (found.userType == 'client') {
          if (found.statusCode == option.statusCode) {
            model
              .findOneAndUpdate({ publicId: publicId }, { verified: true, statusCode: 1100 })
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
        } else {
          resolve({ success: false, message: 'Forbidden !!!' })
        }

      })
      .catch(err => {
        reject(err);
      });
  });
};

//signup completion which updates user details and updates his status to show his registration is complete
exports.completeUserSignup = (publicId, image, data) => {
  return new Promise((resolve, reject) => {
    const hash = bcrypt.hashSync(data.password, 10)
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: hash,
      imageUrl: image.imageUrl,
      imageID: image.imageID,
      status: true,
      active: true,
      lastLoggedIn: Date.now()
    }
    model.findOneAndUpdate({ publicId: publicId }, userData).exec((err, updated) => {
      if (err) reject(err);
      if (updated) {
        getUserDetail(updated, publicId).then(activeUser => {
          generateToken(activeUser).then(token => {
            resolve({
              success: true, data: { activeUser, token: token },
              message: 'authentication successfull !!!'
            })
          }).catch(err => reject(err))
        }).catch(err => reject(err))
      } else {
        resolve({ success: false, message: 'Error completing signup process' })
      }
    })
  })
}

//user login
exports.userLogin = (phoneNumber, password) => {
  return new Promise((resolve, reject) => {
    model.findOne({ phoneNumber: phoneNumber }, { _id: 0, __v: 0, }).then(user => {
      if (user) {
        if (user.status != true) reject({ success: false, message: 'account not veririfed !!!' })
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (comparePassword) {
          model.findOneAndUpdate({ publicId: user.publicId }, { active: true, lastLoggedIn: Date.now() }).exec((err, updated) => {
            if (err) reject(err);
            getUserDetail(user, user.publicId).then(activeUser => {
              generateToken(activeUser).then(token => {
                resolve({
                  success: true, data: { activeUser, token: token },
                  message: 'authentication successfull !!!'
                })
              }).catch(err => reject(err))
            }).catch(err => reject(err))
          })
        } else {
          resolve({ success: false, message: 'incorrect phone number or password ' })
        }
      } else {
        resolve({ success: false, message: 'user does not exist !!!' })
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//user log out method that updates the actual time a user logged out
exports.userLogOut = (publicId)=>{
  return new Promise((resolve , reject)=>{
    model.findOneAndUpdate({ publicId:publicId }, { active: false, lastLoggedIn: Date.now() }).exec((err, updated) => {
      if(err)reject(err);
      resolve({success:true , message:'user logged out successfully'});
    })
    })
}

//forgot password method that sends user verification token which expires after 5 minutes
exports.forgotPasswordToken = (option)=>{
  return new Promise((resolve , reject)=>{
    model.findOne({phoneNumber:option.phoneNumber}).exec((err , exists)=>{
      if(err)reject(err);
      if(exists){
        const gen = Math.floor(1000 + Math.random() * 9000);
        sms.sendToken(option.countryCode ,option.phoneNumber,gen).then(sent =>{
          if(sent){
            model.findOneAndUpdate({phoneNumber:option.phoneNumber} ,{statusCode:gen}).exec((err , updated)=>{
              if(err)reject(err)
              getUserDetail(exists, exists.publicId).then(User => {
                generateToken(User).then(token => {
                  resolve({
                    success: true, data: token,
                    message: 'proceed to verifying your token, this token expires in 5 minutes !!!'

                  })
                }).catch(err => reject(err))
              }).catch(err => reject(err))          
              })
          }else{
            resolve({success:false , message:'Error occured while sending token' })
          }
        }).catch(err => reject(err))
        setTimeout(resetStatusCode,300000,exists.publicId)

      }else{
        resolve({success:false , message:'User does not exists!!' })
      }
    })
  })
}

//resets user verification token after 5 mins
function resetStatusCode(publicId){
  return new Promise((resolve , reject)=>{
    const gen = Math.floor(1000 + Math.random() * 9000);
    model.findOneAndUpdate({publicId:publicId}, {statusCode:gen}).exec((err , updated)=>{
      if(err)reject(err);
      if(updated){
        resolve({success:true , message:'token has expired'})
      }else{
        resolve({success:false , message:'Error encoutered while resetting token '})
      }
    })
  })
}

//change user password to a new one he or she selected
exports.changeForgotPassword = (publicId , data)=>{
  return new Promise((resolve , reject)=>{
    model.findOne({publicId:publicId}).exec((err , result)=>{
      if(err)reject(err)
      if(result.statusCode == data.statusCode){
        const new_password = bcrypt.hashSync(data.password , 10)
        model.findOneAndUpdate({publicId:publicId},{password:new_password}).exec((err, updated)=>{
          if(err)reject(err);
          if(updated){
            resolve({success:true , message:'password successfully changed , proceed to signin'})
          }else{
            resolve({success:false , message:'error encountered while changing password'})
          }
        })
      }else{
        resolve({success:false , message:'Incorrect token inserted !!'})
      }
    })
  })
}

//get user details
function getUserDetail(user, Id) {
  return new Promise((resolve, reject) => {

    //console.log('this is user detail', user.status);
    model.findOne({ publicId: Id }, { _id: 0, __v: 0 })
      .then(data => {
        var specificUserDetail = {
          email: data.email,
          fullname: data.firstName + ' ' + data.lastName,
          phone: data.phoneNumber,
          publicId: data.publicId,
          userType: data.userType,
          imageUrl: data.imageUrl,
          lastLoggedIn: data.lastLoggedIn,
          active: data.active,
          status: data.status
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
    jwt.sign({ ...data }, secret, { expiresIn: "24hrs" }, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

exports.generateToken = generateToken;

exports.updateProfile = function (id, data) {
  return new Promise((resolve, reject) => {
    userRepo.updateByQuery({ publicId: id }, data)
      .then(updated => {
        if (updated) {
          userRepo.getById(updated._id)
            .then(user =>
              resolve({
                success: true,
                data: user,
                message: "your profiles was updated successfully"
              })
            )
            .catch(err =>
              resolve({
                success: false,
                data: err,
                message: "unable to update user Profile"
              })
            );
        }
      })
      .catch(err => {
        reject({
          success: false,
          data: err,
          message: "could not update profile"
        });
      });
  });
};

//verify user token
function verifyToken(token = "") {
  return new Promise((resolve, reject) => {
    jwt.verify(token.replace("Bearer", ""), secret, function (
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

exports.verifyToken = verifyToken