const mongoose = require('mongoose');
const schema = mongoose.Schema;
const artisanSchema = new schema({
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    address:{type:String , required:true},
    email:{type:String , required:true},
    phoneNumber:{type:String , required:true},
    publicId:{type:mongoose.Types.ObjectId},
    imageUrl: { type: String, default: '' },
    imageID: { type: String, default: '' },
    
    userType:{type:String , default:'artisan'},
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
    lastLoggedIn:{type:Date , default:''},
    createdAt: { type: Date, default: Date.now }

}) 

module.exports = mongoose.model('artisan', artisanSchema)
