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
};
