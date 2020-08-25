const service = require("../services/artisanAccount");

module.exports = function artisanAccountController() {
    this.AddAccount = (req, res) => {
        service
            .AddAccount(req.body, req.auth.Id, req.auth.publicId)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    };

    this.getArtisanAccount = (req, res) => {
        service.getArtisanAccount(req.auth.Id)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    }

};
