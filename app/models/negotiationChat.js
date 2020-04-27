const mongoose = require('mongoose');
const schema = mongoose.Schema;
const negotiationChatSchema = new schema({
        client:{type: mongoose.Types.ObjectId},
        artisan:{type: mongoose.Types.ObjectId},
        messages:[{
            message:{type:String},
            usertype:{type:String},
            chattime:{type:Date}
        }],
})

module.exports = mongoose.model('negotiationChat', negotiationChatSchema);

