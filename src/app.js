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

const MobileDetect = require('mobile-detect');
const md = new MobileDetect(window.navigator.userAgent);

$(document).ready(() => {
  require("../src/assets/scripts/header");
  require("../src/assets/scripts/pages");

  // backend
  require("../src/assets/scripts/backend");

  $('body').addClass(browserDetect.name);
  $('body').addClass(browserDetect.os);


  // iPad scripts
  if (md.tablet() === 'iPad') {
    $('.header__menu-el--parent .header__menu__item').click(function(e) {
      e.preventDefault();
    })
  }
  // iPad scripts

  require("../src/assets/scripts/video");
});

$(function() {
  $("#search").focus();
  $(".editPassword-form input#email").focus();
  $(".registr-info input#name").focus();
  $(".login-info input#email").focus();
  $(".step-info input#names").focus();
});

window.addEventListener("resize", function() {
  AOS.init({
    offset: 50,
  });

}, false);

require("../src/assets/scripts/main");

if(document.getElementsByClassName("page404").length) {
  require("../src/assets/scripts/page404");
}



$(window).on("load", function() {
  const url = window.location.origin;
  const href = window.location.href;
  const getSecondSlide = url + '/#two';
  const getThirdSlide = url + '/#three';
  const getFourthSlide = url + '/#four';

  if(getSecondSlide === href || getThirdSlide === href || getFourthSlide === href) {
    window.location.hash = '#one';
  }

  if($(".loader").length) {
    setTimeout(() => AOS.init({
      offset: 50,
    }), 1600);

    $('.loader-outer').addClass('active');
    $('body').css('overflow', 'hidden');
    $('body').css('opacity', '1');

    setTimeout(function() {
      $('body').css('overflow', 'visible');
      $('.loader').addClass('hidden');
      setTimeout(function() {
        $('.loader').css('z-index', '-999');

        $('.sitebar-inner').addClass('animateMe'); // The hack for safari browser that doesn't show the block

        if ($('#particle_photo').length) {
          ready(() => {
            window.app = new App();
            window.app.init();
          });
        }

      }, 500);

      window.scrollTo(0, 0); // goTo the top after reload
    }, 1100);
  } else {
    AOS.init({
      offset: 50,
    });
    $('body').css('overflow', 'visible');
    $('body').css('opacity', '1');
    $('.sitebar-inner').addClass('animateMe'); // The hack for safari browser that doesn't show the block
  }
});

require("../src/assets/scripts/maps");
