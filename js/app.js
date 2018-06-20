$(document).foundation();

$("#chat-toggle").on("click",function(){
  $("#chat-notification").slideUp()
  $(this).siblings('#chat-container').slideToggle()
})

$("#chat-container .chat-header-container").on("click",function(event){
  console.log("in")
  if( ($(event.target).hasClass('btnBack')) || ($(event.target).hasClass('fa')) ) {
    $(this).children('.chat-header').addClass('shrinked')
    $(this).prevAll('.chat-header-container').slideToggle()
    $(this).nextAll('.chat-header-container').slideToggle()
    $(this).siblings('.chat-header-intro').slideToggle()
    $(this).siblings('.chat-body-container, .chat-input-container').addClass('hide')
    // $(this).siblings('.chat-header-intro').show()
    return;
  }

  
  $(this).siblings('.chat-header-container').slideUp()
  $(this).siblings('.chat-body-container, .chat-input-container').removeClass('hide')
  $(this).children('.chat-header').removeClass('shrinked active')
  $(this).siblings('.chat-header-intro').slideUp()
})

$("#chat-notification").on("click",".chat-header-container",function(event){
  openNotification()  
})

function openNotification() {
  $("#chat-notification").slideUp()
  $("#chat-container").slideToggle()
  $("#chat-container").children('.chat-header-intro').hide()
  $("#chat-container").children('.chat-header-container:first').children(".chat-header").removeClass('shrinked active')
  $("#chat-container").children('.chat-header-container:first').siblings(".chat-header-container").hide()
  $("#chat-container").children('.chat-header-container:first').siblings(".chat-body-container, .chat-input-container").removeClass('hide')
}

// replace these values with those generated in your TokBox Account
var apiKey = "45907482";
var sessionId = "2_MX40NTkwNzQ4Mn5-MTQ5OTE1NzY3NTE1NX5Ob3BVZERRSmkwUHpwWFB1dDdlRW0vRG5-fg";
var token = "T1==cGFydG5lcl9pZD00NTkwNzQ4MiZzaWc9YmZkYmUxNWY1ZThlZDBhYWM0ODlmZGM3MjQ3OThjN2UyYjMwOGZiMzpzZXNzaW9uX2lkPTJfTVg0ME5Ua3dOelE0TW41LU1UUTVPVEUxTnpZM05URTFOWDVPYjNCVlpFUlJTbWt3VUhwd1dGQjFkRGRsUlcwdlJHNS1mZyZjcmVhdGVfdGltZT0xNDk5MTU3Njk2Jm5vbmNlPTAuODIyNDM1MDIxMzcwOTg1NyZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTQ5OTE2MTI5NQ==";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
});


