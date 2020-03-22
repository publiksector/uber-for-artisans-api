const service = require("../services/artisanAuthService");

module.exports = function userAuthController() {
  this.registerArtisan = (req, res) => {
    service
      .registerArtisan(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };

  this.artisanLogin = (req, res) => {

    service
      .artisanLogin(req.body.email ,req.body.password)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  };
};
