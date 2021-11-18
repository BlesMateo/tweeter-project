/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Test or driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {


//Function takes in an array of tweet objects and then appending each one to the #tweets-container
function renderTweets(tweets) {
  $('#tweet-container').empty()
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  }
}


//Function to escape text and use it inside .html
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function takes in a tweet object returns a tweet <article> element containing the entire HTML structure of the tweet.
function createTweetElement (tweetData) {
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
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
</article>`)
  return tweetElementHTML;
};



const loadTweets = function() {
  $.ajax("/tweets", {method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};

const $form = $('form');
$form.on('submit', function(event) {
  event.preventDefault()
  // console.log(event)
  $("#error-notification").slideUp();
  const value = $(this).find("#tweet-text").val();
    if (!value.trim()) { // event.target[0].value === ''
      $("#error-notification")
      .html("⚠ There must be something on your mind! ⚠").slideDown();
     }
    if (value.length > 140) { //event.target[0].value.length > 140
      $("#error-notification")// console.log("value --->", event.target[0].length)
      .html("⚠ Woah there! Take a breather and let's try this again! ⚠ ").slideDown();
    } else {

    $.ajax("/tweets", {
    method:"post",
    data: $("#post-tweet").serialize(),
    success: () => {
    $("#tweet-text").val('');
    $(".counter").val(140);
    loadTweets()}

  })
}
});
loadTweets();
});




