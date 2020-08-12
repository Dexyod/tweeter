$(document).ready(function () {
  // takes return value and appends it to the tweets container
  const renderTweets = (tweets) => {
    tweets.map((tweet) =>
      $(".tweet-container").prepend(createTweetElement(tweet))
    );
  };

  //create tweet template from data
  const createTweetElement = (tweetData) => {
    const $tweet = $(
      `<article id="tweet" class="tweet">
      <header>
      <div class="tweet__user">
      <img src="${tweetData.user.avatars}">
      <h5 class="tweet__username">${tweetData.user.name}</h5>
      </div>
      <h5 class="tweet__handle">${tweetData.user.handle}</h5>
      </header>
      <p class="tweet__body">${tweetData.content.text}
      </p>
      <footer>
      <time class="tweet__time">${moment(tweetData.created_at).toNow(
        true
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

  //grab the tweet form and put it in a variable
  const $tweetForm = $(".new-tweet__form");
  //on submit handler
  $tweetForm.on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();

    // POST tweet function
    const postTweet = (data) => {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: function (response) {
          $(".tweet-container").empty();
          loadTweets();
        },
      }).done(() => {
        //reset textArea to empty string and reset output value back to 140
        this[0].value = "";
        this[2].value = 140;
      });
    };

    //Validate tweet body
    if (this[2].value < 0) {
      alert("Character count exceeded");
    } else if (!this[0].value) {
      alert("Please enter text in tweet");
    } else {
      postTweet(data);
    }
  });

  //send ajax GET method and render tweets from database
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function (response) {
        renderTweets(response);
      },
    });
  };

  loadTweets();
});
