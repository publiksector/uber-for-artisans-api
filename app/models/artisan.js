const mongoose = require('mongoose');
const schema = mongoose.Schema;
const artisanSchema = new schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user', autopopulate: true },
    dob:{type:Date , default:''},
    bvn:{type:Number , default:''},
    services:[{type:mongoose.Types.ObjectId, ref:'services',  autopopulate: true }],
    review: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'user', autopopulate: true },
        appointmentId: { type: String, ref: 'booking', autopopulate: true, },
        message: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    ratings: [{
        rating: { type: Number },
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', autopopulate: true },
        appointmentId: { type: String, ref: 'booking', autopopulate: true, },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }

}) 

module.exports = mongoose.model('artisan', artisanSchema)