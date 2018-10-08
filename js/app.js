$(document).foundation();

// dropdown ------------------------------------------------------------
$(".dropdown-checkbox").on('click', '.dropbtn, .fa', function (event) {
    // event.preventDefault();
    // $(this).parents(".dropdown-checkbox").find('.dropdown-content').slideDown();
    $(this).parents(".dropdown-checkbox").find('.dropdown-content').toggleClass('show');
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('select, select option')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                // openDropdown.classList.contains('show').slideUp();
                openDropdown.classList.remove('show');
            }
        }
    }
}
// dropdown ------------------------------------------------------------

$(".dropdown").on('click', '.dropbtn', function(event) {
  event.preventDefault();
  $(this).siblings(".dropdown-content").addClass("show");
});

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    $(".dropdown-content").removeClass('show')
  }
}


// BEGIN Employee Chat Component ------------------------------------------------------------
$("#chat-toggle").on("click", function () {
    $("#chat-notification").slideUp()
    $(this).siblings('#chat-container').slideToggle()
    $(this).children('.fa').toggleClass('fa-comment fa-times');
})


$("#chat-container .chat-header-container").on("click", function (event) {

// Back To Notification List / Close Message
    if (($(event.target).hasClass('btnBack')) || ($(event.target).hasClass('fa fa-chevron-left'))) {
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
    if (($(event.target).hasClass('btn-video')) || ($(event.target).hasClass('fa fa-video-camera'))) {
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
$("#chat-notification").on("click", ".chat-header-container", function (event) {
    console.log("Open Message")
    openNotification()
})

// Attach File
$("#btnAttach").on("click", function () {
    console.log("Attach File")
    // $(this).parents(".chat-input-container").animate({"height": "164px"}, 400)
    $(".attachments").slideToggle()
    // $(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "306px"}, 400)
    // $(this).parents(".chat-input-container").siblings(".chat-body-container").slideUp()
})

// Send Message
$("#btnSend").on("click", function(){
  console.log("Send Message")
  $(this).parents(".chat-input-container").animate({"height": "63px"}, 400)
  $(this).parent(".chat-input").prev(".attachments").slideUp()
  $(this).parents(".chat-input-container").siblings(".chat-body-container").slideDown()
  $(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "406px"}, 400)
})

$("#btnSend").on("click", function () {
    console.log("Send Message")
    $(this).parents(".chat-input-container").animate({"height": "63px"}, 400)
    $(this).parent(".chat-input").prev(".attachments").slideUp()
    $(this).parents(".chat-input-container").siblings(".chat-body-container").slideDown()
    $(this).parents(".chat-input-container").siblings(".chat-body-container").animate({"height": "456px"}, 400)
})

// Answer Video Call
$("#btn-call-answer").on("click", function () {
    console.log("Answer Video Call")
    $("#chat-container").slideDown();
    $("#chat-container").children('.chat-video-container').slideDown()
    $("#chat-container").children('.chat-video-container').siblings().slideUp()
})


$(".btn-video").on("click", function (event) {


})

// Collapse Video Call / Go to Message
$("#chat-video-compress").on("click", function () {
    console.log()
    $("#chat-container").children('.chat-video-container').slideUp()
    $("#chat-container").children('.chat-video-container').siblings().slideDown()
    $("#chat-container").children('.chat-header-intro').hide()
    $("#chat-container").children('.chat-header-container:first').children(".chat-header").removeClass('shrinked active')
    $("#chat-container").children('.chat-header-container:first').siblings(".chat-header-container").hide()
    $("#chat-container").children('.chat-header-container:first').siblings(".chat-body-container, .chat-input-container").removeClass('hide')
})

// Message during video call
$("#chat-video-message").on("click", function () {

    console.log($("#chat-container").children('.chat-video-container').css('height'))

    if ($("#chat-container").children('.chat-video-container').css('height') == "90%") {
        $("#chat-container").children('.chat-video-container').animate({'height': '100%'}, 400);
        $("#chat-container").find('#videos').animate({'height': '600px'}, 400);
    } else {
        $("#chat-container").children('.chat-video-container').animate({'height': '90%'}, 400);
        $("#chat-container").find('#videos').animate({'height': '540px'}, 400);
    }
    $("#chat-container").find('.chat-input-container').slideToggle()
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

// Form builder ------------------------------------------------------------

// Close Form Item

// $('.editor-content').children('div:first-child').nextAll().slideToggle()
$('.editor-content').removeClass('box-shadow')

// Add Choice
$(".editor-content").on('click', '.input-group-button .button', function (event) {
    event.preventDefault();
    val = $(this).parent(".input-group-button").siblings('.input-group-field')
    if (!val.val()) {
        return;
    }
    $(this).parents(".input-group").siblings('ul').append('<li><div class="input-group bg-black10 mb-0"><input class="input-group-field" type="text" value="' + val.val() + '"><div class="input-group-button"><button class="button success borderless hollow clear alert remove"><i class="fa fa-times"></i></button></div></div></li>')
    val.val("")
    val.focus();
    // $(this).insertAfter($(this).parent());
});

// Remove Choice
$(".editor-content").on('click', '.remove', function (event) {
    event.preventDefault();
    $(this).parents("li").remove();
});

$(".fb-item").on('click', '.editable', function (event) {
    // event.preventDefault();
    /* Act on the event */
    $(this).parents(".editor-content").addClass('box-shadow')
    $(this).parents(".fb-item").siblings('.fb-item').find(".editor-content").removeClass('box-shadow')
    $(this).parents(".fb-item").siblings('.fb-item').find(".editor-content").children("div:first-child").nextAll().slideUp()
    $(this).parents(".editor-content").children().first().nextAll().slideDown()
});
// Form builder ------------------------------------------------------------


// Open a modal ------------------------------------------------------------
function openModal(elem) {
    $(elem).foundation('open');
}

$(".show-edit-hover").on('click', function(){
  openModal("#edit-clinical-pathway")
})


// Clinical Pathway ------------------------------------------------------------
$('.clinical-pathway-details').slideUp()

// Open Details
$(".clinical-pathway-basic-content").on("click", function () {
    $(this).parents(".clinical-pathway-item").siblings(".clinical-pathway-item").find(".clinical-pathway-details").slideUp()
    $(this).siblings('.clinical-pathway-details').slideDown()
})


$(".clinical-pathway-new-entry-list").children('selector')

$(".clinical-pathway-new-entry-list").on('click', '.clinical-pathway-new-entry', function(event) {
  event.preventDefault();
  $(this).siblings().removeClass('active')
  $(this).addClass('active')
});



// TO BE REMOVED ------------------------------------------------------------
// $(".toggle-sibling").children(":nth-child(1)").on('click', function(event) {
//   event.preventDefault();
//   $(this).siblings().slideToggle()
// });
// $(".toggle-sibling").children(":nth-child(2)").slideToggle();
// TO BE REMOVED ------------------------------------------------------------



// TOGGLER: toggle "toggler-target" by clicking "toggler-handler"
$(".toggler").find(".toggler-target").slideUp()

// toggle target
$(".toggler").on('click', '.toggler-handler', function(event) {
  event.stopPropagation()
  event.preventDefault();
  /* Act on the event */  
  $(this).closest(".toggler").children(".toggler-target").slideToggle()
  console.log(event.target.nodeName)
});

// QUESTION TREE ------------------------------------------------------------
function selectOnClick(target,targetTree, selectionClass){
    $(target).on('click', function(event) {
        // event.stopPropagation()
        event.preventDefault();
        /* Act on the event */
        $(this).parents(targetTree).find(target).removeClass(selectionClass)
        $(this).addClass(selectionClass)
    });
}



selectOnClick(".ul-tree-child",".ul-tree, .ul-tree-only-child-selectable","selected")

// selectOnClick(".ul-tree-parent, .ul-tree-sub-parent",".ul-tree","selected")

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
    session.connect(token, function (error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}

session.on('streamCreated', function (event) {
    session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);
});





