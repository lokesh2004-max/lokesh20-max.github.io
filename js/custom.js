
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    $(window).on('scroll', function(){
      function isScrollIntoView(elem, index) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(window).height()*.5;
        if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
          $(elem).addClass('active');
        }
        if(!(elemBottom <= docViewBottom)) {
          $(elem).removeClass('active');
        }
        var MainTimelineContainer = $('#vertical-scrollable-timeline')[0];
        var MainTimelineContainerBottom = MainTimelineContainer.getBoundingClientRect().bottom - $(window).height()*.5;
        $(MainTimelineContainer).find('.inner').css('height',MainTimelineContainerBottom+'px');
      }
      var timeline = $('#vertical-scrollable-timeline li');
      Array.from(timeline).forEach(isScrollIntoView);
    });
  //changes
     // LOGIN POPUP CREATOR
   $(".navbar-icon.bi-person").on("click", function (e) {
    e.preventDefault();

    // Remove existing popup if any
    $("#loginFormOverlay").remove();

    // Create overlay
    const overlay = $("<div>", {
      id: "loginFormOverlay",
      css: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    });

    // Create form container
    const formContainer = $("<div>", {
      css: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        position: "relative",
      },
    });

    // Close button
    const closeBtn = $("<span>", {
      html: "&times;",
      css: {
        position: "absolute",
        top: "10px",
        right: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        cursor: "pointer",
      },
      click: function () {
        overlay.remove();
      },
    });

    // Append close button
    formContainer.append(closeBtn);

    // Append form HTML
    formContainer.append(`
          <h4 style="margin-bottom: 20px;">Sign In</h4>
          <form>
            <div style="margin-bottom: 15px;">
              <label for="loginName" style="display: block; margin-bottom: 5px;">Name</label>
              <input type="text" id="loginName" placeholder="Your name" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            </div>
            <div style="margin-bottom: 15px;">
              <label for="loginMobile" style="display: block; margin-bottom: 5px;">Mobile No.</label>
              <input type="tel" id="loginMobile" placeholder="Your mobile number" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            </div>
            <div style="margin-bottom: 20px;">
              <label for="loginEmail" style="display: block; margin-bottom: 5px;">Email</label>
              <input type="email" id="loginEmail" placeholder="Your email" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            </div>
            <button type="submit" style="width: 100%; padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 6px;">Sign In</button>
          </form>
        `);

    // Add to DOM
    overlay.append(formContainer);
    $("body").append(overlay);
    overlay.find("form").on("submit", function (e) {
      e.preventDefault();

      const name = $("#loginName").val().trim();
      const mobile = $("#loginMobile").val().trim();
      const email = $("#loginEmail").val().trim();

      if (!name || !mobile || !email) {
        alert("Please fill in all fields.");
        return;
      }

      window.location.href = "topics-listing.html"; // update with your target page
    });

    // Close when clicking outside the form
    overlay.on("click", function (e) {
      if (e.target === this) {
        overlay.remove();
      }
    });
  });
    //changes
  })(window.jQuery);

//extra-----------------------------------------------
const answers = {};

function saveAnswer(question, value) {
    answers[question] = value;
    localStorage.setItem('travelAnswers', JSON.stringify(answers));
    console.log('Answer saved:', answers);
}

function submitAnswers() {
    const requiredQuestions = ['tripType', 'transport', 'place', 'food'];
    const unanswered = requiredQuestions.filter(q => !answers[q]);

    if (unanswered.length > 0) {
        alert("Please answer all questions before submitting.");
        return;
    }

    alert("Thanks for submitting your preferences:\n\n" +
        "Trip Type: " + answers.tripType + "\n" +
        "Transport: " + answers.transport + "\n" +
        "Place: " + answers.place + "\n" +
        "Food: " + answers.food);

    console.log("Final Submitted Answers:", answers);

   
}

