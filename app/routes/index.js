const userRoutes = require('./userRoutes');
const artisanRoutes = require('./artisanRoutes');
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes')
module.exports = function (router) {
    router.use('/user', userRoutes())
    router.use('/artisan', artisanRoutes())
    router.use('/admin',adminRoutes())
    router.use('/category',categoryRoutes())
    return router;
}