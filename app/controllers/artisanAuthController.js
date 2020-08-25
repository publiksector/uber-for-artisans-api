const service = require("../services/artisanAuthService");

module.exports = function userAuthController() {
  this.registerArtisan = (req, res) => {
    service
      .ArtisanRegistrationToken(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };


  this.verifyArtisan = (req, res) => {
    service
      .verifyArtisan(req.auth.publicId, req.body)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => res.status(500).send(err));
  };

  this.completeArtisanSignup =  (req, res) => {
    service.completeArtisanSignup(req.auth.publicId, req.body).then(data => {
      res.status(200).send(data)
    }).catch(err => res.status(500).send(err));
  }

  this.artisanLogin = (req, res) => {

    service
      .artisanLogin(req.body.email, req.body.password)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };
};
