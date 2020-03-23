const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    address:{type:String , required:true},
    email:{type:String , required:true},
    phoneNumber:{type:String , required:true},
    statusCode:{type:Number},
    publicId:{type:mongoose.SchemaTypes.ObjectId},
    passwordToken:{type:Number },
    password: { type: String, required: true },
    status: { type: Boolean },
    imageUrl: { type: String, default: '' },
    imageID: { type: String, default: '' },
    userType:{type:String , default:''},
    createdAt: { type: Date, default: Date.now }

}) 

module.exports = mongoose.model('user', userSchema)