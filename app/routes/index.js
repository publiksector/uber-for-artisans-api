var UserRoutes = require('./userRoutes');

module.exports = function (router) {
    router.use('/user', UserRoutes())
    return router;
}