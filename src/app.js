/* src/app.js */

// Styles
import "../src/assets/styles/_app.scss";


import ready from 'domready';
import browser from 'browser-detect';
import AOS from 'aos';
import App from '../src/assets/scripts/partial/scripts/App';

require("../src/assets/scripts/fullpageIndex");
require("../src/assets/scripts/jquery.maskedinput.min.js");

const browserDetect = browser();

$(document).ready(() => {
  require("../src/assets/scripts/header");
  require("../src/assets/scripts/pages");

  // backend
  require("../src/assets/scripts/backend");

  setTimeout(() => AOS.init({
    offset: 50,
  }), 1600);

  $('body').addClass(browserDetect.name);
});


window.addEventListener("resize", function() {
  AOS.init({
    offset: 50,
  });
  // window.scrollTo(0, 0); // TODO: do not forget to UNcomment it
}, false);

require("../src/assets/scripts/main");

if(document.getElementsByClassName("page404").length) {
  require("../src/assets/scripts/page404");
}


// mobile sctipts
const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
if (screen_width <= 767) {
}
// mobile sctipts


$(window).on("load", function() {
  $('.loader-outer').addClass('active');
  $('body').css('overflow', 'hidden');
  setTimeout(function() {
    $('body').css('overflow', 'visible');
    $('.loader').addClass('hidden');
    setTimeout(function() {
      $('.loader').css('z-index', '-999');

      $('.sitebar-inner').addClass('aos-animate'); // The hack for some browsers that don't show block

      if($('#particle_photo').length) {
        ready(() => {
          window.app = new App();
          window.app.init();
        });
      }

    }, 500);

    // window.scrollTo(0, 0); // goTo the top after reload
  }, 1100);
});

require("../src/assets/scripts/maps");
