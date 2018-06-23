
 $('document').ready(function () {

//// *******************************************
///* Functions that allow tweets to be created,
///loaded onto the interface, tweet form reset, etc.
/// ********************************************

  function renderTweets(tweets) {
    $('.tweet-container').empty();
    for(singleTweet of tweets) {
    $('.tweet-container').prepend(createTweetElement(singleTweet));
    }
  }

// ***************************************** //
 function createTweetElement(tweetData) {

  const $article = $('<article>');
  const $header = $('<header>');
  const $avatar = $('<img>').attr('src', tweetData.user.avatars.small);
  const $user = $('<h1>').text(tweetData.user.name);
  const $handle = $('<p>').addClass('handle').text(tweetData.user.handle);
  const $textBody = $('<div>').addClass('tweet-text');
  const $actualTweet = $('<p>').text(tweetData.content.text);
  const $footer = $('<footer>');
  const $icons = $('<div>').addClass('tweet-icons');
  const $retweet = $('<i class="fas fa-retweet">');
  const $flag = $('<i class="fab fa-font-awesome-flag">');
  const $heart = $('<i class="fas fa-heart">');
  const $footerDate = $('<p>').text(moment(tweetData.created_at).fromNow());


  $header.append($avatar).append($user).append($handle);
  $textBody.append($actualTweet);
  $icons.append($retweet).append($flag).append($heart);
  $footer.append($footerDate).append($icons);
  $article.append($header).append($textBody).append($footer);

  return $article;
 }

// ***************************************************** //
//Form Submission using AJAX to load tweets dynamically
$('#tweet-form').on('submit', event => {
  event.preventDefault();
  const tweetLength = $('textarea').val();
  const $divError = $('<div>').addClass('error');
  const $errorMsg = $('<p>').text('Please enter some text to continue.');
  const $errorMsg2 = $('<p>').text('Your tweet may not exceed 140 characters.');

  $('.error').text("");

  if (tweetLength.length === 0) {

    $divError.append($errorMsg);
    $(event.target).append($divError);
   } else if (tweetLength.length > 140) {
    ($divError).append($errorMsg2);
    $(event.target).append($divError);
    console.log('Your tweet may not exceed 140 characters.');

   } else {
    $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $(event.target).serialize(),
    success: function () {
    loadTweets();
    resetForm(event.target);
    }
  });
 }
});


// ************************** //
  function loadTweets() {
    $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (content) {
    renderTweets(content);
    $('textarea').val(null);
    }
   });
  }

    loadTweets();


 // ***************************************** //
  //Function to clear the textarea and reset the
  //counter to 140 after a tweet have been submitted.
  function resetForm(form) {
    $('textarea').val(null);
    $(form).find('.counter').text(140);
  }

  // ************************************* //
  //Functionality which allows users to click a
  //'Compose' button to reveal the textarea
  //with the cursor in the textbox.
  $('.nav-button').click(function () {
  $('.new-tweet').slideToggle(150);
  $('textarea').focus();
 });

});







































