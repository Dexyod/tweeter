$(document).ready(function () {
  //show button to go to textarea and autofocus if scrolled down the page
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#scroll-btn").addClass("show");
      $("#scroll-btn").fadeIn();
    } else {
      $("#scroll-btn").fadeOut();
    }
  });
  $("#scroll-btn").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800, function () {
      $(".new-tweet").slideDown("slow", function () {
        $("textarea").focus();
      });
    });
  });
});
