/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Test or driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {


  //Function takes in an array of tweet objects and then appending each one to the #tweets-container
  const renderTweets = (tweets) => {
    $('#tweet-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  };


  //Function to escape text and use it inside .html
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Function takes in a tweet object returns a tweet <article> element containing the entire HTML structure of the tweet.
  const createTweetElement = (tweetData) => {
    const {user, content, created_at} = tweetData;
    const tweetElementHTML = $(`<article class="tweet">
  <header>
    <span class="username"><img src="${user.avatars}">${user.name}</span>
    <span class="userHandle">${user.handle}</span>
    </header>
    <div class="tweet-content">
    <p>${escape(content.text)}</p>
    </div>
    <footer>
      <p>${timeago.format(created_at)}</p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
</article>`);
    return tweetElementHTML;
  };


  //Function that uses JQuery to make a request to /tweets and receive the tweets as JSON
  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };

  //Displaying form validations using JQuery if there is no or excessive form input
  const $form = $('form');
  $form.on('submit', function(event) {
    event.preventDefault();
    $("#error-notification").slideUp();
    const value = $(this).find("#tweet-text").val();
    if (!value.trim()) {
      $("#error-notification")
        .html("⚠ There must be something on your mind! ⚠").slideDown();
    }
    if (value.length > 140) {
      $("#error-notification")
        .html("⚠ Woah there! Take a breather and let's try this again! ⚠").slideDown();
    } else {

      $.ajax("/tweets", {
        method:"post",
        data: $("#post-tweet").serialize(),
        success: () => {
          $("#tweet-text").val('');
          $(".counter").val(140);
          loadTweets();
        }
      });
    }
  });
  loadTweets();
});




