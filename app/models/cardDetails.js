let mongoose = require('mongoose');
let schema = mongoose.Schema;
let cardDetailsSchema = new schema({
    name:{type:String , required:true},
    cardNumber:{type:String , required:true},
    expDate:{type:String , required:true},
    cvv:{type:Number , required:true},
    publicId:{type:mongoose.SchemaTypes.ObjectId},
    createdAt: { type: Date, default: Date.now }

})

module.exports =  mongoose.model('cardDetails', cardDetailsSchema);