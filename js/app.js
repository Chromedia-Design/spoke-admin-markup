$(document).foundation();

// BEGIN Employee Chat Component ------------------------------------------------------------
$("#chat-toggle").on("click",function(){
$("#chat-notification").slideUp()
$(this).siblings('#chat-container').slideToggle()
$(this).children('.fa').toggleClass('fa-comment fa-times');
})


$("#chat-container .chat-header-container").on("click",function(event){

// Back To Notification List / Close Message
if( ($(event.target).hasClass('btnBack')) || ($(event.target).hasClass('fa fa-chevron-left')) ) {
  console.log("Back To Notification List / Close Message")
  // $(this).children('.chat-header').addClass('shrinked')
  $("#chat-container").children(".chat-header-container").children(".chat-header").addClass('shrinked')
  $(this).prevAll('.chat-header-container').slideToggle()
  $(this).nextAll('.chat-header-container').slideToggle()
  $(this).siblings('.chat-header-intro').slideToggle()
  $(this).siblings('.chat-body-container, .chat-input-container').slideUp()
  $(this).siblings('.chat-body-container, .chat-input-container').hide()
  return;
}

// Open ongoing videocall
if( ($(event.target).hasClass('btn-video')) || ($(event.target).hasClass('fa fa-video-camera')) ) {
  console.log("oops")
  $("#chat-container").children('.chat-video-container').slideDown()
  $("#chat-container").children('.chat-video-container').siblings().slideUp()
  $("#chat-container").children(".chat-body-container").slideUp()
  return;
}

// Open Message
console.log("Open Message")
  $(this).siblings('.chat-header-container').slideUp()
  $(this).siblings('.chat-body-container, .chat-input-container').removeClass('hide')
  $(this).siblings('.chat-body-container, .chat-input-container').slideDown()
  $(this).children('.chat-header').removeClass('shrinked active')
  $(this).siblings('.chat-header-intro').slideUp()
})

// Open Message
$("#chat-notification").on("click",".chat-header-container",function(event){
console.log("Open Message")
openNotification()  
})

// Attach File
$("#btnAttach").on("click",function(){
console.log("Attach File")
$(this).parents(".chat-input-container").animate({"height": "164px"}, 400)
$(this).parent(".chat-input").prev(".attachments").slideDown()
$(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "356px"}, 400)
// $(this).parents(".chat-input-container").siblings(".chat-body-container").slideUp()
})

// Send Message
$("#btnSend").on("click", function(){
console.log("Send Message")
$(this).parents(".chat-input-container").animate({"height": "63px"}, 400)
$(this).parent(".chat-input").prev(".attachments").slideUp()
$(this).parents(".chat-input-container").siblings(".chat-body-container").slideDown()
$(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "456px"}, 400)
})

// Answer Video Call
$("#btn-call-answer").on("click",function(){
console.log("Answer Video Call")
$("#chat-container").slideDown();
$("#chat-container").children('.chat-video-container').slideDown()
$("#chat-container").children('.chat-video-container').siblings().slideUp()
})


$(".btn-video").on("click",function(event){


})

// Collapse Video Call / Go to Message
$("#chat-video-compress").on("click",function(){
console.log()
$("#chat-container").children('.chat-video-container').slideUp()
$("#chat-container").children('.chat-video-container').siblings().slideDown()
$("#chat-container").children('.chat-header-intro').hide()
$("#chat-container").children('.chat-header-container:first').children(".chat-header").removeClass('shrinked active')
$("#chat-container").children('.chat-header-container:first').siblings(".chat-header-container").hide()
$("#chat-container").children('.chat-header-container:first').siblings(".chat-body-container, .chat-input-container").removeClass('hide')
})

// Opening a message by clicking a Notification
function openNotification() {
$("#chat-notification").slideUp()
$("#chat-container").slideToggle()
$("#chat-container").children('.chat-header-intro').hide()
$("#chat-container").children('.chat-header-container:first').children(".chat-header").removeClass('shrinked active')
$("#chat-container").children('.chat-header-container:first').siblings(".chat-header-container").hide()
$("#chat-container").children('.chat-header-container:first').siblings(".chat-body-container, .chat-input-container").removeClass('hide')
}
// END Employee Chat Component ------------------------------------------------------------


$(".fb-item-choices-container").on('click', '.input-group-button .button', function(event) {
  event.preventDefault();
  /* Act on the event */
  val = $(this).parent(".input-group-button").siblings('.input-group-field')
  if ( !val.val() ) {
    return;
  }
  $(this).parents(".input-group").siblings('.fb-item-choices').append('<li><input type="text" value="'+ val.val() +'"><span class="remove pull-right"><i class="fa fa-close"></i></span></li>')
  val.val("")
  val.focus();
});

$(".fb-item-choices-container").on('click', '.remove', function(event) {
  event.preventDefault();
  /* Act on the event */
  $(this).parent().remove();


});


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


