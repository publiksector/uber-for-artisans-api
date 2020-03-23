const service = require("../services/userAuthService");
const cloudinary = require('../middleware/cloudinary')
module.exports = function userAuthController() {
  this.registerUser = (req, res) => {
    service
      .registerUser(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };

  this.verifyUser = (req, res) => {
    service
      .verifyUser(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };

  this.loginUser = (req, res) => {

    service
      .userLogin(req.body.email ,req.body.password)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };

  this.updateClientProfile = async (req, res) => {
    console.log("checking file content", req.file );
    var requestDetails = {
      image: req.file != null && req.file !== undefined ? req.file.path : null
    };

    console.log("file detail recieved", requestDetails.image);
    if (req.image !== null && req.file !== undefined) {
      await cloudinary.uploadToCloud(requestDetails.image).then(img => {
        console.log("Cloudinary details recieved", img.url);
        requestDetails.imageUrl = img.url;
        requestDetails.imageID = img.ID;
        return requestDetails;
      });
    }

    console.log("calling outside await");
    service
      .updateProfile(req.auth.publicId, requestDetails)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
};
