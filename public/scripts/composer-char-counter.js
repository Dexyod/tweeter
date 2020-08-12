$(document).ready(function () {
  // Character counter for text-area
  $("#tweet-text").on("keyup", function () {
    checkTextAreaMaxLength(this);
  });

  // Check the max length of the text area
  const checkTextAreaMaxLength = (textArea) => {
    let maxLength = 140;

    if (textArea.value.length <= maxLength) {
      $(".new-tweet__div__counter").html(
        `${maxLength - textArea.value.length}`
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
