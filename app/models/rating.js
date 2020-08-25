const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ratingSchema = new schema({
    rating: { type: Number },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', autopopulate: true },
    artisanId: { type: mongoose.SchemaTypes.ObjectId, ref: 'artisan', autopopulate: true },
    appointmentId: { type: String, ref: 'booking', autopopulate: true, },
    dateCreated:{type:Date , default:Date.now()}
})
module.exports = mongoose.model('rating', ratingSchema);