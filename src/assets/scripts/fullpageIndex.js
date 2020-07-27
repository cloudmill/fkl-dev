import fullpage from './fullpage';
import browser from 'browser-detect';

const browserDetect = browser();

const video_model = document.getElementById('video');
const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
const getSrc = process.env.NODE_ENV === 'development'
  ? 'assets/images/video/video.mp4'
  : '/local/templates/main/assets/images/video/video.mp4'

const getAdaptiveWidth = screen_width >= 1240;
let video_play;
let playing = false;

const way = {
  begin: null,
  lenght: 0,
  direction: null,
};
let go_top = false;
const wait_after_move = {
  section: false,
  section_timer: false,
  slide: true,
  slide_timer: false,
  slide_play_video: false,
  time: 600,
};

if (browserDetect.name !== 'ie' || browserDetect.name !== 'edge') {
  require("./tilt.jquery");
}

$(document).ready(function() {
  if(getAdaptiveWidth) {
    if(video_model) {
      onloadVideo(video_model, getSrc);
    }
    fullpage_init();
  } else {
    if(video_model) {
      onloadVideo(video_model, getSrc);
      video_model.autoplay = true;
      video_model.loop = true;
      video_model.play();
      video_model.play();
    }
  }
});
$(window).on("orientationchange", function() {
  setTimeout(() => {
    const getWidth = $(window).width();
    const isLandscape = window.orientation === 90 || window.orientation === -90;
    if (getWidth >= 1240 && isLandscape) {
      video_model.autoplay = false;
      video_model.loop = false;
      video_model.pause();
      video_model.currentTime = 0;
      fullpage_init();
      setTimeout(() => {
        window.location.hash = '#one';
      }, 1000);
    } else {
      fullpage_api && fullpage_api.destroy('all');
      video_play = () => {};
      video_model.autoplay = true;
      video_model.loop = true;
      video_model.play();
    }
  }, 500);
});



export const fullpage_init = function() {
  const a_table = ['main', 'slider', 'prod', 'wrapper'];
  for (let i = 0; i < a_table.length; i++) {
    $('.section__' + a_table[i] + '.active .aos-init').addClass('aos-animate');
  }

  const getLogoSrc = process.env.NODE_ENV === 'development'
    ? 'assets/images/logo_blue.svg'
    : '/local/templates/main/assets/images/logo_blue.svg'
  const getLogoSrcWhite = process.env.NODE_ENV === 'development'
    ? 'assets/images/logo.svg'
    : '/local/templates/main/assets/images/logo.svg'

  const main_fullpage = new fullpage('#fullpage', {
    anchors: ['one', 'two', 'three', 'four'],
    parallax: true,
    navigation: false,
    navigationTooltips: ['01', '02', '03'],
    showActiveTooltip: false,
    slidesNavigation: true,
    loopHorizontal: false,
    css3: true,
    fadingEffect: 'slides',
    normalScrollElements: '.section__wrapper',
    fitToSection: true,
    fitToSectionDelay: 2000,
    responsiveWidth: 1240,
    slidesNavPosition: 'left',
    afterLoad: function(origin, destination) {
      // смена больших слайдов
      go_top = false;
      if (
        origin.index === 0 && destination.index === 0
        || origin.index === 1 && destination.index === 0
        || origin.index === 1 && destination.index === 2
        || origin.index === 2 && destination.index === 2
        || origin.index === 3 && destination.index === 3
      ) {
        wait_after_move.section = true;
      }
      if (origin.index == 0 && destination.index == 1) {
        setTimeout(() => wait_after_move.section = false, 800);
      }
      if (origin.index == 2 && destination.index == 1) {
        setTimeout(() => wait_after_move.section = false, 800);
      }

      way.lenght = 0;

        if (destination.index == 1 && origin.index == 0) {
          wait_after_move.slide = false;
          wait_after_move.slide_timer = setTimeout(function() {
            wait_after_move.slide = false;
          }, wait_after_move.time);
          video_play(0, 'parent');
        }
        if (destination.index == 1 && origin.index == 2) {
          video_play(1, 2);
        }
      if (destination.index > 0) {
        $('#model').addClass('active');

      } else {
        $('#model').removeClass('active');
      }
        const a_table = ['main', 'slider', 'prod', 'wrapper'];
        for (let i = 0; i < a_table.length; i++) {
          $('.section__' + a_table[i] + '.active .aos-init').addClass('aos-animate');
        }
      if (origin.index == 2 && destination.index == 3) {
        setTimeout(() => go_top = true, 500);
      }

      if (screen_width >= 1366) {
        if (origin.index == 2 && destination.index == 3) {
          $(".section__bottom").animate({scrollTop: 0}, 0);
        }
      }

    },
    onLeave: function(origin, destination) {
      // выход из больших слайдов
      if (
        (origin.index == 1 && !$('.section__slide:first-child').hasClass('active') && destination.index == 0) ||
        (origin.index == 1 && !$('.section__slide:last-child').hasClass('active') && destination.index == 2)) {
        return false;
      }

      if (destination.index == 2) {
        if (browserDetect.name !== 'ie' || browserDetect.name !== 'edge') {
          setTimeout(() => {
            $('.js-tilt').tilt({
              perspective: '1000',
              easing: 'linear'
            });
          }, 100);
        }
      }

      if (origin.index == 3) {
        $('.header').removeClass('black');
        $('.header__logo img').attr('src', getLogoSrcWhite);
      }
      if (destination.index == 3) {
        $('.header').addClass('black');
        $('.header__logo img').attr('src', getLogoSrc);
      }
      $('#fullpage .aos-init').removeClass('aos-animate');
    },
    afterSlideLoad: function(section, origin, destination, direction) {
      // смена внутренних слайдов

      // //////////////////////////////
      way.lenght = 0;
      if (!wait_after_move.slide) {
        wait_after_move.slide = false;
        setTimeout(function() {
          wait_after_move.slide = false;
        }, wait_after_move.time);
      }
      // //////////////////////////////

      $('.fp-slidesNav li').removeClass('active');
      for (let i = 0; i < $('.fp-slidesNav li').length; i++) {
        $('.fp-slidesNav li').eq(i).addClass('active');
        if ($('.fp-slidesNav li').eq(i).find('a').hasClass('active')) {
          i = $('.fp-slidesNav li').lenght;
        }
      }

    },
    onSlideLeave: function(section, origin, destination, direction) {
      //////////////////////////////

      if (destination.index === 0 && direction === 'right') {
        video_play(0, 'parent');
      }
      if (destination.index === 0 && direction === 'left') {
        video_play('parent', 0);
      }
      if (destination.index === 1 && direction === 'right') {
        video_play(1, 0);
      }
      if (destination.index === 1 && direction === 'left') {
        video_play(0, 1);
      }
      if (destination.index === 2 && direction === 'right') {
        video_play(2, 1);
      }
      if (destination.index === 2 && direction === 'left') {
        video_play(1, 2);
      }

      way.lenght = 0;
      //
      if (wait_after_move.slide || wait_after_move.slide_play_video) {
        return false;
      }
      // //////////////////////////////
    }
  });

  const play_video_path = function(start, stop, text, callback, first_f) {
    try {
      video_model.pause();
      clearInterval(playing);
    } catch (e) {
    }

    if (first_f) {
      first_f();
    }
    wait_after_move.slide_timer = false;
    wait_after_move.slide_play_video = false;
    wait_after_move.slide = false;
    video_model.currentTime = start;
    if (!browserDetect.mobile) {
      if (browserDetect.name === 'safari' || browserDetect.name === 'edge') {
        video_model.play();
        playing = setInterval(() => {
          if (parseFloat(video_model.currentTime) > parseFloat(stop)) {
            video_model.pause();
            wait_after_move.slide = false;
            wait_after_move.slide_play_video = false;
            clearInterval(playing);
            if (callback) {
              callback();
            }
          }
        }, 10);
      } else {
        video_model.oncanplay = function() {
          video_model.play();

          playing = setInterval(() => {
            if (parseFloat(video_model.currentTime) > parseFloat(stop)) {
              video_model.pause();
              wait_after_move.slide = false;
              wait_after_move.slide_play_video = false;
              clearInterval(playing);
              if (callback) {
                callback();
              }
              video_model.oncanplay = null;
            }
          }, 10);
        };
      }
    }
  };

  video_play = function(number, leave) {
    if (number == 0 && leave == 'parent') {
      play_video_path(0, 4.05, 'play 1',
      );
    }
    if (number == 'parent' && leave == 0) {
      play_video_path(14.8, 18.8, 'play 1 reverse',
      );
    }
    if (number == 1 && leave == 0) {
      play_video_path(4.05, 6.35, 'play 2');
    }
    if (number == 0 && leave == 1) {
      play_video_path(12.8, 14.8, 'play 2 reverse');
    }
    if (number == 2 && leave == 1) {
      play_video_path(6.6, 9, 'play 3');
    }
    if (number == 1 && leave == 2) {
      play_video_path(9.8, 12.3, 'play 3 reverse');
    }
  };

  $('.moveTo').click(function() {
    fullpage_api.moveTo('four');
    fullpage_api.moveTo('three');

    return false;
  });

  function slide_change(delta) {
    if (
      !wait_after_move.slide
      && !wait_after_move.section
      && delta && way.lenght > 50
      && main_fullpage.getActiveSection().index == 1
    ) {
      way.lenght = 0;
      if (delta > 0) {
        $('.fp-controlArrow.fp-prev').click();
      } else {
        $('.fp-controlArrow.fp-next').click();
      }

    }
  }

  event_scroll(slide_change);
};

function event_scroll(slide_change) {
  function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    } else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    } else {
      alert('Обработчик не поддерживается');
    }
  }

  addHandler(window, 'DOMMouseScroll', wheel);
  addHandler(window, 'mousewheel', wheel);
  addHandler(document, 'mousewheel', wheel);

  let clientY;
  window.addEventListener('touchstart', function(e) {
    clientY = e.touches[0].clientY;
  }, false);
  window.addEventListener('touchend', function(e) {
    let deltaY;
    deltaY = e.changedTouches[0].clientY - clientY;

    if (way.begin == null || way.direction != (deltaY > 0 ? 1 : -1)) {
      way.begin = deltaY;
      way.direction = deltaY > 0 ? 1 : -1;
      way.lenght = 0;
    } else {
      way.lenght += Math.abs(deltaY);
    }

    slide_change(deltaY);

    if(!browserDetect.mobile && $('#fullpage').hasClass('fullpage-wrapper') && $('body').hasClass('fp-viewing-four')) {
      if ($('.section__bottom').scrollTop() === 0) {
        fullpage_api.setMouseWheelScrolling(true);
        fullpage_api.setAllowScrolling(true);

        if (go_top && deltaY > 0 && (screen_width > 767 || screen_width < 1366 && browserDetect.name === 'safari')) {
          fullpage_api.moveSectionUp();
        }
      } else {
        fullpage_api.setMouseWheelScrolling(false);
        fullpage_api.setAllowScrolling(false);
      }
    }
  }, false);


  function wheel(event) {
    let delta; // Направление колёсика мыши
    event = event || window.event;
    if (event.wheelDelta) { // В Opera и IE
      delta = event.wheelDelta / 120;
      if (window.opera) delta = -delta; // Дополнительно для Opera
    } else if (event.detail) { // Для Gecko
      delta = -event.detail / 3;
    }
    if(getAdaptiveWidth) {

      if (way.begin == null || way.direction != (delta > 0 ? 1 : -1)) {
        way.begin = event.detail ? event.detail * (-120) : event.wheelDelta;
        way.direction = delta > 0 ? 1 : -1;
        way.lenght = 0;
      } else {
        way.lenght += Math.abs(event.detail ? event.detail * (-120) : event.wheelDelta);
      }
      slide_change(delta);

      if ($('#fullpage').hasClass('fullpage-wrapper') && $('body').hasClass('fp-viewing-four')) {
        console.log($('.section__bottom').scrollTop());
        if ($('.section__bottom').scrollTop() === 0) {
          fullpage_api && fullpage_api.setMouseWheelScrolling(true);
          fullpage_api && fullpage_api.setAllowScrolling(true);
        } else {
          fullpage_api && fullpage_api.setMouseWheelScrolling(false);
          fullpage_api && fullpage_api.setAllowScrolling(false);
        }
      }
    }
  }
}

function onloadVideo(videoTag, src) {
  const xhrReq = new XMLHttpRequest();
  xhrReq.open('GET', src, true);
  xhrReq.responseType = 'blob';

  xhrReq.onload = function() {
    if (this.status === 200) {
      const vid = URL.createObjectURL(this.response);
      videoTag.src = vid;
    }
  };
  xhrReq.onerror = function() {
    console.log('err', arguments);
  };
  xhrReq.onprogress = function(e) {
    if (e.lengthComputable) {
      const percentComplete = ((e.loaded / e.total) * 100 | 0) + '%';
      console.log('progress: ', percentComplete);
    }
  }
  xhrReq.send();
}
