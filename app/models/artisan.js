const mongoose = require('mongoose');
const schema = mongoose.Schema;
const artisanSchema = new schema({
    firstName:{type:String , default:""},
    lastName:{type:String ,default:""},
    address:{type:String  , default:""},
    email:{type:String , default:""},
    phoneNumber:{type:String , required:true},
    publicId:{type:mongoose.Types.ObjectId},
    imageUrl: { type: String, default: '' },
    statusCode:{type:Number},
    imageID: { type: String, default: '' },
    userType:{type:String , default:'artisan'},
    verified:{type:Boolean , default:false},
    active: { type: Boolean  , default:false},
    status: { type: Boolean  , default:false},
    dob:{type:Date , default:''},
    bvn:{type:Number , default:''},
    services:[{type:mongoose.Types.ObjectId, ref:'services',  autopopulate: true }],
    lastLoggedIn:{type:Date , default:''},
    createdAt: { type: Date, default: Date.now }

}) 

module.exports = mongoose.model('artisan', artisanSchema)
