$(document).ready(function() {
  //the widget for twitter button. 
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
  //Create starting quote as place holder, would like to have a random quote
  //generated in the future. Works for now though.
  var quoteAppend = "You are never too small or old for anything.";
  var authorAppend = 'Favour Kelvin';

  //Generates the html and  the css attributes.trying to play around jquery
  $("#content").html("<div class='col-md-6 col-md-offset-3'><div><div id='quote'></div><div class='row'><div class='col-md-offset-6'><div id='author'></div></div></div></div><div><a href='#' id='getQuote' class='btn btn-default btn-lg'>Get Quote</a></div><div><a id='tweetThis' href='https://twitter.com/share' class='twitter-share-button' data-text='thisText' data-size='large' data-hashtags='Quotes'>Tweet</a></div>");
  $("body").css({
    "background-image": "url('https://wallpapercave.com/wp/jiRRpeQ.jpg')",
    "font-family": "Inconsolata"
  });
 $("div").css({"padding-top": ".2em", "padding-bottom": ".2em"});
  $("#getQuote").css({"background-color": "rgba(0,0,0,.4)", "color": "black","font-weight": "500"});
  // the initial quote and author.
  $("#quote").html('"' + quoteAppend + '"')
    .css({
      "font-size": "3em",
      "color": "pink",
    "text-align": "center",
    "margin-top": "4em"
    });
  $("#author").html('-' + authorAppend).css({
    "font-size": "1.5em",
    "color": "black",
    "font-weight": "400"
  });
  $("#tweetThis").attr("data-text", quoteAppend + "-" + authorAppend);

  //The click function that fetches the quote and author and sets them to the variables
  $("#getQuote").click(function() {

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(result) {
      var arr = $.map(result, function(el) {
        return el
      });
      quoteAppend = arr[0];
      authorAppend = arr[1];
      $("#quote").html('"' + quoteAppend + '"');
      $("#author").html('-' + authorAppend);
      //code for resetting iframe to dynamically change the twitter info
      $('#tweetBtn iframe').remove();
      var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'https://twitter.com/share')
        .attr('data-size', 'small')
        .attr('data-text', quoteAppend + "-" + authorAppend);
      $('#tweetBtn').append(tweetBtn);
      twttr.widgets.load();

    });

  });
});