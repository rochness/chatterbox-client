// YOUR CODE HERE:
var app = {};

app.init = function(){
  $("#send").on('submit', this.handleSubmit);

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
  url: undefined,
  type: 'GET',
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

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(messageObj){
  var userName = messageObj.username;
  var message = messageObj.text;
  var userElem = $('<span class = "username">' + userName + '</span>');
  var messageElem = $('<span class = "chats">' + message + '</span>');
  $('#chats').append(userElem.append(messageElem));
   $('.userName').on('click', this.addFriend() )
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


// $(".submit").on('submit', this.handleSubmit);



