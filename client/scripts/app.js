// YOUR CODE HERE:
var app = {
  allMessages: []
};
var rooms = {};
app.init = function(){
  // $("#send").on('submit', this.handleSubmit());
  $("#send").on('submit', function(){
    app.handleSubmit();
  });
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
  console.log(messageObj)
  var userName = (messageObj.username);
  if(messageObj.text === undefined) {
    return;
  }
  var text = app.checkMessages(messageObj.text)
  var message = text;
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

};

app.handleSubmit = function () {
  var msg = {};
  msg.username =  window.location.search.slice(10);
  msg.text = $('#send .input').val();
  msg.roomname =  $('#createRoom .input').val() === "" ? $('#roomSelect').val() : $('#createRoom .input').val();
  app.send(msg);
};

app.checkMessages = function (text) {
 // <, >, ", ', `, , !, @, $, %, (, ), =, +, {, }, [, and ]
  // console.log(text)
  // var result = text;
  // if(result === undefined){
  //   console.log(arguments[1]);
  //   debugger;
  // }

  // result = result.replace(/\</, "\*");
  // result = result.replace(/\>/, "\*");
  // result = result.replace(/\"/, "\*");
  // result = result.replace(/\'/, "\*");
  // result = result.replace(/\`/, "\*");
  // result = result.replace(/\,/, "\*");
  // result = result.replace(/\!/, "\*");
  // result = result.replace(/@/, "\*");
  // result = result.replace(/\$/, "\*");
  // result = result.replace(/\%/, "\*");
  // result = result.replace(/\(/, "\*");
  // result = result.replace(/\)/, "\*");
  // result = result.replace(/\=/, "\*");
  // result = result.replace(/\+/, "\*");
  // result = result.replace(/\{/, "\*");
  // result = result.replace(/\}/, "\*");
  // result = result.replace(/\[/, "\*");
  // result = result.replace(/\]/, "\*");
  // result = result.replace(/\&/, "\*");


return text.replace(/[&<"']/g, function(m) {
  console.log(m)
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '"':
        return '&quot;';
      default:
        return '&#039;';
    }
  });




  return result;
}

app.init();
setTimeout(app.fetch(),5000);





