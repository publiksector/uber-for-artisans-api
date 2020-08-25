const mongoose = require("mongoose");
const schema = mongoose.Schema;
const reviewSchema = new schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user', autopopulate: true },
    artisanId: { type: mongoose.Types.ObjectId, ref: 'artisan', autopopulate: true },
    message: { type: String },
    dateCreated:{type:Date , default:Date.now()}
})
module.exports = mongoose.model('review', reviewSchema);