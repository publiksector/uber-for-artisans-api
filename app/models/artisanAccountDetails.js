let mongoose = require('mongoose');
let schema = mongoose.Schema;
let artisanAccountdetailsSchema = new schema({
    BankName:{type:String , required:true},
    AccountName:{type:String , required:true},
    AccountNumber:{type:Number , required:true},
    artisanId:{ type: mongoose.SchemaTypes.ObjectId, ref: 'artisan', autopopulate: true },
    dateCreated:{type:Date , default:Date.now()}
})

module.exports =  mongoose.model('artisanAccountdetails', artisanAccountdetailsSchema);