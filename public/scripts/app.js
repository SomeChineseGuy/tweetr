$(document).ready(function () {

  $('.new-tweet').slideUp(1);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  $("nav input").on("click", function() {
    $(".new-tweet").slideToggle(300);
  });

  function createTweetElement(tweet) {
    console.log(tweet);
    const $avatar = $('<img/>', { src: tweet.user.avatars.regular }).addClass("avatar");
    const $name = $('<h2/>', { text: tweet.user.handle }).addClass("name");
    const $username = $('<span/>', { text: tweet.user.handle }).addClass("user-name");
    const $tweetmsg = $('<p/>', { text: tweet.content.text }).addClass("tweetmsg");
    const $timeStamp = $('<span/>', { text: timeSince(tweet.created_at) }).addClass("time-stamp");
    const $flag = $('<i/>').addClass("fa fa-flag");
    const $retweet = $('<i/>').addClass("fa fa-retweet");
    const $heart = $('<i/>').addClass("fa fa-heart");
    const $icons = $('<div/>').addClass('icons');
    const $footer = $('<footer/>');
    const $head = $('<header/>');
    const $article = $('<article/>').addClass('tweeting');
    const $section = $('<section/>');
    $head.append($avatar, $name, $username);
    $icons.append($flag, $retweet, $heart);
    $footer.append($timeStamp, $icons);
    $article.append($head, $tweetmsg, $footer);
    $section.append($article);
    return $section;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }



  function formValidation(input) {
    return !(input.length === 0 || input.length > 140);
  }


  function loadTweets (){
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).done(renderTweets);
    $('.new-tweet textarea').val("");
    $(".counter").text("140");
  }

  $('.new-tweet form').on('submit', function (e) {
    e.preventDefault();
    $('.validation').css('visibility', 'visible');
    if (formValidation($('.new-tweet textarea').val())) {
      $('.validation').css('visibility', 'hidden');
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(loadTweets);
    }
  });
  loadTweets();
});