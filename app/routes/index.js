const userRoutes = require('./userRoutes');
const artisanRoutes = require('./artisanRoutes');
const categoryRoutes = require('./categoryRoutes')
module.exports = function (router) {
    router.use('/user', userRoutes())
    router.use('/artisan', artisanRoutes())
    router.use('/category',categoryRoutes())
    return router;
}