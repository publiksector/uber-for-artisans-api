const mongoose = require('mongoose');
const schema = mongoose.Schema;
const artisanSchema = new schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user', autopopulate: true },
    services:[{type:mongoose.Types.ObjectId, ref:'services',  autopopulate: true }],
    review: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'user', autopopulate: true },
        appointmentId: { type: String, ref: 'booking', autopopulate: true, },
        message: { type: String },
        CreatedAt: { type: Date, default: Date.now }
    }],
    ratings: [{
        rating: { type: Number },
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', autopopulate: true },
        appointmentId: { type: String, ref: 'booking', autopopulate: true, },
        CreatedAt: { type: Date, default: Date.now }
    }],
    CreatedAt: { type: Date, default: Date.now }

}) 

module.exports = mongoose.model('artisan', artisanSchema)