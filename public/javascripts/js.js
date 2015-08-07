var socket = io.connect('http://localhost:3002');
var keypress = 0;
var status = document.getElementById('status')
var textnode = document.createTextNode("statusText")

$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    console.log($('#m').val());
    $('#m').val('');
    return false;
  });

socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

socket.on('userTyping', function(msg){
  var status = document.getElementById('status')
  status.innerHTML = "User is typing"
  status.style.color = '#999999'
  setTimeout(function () {
    keypress = 0;
    status.style.color = '#FFFFFF'
    status.innerHTML = "."
    console.log("clear status timer tripped");
  },5000)
  });


var chatBox = document.getElementById('m')

chatBox.addEventListener('keyup', function () {
  console.log(chatBox.value);
  console.log(keypress);
  if(keypress == 0){
    socket.emit('userTyping', 'User is Typing');
    keypress = 1;
    console.log("shoulda emitted");

    setTimeout(function () {
      keypress = 0;
      console.log("poll timer tripped");
    },5000)
  }
})
