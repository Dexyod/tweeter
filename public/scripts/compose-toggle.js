$(document).ready(function () {
  //Create tweet toggle functionality
  $(".create-tweet").on("click", function () {
    $(".new-tweet").slideToggle("slow", function () {
      $("textarea").focus();
      //slide error down if open
      $(".error").slideUp("slow");
    });
  });
});
