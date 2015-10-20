// YOUR CODE HERE:
var app = {
  allMessages: [],
  friends: []
};
var rooms = {};
app.init = function(){
  // $("#send").on('submit', this.handleSubmit());
  $("#send").on('submit', function(){
    app.handleSubmit();
  });

  // $(".username").on('click', function () {
  //   console.log(this);
  // })


};
var entityMap = {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': '&quot;',
   "'": '&#39;',
   "/": '&#x2F;'
 };

app.send = function(message){
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function () {
    console.log('chatterbox: Message sent');
  },
  error: function () {
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
    allMessages = data.results;
    _.each(data.results, function (item) {
      app.addMessage(item);
      if(!rooms.hasOwnProperty(item.roomname)) {
        rooms[item.roomname] = item.roomname;
        $('#roomSelect').append('<option value =' + item.roomname + '>' + item.roomname + '</option>');
      }
    });
    $('.chat').on('click', function(){
      var that = this.getAttribute("data-user");
      app.addFriend(that);
    });
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
  var userName = (messageObj.username);
  if(messageObj.text === undefined) {
    return;
  }
  var text = app.checkMessages(messageObj.text)
  var message = text;
  var userElem = $('<span class = "username">' + userName + '</span>' + '</br>');
  var messageElem = $('<span>' + message + '</span>');
  var completeMessage = $('<div class = "chat">' +'</div>');
  completeMessage.attr('data-user', userName);
  completeMessage.attr('data-room', messageObj.roomname);

  $('#chats').append(completeMessage);
  completeMessage.append(userElem);
  completeMessage.append(messageElem);
  // $('.username').on('click', app.addFriend());
};

app.addRoom = function(roomName){
  var optionElement = $('<option>' + roomName + '</option>');
  $('#roomSelect').append(optionElement);
};

app.roomSelect = function(name){
  return _.filter(allMessages, function(item){
    return item.roomname === name;
  })
}

$( "#roomSelect" ).change(function() {
  var chatBoard = app.roomSelect($('#roomSelect').val());
  $('#chats').empty();
  _.each(chatBoard, function(item){
    app.addMessage(item);
  });
});

app.addFriend = function(userName) {
  app.friends.push(userName);
  console.log(app.friends)
  console.log($('.chats').children())
  var chatNodes = $('#chats').children();
  for(var i = 0; i < chatNodes.length; i++) {
    console.log(chatNodes[i])
    if(chatNodes[i].getAttribute("data-user") === userName) {
      $(chatNodes[i]).addClass('friends')
    }
  }
  // app.clearMessages();
  //app.fetch();
};

app.handleSubmit = function () {
  var msg = {};
  msg.username =  window.location.search.slice(10);
  msg.text = $('#send .input').val();
  msg.roomname =  $('#createRoom .input').val() === "" ? $('#roomSelect').val() : $('#createRoom .input').val();
  app.send(msg);
};

app.checkMessages = function (string) {
   return String(string).replace(/[&<>"'\/]/g, function (s) {
     return entityMap[s];
   });
 }

app.init();
// setInterval(function () { $('#chats').empty() ; app.fetch()},10000);





