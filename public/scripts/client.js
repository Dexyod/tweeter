// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Declan",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@Dexyod",
    },
    content: {
      text:
        "This is a test tweet, make sure the time changes dynamically over time. Also check to see if the hover effect works on my handle!",
    },
    created_at: 1597189048844,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1597189000000,
  },
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/5fUVPRP.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
];

$(document).ready(function () {
  // takes return value and appends it to the tweets container
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $(".container").append(createTweetElement(tweet));
    }
    // tweets.map((tweet) => $(".container").append(createTweetElement(tweet)));
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

  // POST tweet function
  const $tweetForm = $(".new-tweet__form");
  $tweetForm.on("submit", function (event) {
    event.preventDefault();

    $.post("/tweets", $(this).serialize()).then(() => {
      renderTweets(tweets);
    });

    //reset textArea to empty string and reset output value back to 140
    this[0].value = "";
    this[2].value = 140;
  });

  //send ajax GET method and render tweets from database
  $.ajax({
    method: "GET",
    url: "/tweets",
    success: function (tweets) {
      // console.log(tweets);
      renderTweets(tweets);
    },
  });
});
