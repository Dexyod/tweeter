$(document).ready(function () {
  // Character counter for text-area
  $("#tweet-text").on("keyup", function (event) {
    checkTextAreaMaxLength(this, event);
  });

  // Check the max length of the text area
  const checkTextAreaMaxLength = (textArea) => {
    let maxLength = 140;

    if (textArea.value.length <= maxLength) {
      $(".new-tweet__div__counter").html(
        `<strong>${maxLength - textArea.value.length}</strong>`
      );
    } else {
      $(".new-tweet__div__counter").html(
        `<strong style="color: red;">${
          maxLength - textArea.value.length
        }</strong>`
      );
    }
  };
});
