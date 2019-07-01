$(document).foundation();

// window.FontAwesomeConfig = { searchPseudoElements: true }

$(".dropdown").on('click', '.dropbtn', function(e) {
  e.preventDefault();
  // $(this).siblings(".dropdown-content").addClass("show");
  $(this).parents(".dropdown").find(".dropdown-content").addClass("show");
});

window.onclick = function(e) {
  if ( !e.target.matches('.dropbtn') && !e.target.matches('.dropdown-content *') ) {
    $(".dropdown-content").removeClass('show');
  }
}

// BEGIN Employee Chat Component ------------------------------------------------------------
$("#chat-toggle").on("click", function () {
    $("#chat-notification").slideUp();
    $(this).siblings('#chat-container').slideToggle();
    $(this).children('.fa').toggleClass('fa-comment fa-times');
});

$("#chat-question-preview").on("click", function () {
    $("#chat-notification").children('.chat-header-container').slideUp();
    $("#chat-notification").children('.form-notification').slideDown();
    $("#chat-notification").slideDown();

    $(this).siblings('#chat-container').slideUp();
});

// SEARCH Employee Chat Component ------------------------------------------------------------
$("#add-search-employees").on("click", function () {
    $("#chat-container").style.height = "900px !important";
    $(this).siblings('#employee-search').slideToggle(1000);
});


$("#chat-container .chat-header-container").on("click", function (e) {

// Back To Notification List / Close Message
    if (($(e.target).hasClass('btnBack')) || ($(e.target).hasClass('fa fa-chevron-left'))) {
        console.log("Back To Notification List / Close Message");
        $("#chat-container").children(".chat-header-container").children(".chat-header").addClass('shrinked');
        $(this).prevAll('.chat-header-container').slideToggle();
        $(this).nextAll('.chat-header-container').slideToggle();
        $(this).siblings('.chat-header-intro').slideToggle();
        $(this).siblings('.chat-body-container, .chat-input-container').slideUp();
        $(this).siblings('.chat-body-container, .chat-input-container').hide();
        return;
    }

// Open ongoing videocall
    if (($(e.target).hasClass('btn-video')) || ($(e.target).hasClass('fa fa-video-camera'))) {
        console.log("oops");
        $("#chat-container").children('.chat-video-container').slideDown();
        $("#chat-container").children('.chat-video-container').siblings().slideUp();
        $("#chat-container").children(".chat-body-container").slideUp();
        return;
    }

// Open Message
    console.log("Open Message");
    $(this).siblings('.chat-header-container').slideUp();
    $(this).siblings('.chat-body-container, .chat-input-container').removeClass('hide');
    $(this).siblings('.chat-body-container, .chat-input-container').slideDown();
    $(this).children('.chat-header').removeClass('shrinked active');
    $(this).siblings('.chat-header-intro').slideUp();
});

// Open Message
$("#chat-notification").on("click", ".chat-header-container", function (e) {
    console.log("Open Message");
    openNotification();
});

// Attach File
$("#btnAttach").on("click", function () {
    console.log("Attach File");
    $(".attachments").slideToggle();
});

// Send Message
$("#btnSend").on("click", function(){
  console.log("Send Message");
  $(this).parents(".chat-input-container").animate({"height": "63px"}, 400);
  $(this).parent(".chat-input").prev(".attachments").slideUp();
  $(this).parents(".chat-input-container").siblings(".chat-body-container").slideDown();
  $(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "406px"}, 400);
});

$("#btnSend").on("click", function () {
    console.log("Send Message");
    $(this).parents(".chat-input-container").animate({"height": "63px"}, 400);
    $(this).parent(".chat-input").prev(".attachments").slideUp();
    $(this).parents(".chat-input-container").siblings(".chat-body-container").slideDown();
    $(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "456px"}, 400);
});

// Answer Video Call
$("#btn-call-answer").on("click", function () {
    console.log("Answer Video Call");
    $("#chat-container").slideDown();
    $("#chat-container").children('.chat-video-container').slideDown();
    $("#chat-container").children('.chat-video-container').siblings().slideUp();
});

// Collapse Video Call / Go to Message
$("#chat-video-compress").on("click", function () {
    console.log('Clicked.')
    $("#chat-container").children('.chat-video-container').slideUp();
    $("#chat-container").children('.chat-video-container').siblings().slideDown();
    $("#chat-container").children('.chat-header-intro').hide();
    $("#chat-container").children('.chat-header-container:first').children(".chat-header").removeClass('shrinked active');
    $("#chat-container").children('.chat-header-container:first').siblings(".chat-header-container").hide();
    $("#chat-container").children('.chat-header-container:first').siblings(".chat-body-container, .chat-input-container").removeClass('hide');
});

// Message during video call
$("#chat-video-message").on("click", function () {

    console.log($("#chat-container").children('.chat-video-container').css('height'));

    if ($("#chat-container").children('.chat-video-container').css('height') == "90%") {
        $("#chat-container").children('.chat-video-container').animate({'height': '100%'}, 400);
        $("#chat-container").find('#videos').animate({'height': '600px'}, 400);
    } else {
        $("#chat-container").children('.chat-video-container').animate({'height': '90%'}, 400);
        $("#chat-container").find('#videos').animate({'height': '540px'}, 400);
    }
    $("#chat-container").find('.chat-input-container').slideToggle();

    // $(".chat-input-container").toggleClass('hide');
});

// Opening a message by clicking a Notification
function openNotification() {
    $("#chat-notification").slideUp();
    $("#chat-container").slideToggle();
    $("#chat-container").children('.chat-header-intro').hide();
    $("#chat-container").children('.chat-header-container:first').children(".chat-header").removeClass('shrinked active');
    $("#chat-container").children('.chat-header-container:first').siblings(".chat-header-container").hide();
    $("#chat-container").children('.chat-header-container:first').siblings(".chat-body-container, .chat-input-container").removeClass('hide');
}

// END Employee Chat Component ------------------------------------------------------------

// Form builder ------------------------------------------------------------

// Close Form Item

// $('.editor-content').children('div:first-child').nextAll().slideToggle()
$('.editor-content').removeClass('box-shadow');

// Add Choice
$(".editor-content").on('click', '.input-group-button .button', function (e) {
    e.preventDefault();
    val = $(this).parent(".input-group-button").siblings('.input-group-field');
    if (!val.val()) {
        return;
    }
    $(this).parents(".input-group").siblings('ul').append('<li><div class="input-group bg-black10 mb-0"><input class="input-group-field" type="text" value="' + val.val() + '"><div class="input-group-button"><button class="button success borderless hollow clear alert remove"><i class="fa fa-times"></i></button></div></div></li>');
    val.val("");
    val.focus();
});

// Remove Choice
$(".editor-content").on('click', '.remove', function (e) {
    e.preventDefault();
    $(this).parents("li").remove();
});

$(".fb-item").on('click', '.editable', function (e) {
    // event.preventDefault();
    /* Act on the event */
    $(this).parents(".editor-content").addClass('box-shadow');
    $(this).parents(".fb-item").siblings('.fb-item').find(".editor-content").removeClass('box-shadow');
    $(this).parents(".fb-item").siblings('.fb-item').find(".editor-content").children("div:first-child").nextAll().slideUp();
    $(this).parents(".editor-content").children().first().nextAll().slideDown();
});
// Form builder ------------------------------------------------------------


// Open a modal ------------------------------------------------------------
function openModal(elem) {
    $(elem).foundation('open');
};

$(".show-edit-hover").on('click', function(){
  openModal("#edit-clinical-pathway");
});


// Clinical Pathway ------------------------------------------------------------
$('.clinical-pathway-details').slideUp();

// Open Details
$(".clinical-pathway-basic-content").on("click", function () {
    $(this).parents(".clinical-pathway-item").siblings(".clinical-pathway-item").find(".clinical-pathway-details").slideUp();
    $(this).siblings('.clinical-pathway-details').slideDown();
});


$(".clinical-pathway-new-entry-list").children('selector');

$(".clinical-pathway-new-entry-list").on('click', '.clinical-pathway-new-entry', function(e) {
  e.preventDefault();
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
});

// HOVERER:
$(".show-on-hover").find(".hover-target").hide();

$(".show-on-hover").on('mouseover', function(e) {
  e.stopPropagation();
  e.preventDefault();
  /* Act on the event */  
  $(this).find(".hover-target").show();
  // console.log(event.target.nodeName)
});

$(".show-on-hover").on('mouseout', function(e) {
  e.stopPropagation();
  e.preventDefault();
  /* Act on the event */  
  $(this).find(".hover-target").hide();
  // console.log(event.target.nodeName)
});

// TOGGLER: toggle "toggler-target" by clicking "toggler-handler"
$(".toggler").find(".toggler-target").slideUp();
$(".toggler.ul-tree-expanded").find(".toggler-target").slideDown();

// toggle target
$(".toggler").on('click', '.toggler-handler', function(e) {
  // event.stopPropagation()
  // event.preventDefault();
  /* Act on the event */  
  $(this).closest(".toggler").children(".toggler-target").slideToggle();
  // console.log(event.target.nodeName)
});

// QUESTION TREE ------------------------------------------------------------
function selectOnClick(target,targetTree, selectionClass){
    $(target).on('click', function(e) {
        e.preventDefault();
        $(this).parents(targetTree).find(target).removeClass(selectionClass);
        $(this).addClass(selectionClass);
    });
}

selectOnClick(".ul-tree-child",".ul-tree, .ul-tree-only-child-selectable","selected")

// Repositioning Element using data attribute
$(".repositioned").each(function(index, el) {
    $(this).hide();
    if ($(this).data('position-top')) {
        $(this).children('.repositioned-container').css('top', $(this).data('position-top'));
    }
    if ($(this).data('position-right')) {
        $(this).children('.repositioned-container').css('right', $(this).data('position-right'));
    }
        
    $(this).children('.repositioned-container').css('display', 'block');
    $(this).show();
});



function remCalc(rem) {
    return rem * 16;
}

// Episode of care Member header Card
$('#profileContent').on('scroll', function() {
    var $height = $('#profileContent').scrollTop();
    if($height > remCalc(1.5)) {
        console.log($height," up")
        $(this).find("[data-transition]").find('.make-transition-hide').hide()
        $(this).find("[data-transition]").css('padding-top', '1.5rem');
        $(this).find("[data-transition]").addClass('pb-0-5')
    } else {
        console.log($height, "down")
        $(this).find("[data-transition]").find('.make-transition-hide').show()
        $(this).find("[data-transition]").css('padding-top', '0rem');
        $(this).find("[data-transition]").removeClass('pb-0-5')
    }
});

$('#profileContent').on('scroll', function() {
    $('.make-transition').each(function(index, el) {
        
    });
});

// replace these values with those generated in your TokBox Account
var apiKey = "45907482";
var sessionId = "2_MX40NTkwNzQ4Mn5-MTQ5OTE1NzY3NTE1NX5Ob3BVZERRSmkwUHpwWFB1dDdlRW0vRG5-fg";
var token = "T1==cGFydG5lcl9pZD00NTkwNzQ4MiZzaWc9YmZkYmUxNWY1ZThlZDBhYWM0ODlmZGM3MjQ3OThjN2UyYjMwOGZiMzpzZXNzaW9uX2lkPTJfTVg0ME5Ua3dOelE0TW41LU1UUTVPVEUxTnpZM05URTFOWDVPYjNCVlpFUlJTbWt3VUhwd1dGQjFkRGRsUlcwdlJHNS1mZyZjcmVhdGVfdGltZT0xNDk5MTU3Njk2Jm5vbmNlPTAuODIyNDM1MDIxMzcwOTg1NyZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTQ5OTE2MTI5NQ==";

// (optional) add server code here
// initializeSession();

// // Handling all of our errors here by alerting them
// function handleError(error) {
//     if (error) {
//         alert(error.message);
//     }
// }

// function initializeSession() {
//     var session = OT.initSession(apiKey, sessionId);

//     // Subscribe to a newly created stream

//     // Create a publisher
//     var publisher = OT.initPublisher('publisher', {
//         insertMode: 'append',
//         width: '100%',
//         height: '100%'
//     }, handleError);

//     // Connect to the session
//     session.connect(token, function (error) {
//         // If the connection is successful, publish to the session
//         if (error) {
//             handleError(error);
//         } else {
//             session.publish(publisher, handleError);
//         }
//     });
// }

// session.on('streamCreated', function (event) {
//     session.subscribe(event.stream, 'subscriber', {
//         insertMode: 'append',
//         width: '100%',
//         height: '100%'
//     }, handleError);
// });





