
const socket = io.connect(window.location.hostname == 'localhost' ? "http://localhost:8080/negotiation" :
    "https://uberforartisan.herokuapp.com/negotiation")

    
const message = document.getElementById("message"),
    name = document.getElementById("name"),
    senderId = document.getElementById("sender"),
   //  image = document.getElementById("image"),
    userType = document.getElementById("userType"),
    receiverId = document.getElementById("receiver"),
    btn = document.getElementById("send"),
    onl = document.getElementById("onl");
exitbtn = document.getElementById("disconnectBtn");

// image.addEventListener("change",function(e){
//     let File = e.target.files[0]
//     //let slice = File.slice(0,100000)
// //     let fileReader = new FileReader()
// //   let look =  fileReader.readAsArrayBuffer(slice)
//   //let fileBuffer = Buffer.concat(File.name.data)
//   console.log(File, 'gghghgh' )

// })

document.getElementById('image').addEventListener("change", function(){
        const reader = new FileReader();
      reader.onload = function(){
          const base64 = this.result.replace(/.*base64,/, '')
          socket.emit('pix', base64)
      }
      reader.readAsDataURL(this.files[0])
        },false)

btn.addEventListener('click', function () {
    socket.emit("sendMessage", { senderId: senderId.value, name: name.value, message: message.value, receiverId: receiverId.value, userType: userType.value, chattime: new Date() })
    output.innerHTML += "<p><strong>Me:</strong>" + message.value + "</p>";
    message.value = "";
})

onl.addEventListener("click", function () {
    socket.emit('online', { "sender": senderId.value, "receiver": receiverId.value, "name": name.value, "userType": userType.value, })
})
socket.on('online', function (data) {
    feedback.innerHTML = "<p><em>" + data + " Joined the chat</em></p>";
})

message.addEventListener('keypress', function () {
    socket.emit('typing', { name: name.value, "sender": senderId.value, "receiver": receiverId.value, })
});

socket.on('typing', function (data) {
    feedback.innerHTML = "<p><em>" + data + " is typing a message</em></p>";
});

socket.on('messages', function (data) {
    output.innerHTML += "<p><strong>" + data.name + "</strong>" + data.message + "</strong></p>";
});
socket.on('previousChat', function (data) {
    const output = data
    const mapOutput = output.map(a => a.messages)
    feedback.innerHTML = "<p><em>" + mapOutput + "</em></p>";


});