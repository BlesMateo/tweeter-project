/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Data derived from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

//Test or driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": " I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

//Function takes in an array of tweet objects and then appending each one to the #tweets-container
function renderTweets(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
}

const loadTweets = function() {
  $.ajax("/tweets", {method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};
loadTweets();

//Function takes in a tweet object returns a tweet <article> element containing the entire HTML structure of the tweet.
function createTweetElement (tweetData) {
  const {user, content, created_at} = tweetData;
  const tweetElementHTML = $(`<article class="tweet">
  <header>
    <span class="username"><img src="${user.avatars}">${user.name}</span>
    <span class="userHandle">${user.handle}</span>
    </header>
    <div class="tweet-content">
      <p>${content.text}</p>
    </div>
    <footer>
      <p>${timeago.format(created_at)}</p>
      <div>
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
</article>`)
  return tweetElementHTML;
};


$(document).ready(function() {
  $("#post-tweet").submit(function(event) {
    event.preventDefault();
    console.log("New Tweet!");
    // console.log(event.currentTarget.value);
    console.log(event.target[0].value)

    $.ajax("/tweets", {
      method:"post",
      data: $("#post-tweet").serialize()
    })

  });


});
 // $("#tweet-container").prepend($tweet);
