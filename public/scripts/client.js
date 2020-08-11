// Fake data taken from initial-tweets.json
const data = [
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
      name: "Declan",
      avatars: "https://i.imgur.com/nlhLi3I.png",
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
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
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
      const $tweet = createTweetElement(tweet);
      $(".container").append($tweet);
    }
  };

  //convert created at time
  const formatTime = (timeCreated) => {
    let diff = Date.now() - timeCreated;

    const periods = {
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
    };

    if (diff > periods.month) {
      // it was at least a month ago
      return Math.floor(diff / periods.month) + " months ago";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + " weeks ago";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + " days ago";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + " hours ago";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + " minutes ago";
    }
    return "Just now";
  };

  //create tweet template from data
  const createTweetElement = (tweetData) => {
    let $tweet = $(`<article id="tweet" class="tweet">
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
      <time class="tweet__time">${formatTime(tweetData.created_at)}</time>
      <div class="tweet__icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  renderTweets(data);
});
