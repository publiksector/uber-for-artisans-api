const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    firstName:{type:String , default:''},
    lastName:{type:String , default:''},
    address:{type:String , default:''},
    email:{type:String , default:''},
    phoneNumber:{type:String , required:true},
    statusCode:{type:Number},
    publicId:{type:mongoose.SchemaTypes.ObjectId},
    passwordToken:{type:Number },
    password: { type: String, default: '' },
    active: { type: Boolean  , default:false},
    status: { type: Boolean  , default:false},
    verified:{type:Boolean , default:false},
    imageUrl: { type: String, default: '' },
    imageID: { type: String, default: '' },
    userType:{type:String , default:'client'},
    lastLoggedIn:{type:Date , default:''},
    createdAt: { type: Date, default: Date.now }

}) 

module.exports = mongoose.model('user', userSchema)