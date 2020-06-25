let player;

function loadScript() {
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}

function loadPlayer() {
  window.onYouTubePlayerAPIReady = function() {
    onYouTubeIframeAPIReady();
  };
}


$(function () {
  loadScript();
})

function onYouTubeIframeAPIReady() {
  const src = $('#player').data('src');

  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: src,
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function() {
    $('#play-button').hide();
    event.target.playVideo();
  });
}

loadPlayer();
