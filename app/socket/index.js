const negotiationChat = require('./negotiationChat');
exports.indexSocket = function(server){
    const netChat = new negotiationChat(server);
    netChat.negotiationChats();
}