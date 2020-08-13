$(document).ready(function () {
  //Create tweet toggle functionality
  $(".create-tweet").on("click", function () {
    $(".new-tweet").slideToggle("slow", function () {
      $("textarea").focus();
      //slide error down if open
      $(".error").slideUp("slow");
    });
  });

  //show button to go to textarea and autofocus if scrolled down the page
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
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

  // renders return value and appends it to the tweets container
  const renderTweets = (tweets) => {
    tweets.map((tweet) =>
      $(".tweet-container").prepend(createTweetElement(tweet))
    );
  };

  //escape helper function for safe injection
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //create tweet template from data
  const createTweetElement = (tweetData) => {
    //tweet template
    const $tweet = $(
      `<article id="tweet" class="tweet">
        <header>
          <div class="tweet__user">
            <img src="${escape(tweetData.user.avatars)}">
            <h5 class="tweet__username">${escape(tweetData.user.name)}</h5>
          </div>
          <h5 class="tweet__handle">${escape(tweetData.user.handle)}</h5>
        </header>
          <p class="tweet__body">${escape(tweetData.content.text)}
          </p>
        <footer>
          <time class="tweet__time">${escape(
            moment(tweetData.created_at).toNow(true)
          )} ago</time>
          <div class="tweet__icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`
    );

    return $tweet;
  };

  //get tweet form and put it in a variable
  const $tweetForm = $(".new-tweet__form");

  //Tweet Form on submit function
  $tweetForm.on("submit", function (event) {
    //prevent default event on submit
    event.preventDefault();
    //get data from form and serialize data
    const data = $(this).serialize();

    // POST tweet function
    const postTweet = (data) => {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: function (response) {
          //if success, empty container and reload tweets
          $(".tweet-container").empty();
          loadTweets();
        },
      }).done(() => {
        //reset textArea to empty string and reset output value back to 140 once done
        this[0].value = "";
        this[2].value = 140;
      });
    };
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

    // Validate tweet body
    if (this[2].value < 0) {
      $(".error").addClass("show");
      $(".error").slideDown("slow", function () {
        validate("Too Many Characters! Slow DOWN!");
      });
    } else if (!this[0].value) {
      $(".error").addClass("show");
      $(".error").slideDown("slow", function () {
        validate("Please hum a Tweet!");
      });
    } else {
      // If successful POST tweet data and hide error
      postTweet(data);
      $(".error").slideUp("slow");
    }
  });

  //send ajax GET method
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function (response) {
        renderTweets(response);
      },
    });
  };
  //initialize render tweets on page load
  loadTweets();
});
