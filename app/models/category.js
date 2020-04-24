const mongoose = require("mongoose");
const schema = mongoose.Schema;
const categorySchema = new schema({
    name:{type:String , required:true},
    imageUrl:{type:String, default:''},
    iconUrl:{type:String , default:''},
    viewLocation:[{
        views:{type:Number, default:0},
        location:{type:String }
    }],
    dateCreated:{type:Date , default:Date.now()}
})
module.exports = mongoose.model('category', categorySchema);