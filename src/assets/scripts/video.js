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


const playerInfoList = [];

const getArray = function() {
  for (let x = 0; x < $(".player").length; x++) {
    const src = $(".player").eq(x).data("src");
    const id = $(".player").eq(x).attr("id");
    playerInfoList.push({id: id, videoId: src});
  }
}

getArray();

const playerDivs = document.querySelectorAll(".player");
const playerDivsArr = [].slice.call(playerDivs);
const players = new Array(playerDivsArr.length);
// const waypoints = new Array(playerDivsArr.length);

// when youtube stuff is ready
function onYouTubeIframeAPIReady() {

  // create yt players
  playerInfoList.forEach(function(e, i) {
    players[i] = new YT.Player(e.id, {
      height: '100%',
      width: '100%',
      videoId: e.videoId,
      events: {}
    })
  })

  $(".play-button").click(function() {
    $(this).hide();
    const num = $(this).data('num');
    players[num].playVideo();
  })

}

loadPlayer();
