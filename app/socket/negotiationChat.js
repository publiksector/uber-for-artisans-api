const socket = require('socket.io');
const negotiationModel = require('../models/negotiationChat');
const connectedUsers = [];
const userIds = {}

function addUser(detail) {
    var logo = connectedUsers.indexOf(detail)
    console.log(logo, 'fffff')
    if (connectedUsers.indexOf(detail) === -1) {
        connectedUsers.push(detail);
    } else {
        return null
    }
    return null
}

function negotiationChat(server) {
    io = socket(server)
    this.negotiationChats = () => {
        io.of("/negotiation").on("connection", (socket) => {
            socket.on('online', (data) => {
                const senderId = data.sender
                const receiverId = data.receiver
                addUser(data.senderId)
                socket.senderId = data.senderId
                userIds[senderId] = socket.id;
                const messageReciever = userIds[receiverId];
                socket.to(messageReciever).emit('online', data.name)
                getMessages(senderId, receiverId, data.userType).then(chats => {
                    if (chats) {
                        socket.emit('previousChat', chats)
                    } else {
                        socket.emit("previousChat", 'No current chat')
                    }
                }).catch(err => reject(err))

            })

            socket.on('typing', (data) => {
                const receiverIdx = data.receiver
                const typingReciever = userIds[receiverIdx]
                socket.to(typingReciever).emit('typing', data.name)
            })

            socket.on('sendMessage', (data) => {
                const saved = saveMessage(data.senderId, data.receiverId, data.message, data.userType, new Date())
                if (saved) {
                    const messageReciversId = data.receiverId
                    const messageReciever = userIds[messageReciversId]
                    socket.to(messageReciever).emit('messages', { name: data.name, message: data.message })
                } else {
                    return null
                }
            })
        })
    }
}

function saveMessage(senderId, recieverId, data, usertype) {
    return new Promise((resolve, reject) => {
        if (usertype == 'client') {
            const details = {
                client: senderId,
                artisan: recieverId,
                messages: [{
                    message: data,
                    usertype: usertype,
                    chattime: Date.now(),
                }]
            }
            negotiationModel.findOne({ client: senderId, artisan: recieverId }).then(currentChat => {
                if (currentChat) {

                    negotiationModel.findOneAndUpdate({ client: senderId, artisan: recieverId }, { $push: { messages: details.messages } }).then(currentChat => {
                        resolve(currentChat)

                    }).catch(err => reject(err))
                } else {
                    negotiationModel.create(details).then(created => {
                        if (created) {
                            resolve(created)
                        } else {
                            resolve(null)
                        }
                    }).catch(err => reject(err))
                }
            }).catch(err => reject(err))
        } else {

            const detail = {
                client: recieverId,
                artisan: senderId,
                messages: [{
                    message: data,
                    usertype: usertype,
                    chattime: Date.now()
                }]
            }
            negotiationModel.findOne({ client: recieverId, artisan: senderId }).then(currentChat => {
                if (currentChat) {

                    negotiationModel.findOneAndUpdate({ client: recieverId, artisan: senderId }, { $push: { messages: detail.messages } }).then(currentChat => {
                        resolve(currentChat)

                    }).catch(err => reject(err))
                } else {
                    negotiationModel.create(detail).then(created => {
                        if (created) {
                            resolve(created)
                        } else {
                            resolve(null)
                        }
                    }).catch(err => reject(err))
                }
            }).catch(err => reject(err))
        }

    })
}

function getMessages(senderId, recieverId, usertype) {
    return new Promise((resolve, reject) => {
        if (usertype == 'client') {
            negotiationModel.find({ client: senderId, artisan: recieverId }).exec((err, found) => {
                if (err) reject(err);
                if (found) {
                    resolve(found)
                } else {
                    resolve(null)
                }
            })
        } else {
            negotiationModel.find({ client: recieverId, artisan: senderId }).exec((err, seen) => {
                if (err) reject(err);
                if (seen) {
                    resolve(seen)
                } else {
                    resolve(null)
                }
            })
        }
    })
}



module.exports = negotiationChat;