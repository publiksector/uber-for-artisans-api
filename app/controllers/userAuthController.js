const service = require("../services/userAuthService");
const cloudinary = require('../middleware/cloudinary')

module.exports = function userAuthController() {
  this.registerUser = (req, res) => {
    service
      .UserRegistrationToken(req.body)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => res.status(500).send(err));
  };

  this.verifyUser = (req, res) => {
    service
      .verifyUser(req.auth.publicId, req.body)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => res.status(500).send(err));
  };

  this.completeClientRegistration = async (req, res) => {
    const requestDetails = {
      image: req.file != null && req.file !== undefined ? req.file.path : null
    };

    if (req.image !== null && req.file !== undefined) {
      await cloudinary.uploadToCloud(requestDetails.image).then(img => {
        requestDetails.imageUrl = img.url;
        requestDetails.imageID = img.ID;
        return requestDetails;
      });
    }
    service.completeUserSignup(req.auth.publicId, requestDetails, req.body).then(data => {
      res.status(200).send(data)
    }).catch(err => res.status(500).send(err));
  }

  this.loginUser = (req, res) => {
    service
      .userLogin(req.body.phoneNumber, req.body.password)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => res.status(500).send(err));
  };

  this.editProfileDetails = (req,res)=>{
    service.editProfileDetails(req.auth.publicId , req.body).then(data =>{
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }


  this.changePassword = (req,res)=>{
    service.changePassword(req.auth.publicId , req.body).then(data =>{
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }


  this.addAddress = (req,res)=>{
    service.addHomeAddress(req.auth.publicId , req.body).then(data =>{
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  } 

  this.updateClientProfile = async (req, res) => {
    var requestDetails = {
      image: req.file != null && req.file !== undefined ? req.file.path : null
    };
    if (req.image !== null && req.file !== undefined) {
      await cloudinary.uploadToCloud(requestDetails.image).then(img => {
        requestDetails.imageUrl = img.url;
        requestDetails.imageID = img.ID;
        return requestDetails;
      });
    }
    service
      .updateProfile(req.auth.publicId, requestDetails)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };

  this.logout = (req, res) => {
    service.userLogOut(req.auth.publicId).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  this.forgotPasswordToken = (req,res)=>{
    service.forgotPasswordToken(req.body).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  this.userProfileDetails = (req,res)=>{
    service.userProfileDetails(req.auth.publicId).then(data =>{
      res.status(200).send(data)
    }).catch(err =>{
      res.status(500).send(err);
    })
  }

  this.changeForgotPassword = (req,res)=>{
    service.changeForgotPassword(req.auth.publicId , req.body)
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }
  this.refreshToken = (req,res)=>{
    service.refreshToken(req.query.id ,)
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }
};
