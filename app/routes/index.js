const userRoutes = require('./userRoutes');
const artisanRoutes = require('./artisanRoutes');

module.exports = function (router) {
    router.use('/user', userRoutes())
    router.use('/artisan', artisanRoutes())
    return router;
}