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
    app.allMessages = data.results.slice();
    _.each(data.results, function (item) {
      // console.log('app', app);
      // app.allMessages.push(item);
      if(!rooms.hasOwnProperty(item.roomname)) {
        rooms[item.roomname] = item.roomname;
        $('#roomSelect').append('<option value =' + item.roomname + '>' + item.roomname + '</option>');
      }
    });
    $('.chat').on('click', function(){
      var that = this.getAttribute("data-user");
      app.addFriend(that);
    });
    // console.log('in fetch function', app.allMessages);

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

  if(app.friends.indexOf(userName) !== -1){
    completeMessage.addClass('friends');
  }

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
  return _.filter(app.allMessages, function(item){
    return item.roomname === name;
  })
}

$( "#roomSelect" ).change(function() {
  if($('#roomSelect').val() === "allRooms") {
    $('#chats').empty();
    app.fetch();
  } else {
    var chatBoard = app.roomSelect($('#roomSelect').val());
    $('#chats').empty();
    _.each(chatBoard, function(item){
      app.addMessage(item);
    });
  }
});

app.addFriend = function(userName) {
  app.friends.push(userName);
  var chatNodes = $('#chats').children();
  for(var i = 0; i < chatNodes.length; i++) {
    // console.log(chatNodes[i])
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
app.fetch();

app.refreshBoard = function () {
  // debugger;
  // app.fetch.call(this);
app.fetch();
  if($('#roomSelect').val() === "allRooms") {
    _.each(app.allMessages, function (message) {
      // console.log(app.allMessages);
      app.addMessage(message);
    })
  } else {
    var chatBoard = app.roomSelect($('#roomSelect').val());
    // if(app.roomSelect($('#roomSelect').val() === 'TESTROOM')
    // }
    $('#chats').empty();
    _.each(chatBoard, function(item){
      app.addMessage(item);
    });
  }
}
app.refreshBoard();

setInterval(function () {app.refreshBoard()}, 3000);
// console.log(app.allMessages)
// setInterval(function () { app.refreshBoard() },5000);





