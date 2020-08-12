$(document).ready(function () {
  // Character counter for text-area
  $("#tweet-text").on("keyup", function () {
    checkTextAreaMaxLength(this);
  });

  // Check the max length of the text area
  const checkTextAreaMaxLength = (textArea) => {
    let maxLength = 140;

    if (textArea.value.length <= maxLength) {
      $(".new-tweet__div__counter")
        .text(`${maxLength - textArea.value.length}`)
        .removeClass("red");
    } else {
      $(".new-tweet__div__counter")
        .text(`${maxLength - textArea.value.length}`)
        .addClass("red");
    }
  };
});
