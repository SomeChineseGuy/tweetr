$(document).ready(function () {

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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
  renderTweets(data);


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