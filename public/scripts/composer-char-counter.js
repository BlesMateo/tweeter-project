/* <-- Function that implements character counter for tweet compose form --> */

$(document).ready(function() {

  $("#tweet-text").on('keyup', function() {
    let charLength = $(this).val().length;
    let charLimit = 140;
    let charLeft = charLimit - charLength;

    console.log(charLeft);
    $(".counter").text(charLeft);

    if (charLeft < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "white");
    }

  });
});