// YOUR CODE HERE:
var app = {};

app.init = function(){
  $("#send").on('submit', this.handleSubmit());
};

app.send = function(message){
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
  });
};

app.fetch = function(message){
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    for(var i = 0; i < 10; i++) {
      app.addMessage(data.results[i]);
    }
    console.log(data);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to receive message');
  }
  });
};

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(messageObj){
  var userName = messageObj.username;
  // var text = app.checkMessages(messageObj.text)
  var message = messageObj.text.toString();
  var userElem = $('<span class = "username">' + userName + '</span>' + '</br>');
  var messageElem = $('<span>' + message + '</span>');
  var completeMessage = $('<div class = "chat">' +'</div>');
  $('#chats').append(completeMessage);
  completeMessage.append(userElem);
  completeMessage.append(messageElem);
  $('.userName').on('click', this.addFriend());
};

app.addRoom = function(roomName){
  var optionElement = $('<option>' + roomName + '</option>');
  $('#roomSelect').append(optionElement);
};

app.addFriend = function(userName) {

};

app.handleSubmit = function () {
  console.log("this called!")
};

app.checkMessages = function (text) {
  // if(!text){
  //   return "undefined text";
  // }
  // console.log(text)
  // var result = text;
  // result = result.replace(/</, "h");
  // return result;
}





