const model = require("../models/user");
const artisanModel = require('../models/artisan')
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const mailer = require("../middleware/mailer");
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

