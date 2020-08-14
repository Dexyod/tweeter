//validation helper function
const validate = (error) => {
  $(".error").text(error);
  if ($(".error").length) {
    $(".error").addClass("shake");
    setTimeout(() => {
      //remove class after 500ms to reset shake animation
      $(".error").removeClass("shake");
    }, 500);
  } else {
    $(".error").text(error);
  }
};
