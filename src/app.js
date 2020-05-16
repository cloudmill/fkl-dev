/* src/app.js */

// Styles
import "styles/_app.scss";


import "jquery-appear-original";
import ready from 'domready';
import AOS from 'aos';
import App from 'scripts/partial/scripts/App';

require("scripts/fullpageIndex");
require("scripts/jquery.maskedinput.min.js");

$(document).ready(() => {
  require("scripts/header");
  require("scripts/pages");


  setTimeout(() => appearBlock(0), 1600);
  setTimeout(() => AOS.init(), 1600);
});


window.addEventListener("resize", function() {
  appearBlock(0);
  AOS.init();
  window.scrollTo(0, 0); // TODO: do not forget to UNcomment it
}, false);

require("scripts/main");

if(document.getElementsByClassName("page404").length) {
  require("scripts/page404");
}

function appearBlock(loaderTimeOut) {
  $('.animated').appear(function() {
    const elem = $(this);
    const animation = elem.data('animation');

    if ( !elem.hasClass('visible') ) {
      const animationDelay = elem.data('animation-delay');
      if ( animationDelay ) {
        setTimeout(function(){
          elem.addClass( animation + " visible" );
        }, animationDelay + loaderTimeOut);

      } else {
        elem.addClass( animation + " visible" );
      }
    }
  });
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

      if($('#particle_photo').length) {
        ready(() => {
          window.app = new App();
          window.app.init();
        });
      }

    }, 500);

    window.scrollTo(0, 0); // goTo the top after reload
  }, 1100);
});

require("scripts/maps");
