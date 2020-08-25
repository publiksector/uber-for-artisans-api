const userRoutes = require('./userRoutes');
const artisanRoutes = require('./artisanRoutes');
const categoryRoutes = require('./categoryRoutes')
const cardDetailsRoutes = require('./cardDetailsRoutes');
const artisanAccountRoutes = require('./artisanAccountRoutes');
module.exports = function (router) {
    router.use('/user', userRoutes())
    router.use('/artisan', artisanRoutes())
    router.use('/category',categoryRoutes())
    router.use('/cardDetails', cardDetailsRoutes())
    router.use('/account', artisanAccountRoutes())
    return router;
}