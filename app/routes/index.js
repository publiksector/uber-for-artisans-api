const userRoutes = require('./userRoutes');
const artisanRoutes = require('./artisanRoutes');
const categoryRoutes = require('./categoryRoutes')
const cardDetailsRoutes = require('./cardDetailsRoutes');
module.exports = function (router) {
    router.use('/user', userRoutes())
    router.use('/artisan', artisanRoutes())
    router.use('/category',categoryRoutes())
    router.use('/cardDetails', cardDetailsRoutes())
    return router;
}