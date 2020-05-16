import fullpage from "fullpage.js";
import "tilt.js";

$(document).ready(function() {
  fullpage_init();
});


const current_slide__main = false;
const way = {
  begin: null,
  lenght: 0,
  direction: null,
}


const fullpage_init = function () {
  const video_model = document.getElementById('video');;
  let go_top = false;
  const delay = 2000;
  let timeoutId;
  const wait_after_move = {
    section: false,
    section_timer: false,
    slide: true,
    slide_timer: false,
    slide_play_video: false,
    time: 600,
  };


  const a_table = ['main', 'slider', 'prod', 'wrapper'];
  for (let i = 0; i < a_table.length; i++) {
    $('.section__'+ a_table[i] +'.active .aos-init').addClass('aos-animate');
  }

  const main_fullpage = new fullpage('#fullpage', {
    // responsiveWidth: 1000,
    anchors: ['one', 'two', 'three', 'four'],
    parallax: true,
    navigation: false,
    navigationTooltips: ['01', '02', '03'],
    showActiveTooltip: false,
    slidesNavigation: true,
    loopHorizontal: false,
    dragAndMove: true,
    fadingEffect: 'slides',
    normalScrollElements: '.section__bottom',
    lazyLoading: false,
    slidesNavPosition: 'left',
    afterLoad: function (origin, destination) {
      // смена больших слайдов

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

      // //////////////////////////////
      // if (!wait_after_move.section) {
      //   wait_after_move.section = false;
      //   wait_after_move.section_timer = setTimeout(function () {
      //     wait_after_move.section = false;
      //   }, wait_after_move.time)
      // }
      // //////////////////////////////
      // console.log(origin, destination);
      way.lenght = 0;

      if (destination.index == 1 && origin.index == 0) {
        wait_after_move.slide = false;
        wait_after_move.slide_timer = setTimeout(function () {
          wait_after_move.slide = false;
        }, wait_after_move.time)
        video_play(0, 'parent');
      }
      if (destination.index > 0) {
        $('#model').addClass('active')

      } else {
        $('#model').removeClass('active')
      }

      const a_table = ['main', 'slider', 'prod', 'wrapper'];
      for (let i = 0; i < a_table.length; i++) {
        $('.section__'+ a_table[i] +'.active .aos-init').addClass('aos-animate');
      }
    },
    onLeave: function (origin, destination, direction) {
      // выход из больших слайдов

      //////////////////////////////
      if (
        (origin.index == 1 && !$('.section__slide:first-child').hasClass('active') && destination.index == 0) ||
        (origin.index == 1 && !$('.section__slide:last-child').hasClass('active') && destination.index == 2))
      {
        return false;
      }
      // console.log(origin, destination, direction);
      if(destination.index == 2) {
        setTimeout(() => {
          $('.js-tilt').tilt({
            perspective: '1000',
            easing: 'linear'
          });
        }, 1000);
      }

      // if (origin.index == 0 && destination.index == 1) {
      //   wait_after_move.slide = false;
      // }
      // if (origin.index == 1 && destination.index == 0 && !go_top) {
      //   // video_play('parent', 0);
      //   // return false;
      // }
      //////////////////////////////
      // console.log('section_leave');

      if (origin.index == 3) {
        $('.header').removeClass('black')
      }
      if (destination.index == 3) {
        $('.header').addClass('black')
      }

      $('.aos-init').removeClass('aos-animate');
    },
    afterSlideLoad: function (section, origin, destination, direction) {
      // смена внутренних слайдов

      // //////////////////////////////
      way.lenght = 0;
      if (!wait_after_move.slide) {
        wait_after_move.slide = false;
        setTimeout(function () {
          wait_after_move.slide = false;
        }, wait_after_move.time)
      }
      // //////////////////////////////
      //
      // console.log('slide_load')
      // video_play(destination.index, origin.index);

      if(destination.index === 0 && direction === 'right') {
        video_play(0, 'parent');
      }
      if(destination.index === 0 && direction === 'left') {
        video_play('parent', 0);
      }
      if(destination.index === 1 && direction === 'right') {
        video_play(1, 0);
      }
      if(destination.index === 1 && direction === 'left') {
        video_play(0, 1);
      }
      if(destination.index === 2 && direction === 'right') {
        video_play(2, 1);
      }
      if(destination.index === 2 && direction === 'left') {
        video_play(1, 2);
      }


      $('.fp-slidesNav li').removeClass('active');
      for (let i = 0; i < $('.fp-slidesNav li').length; i++) {
        $('.fp-slidesNav li').eq(i).addClass('active')
        if ($('.fp-slidesNav li').eq(i).find('a').hasClass('active')) {
          i = $('.fp-slidesNav li').lenght;
        }
      }

    },
    onSlideLeave: function (section, origin, destination, direction) {
      // console.log('попытка перехода от', origin.index,' к ',destination.index,"состояние переменных ",wait_after_move)
      //////////////////////////////
      way.lenght = 0;
      // console.log(direction, destination.index);
      //
      if (wait_after_move.slide || wait_after_move.slide_play_video) {
        return false;
      }
      // //////////////////////////////
      //
      // console.log('slide_leave');
    }
  });
  let video_play;
  let playing = false;
  const play_video_path = function (start, stop, text, callback, first_f) {
    // console.log(text)
    try {
      video_model.pause();
      clearInterval(playing);
    } catch (e) {}

    if (first_f)
      first_f();
    wait_after_move.slide_timer = false;
    wait_after_move.slide_play_video = false;
    wait_after_move.slide = false;
    video_model.currentTime = start;

    video_model.oncanplay = function () {
      console.log('can played', text);
      // video_model.pause();
      video_model.play();

      playing = setInterval(() => {
        // console.log(video_model.currentTime);
        if (parseFloat(video_model.currentTime) > parseFloat(stop)) {
          video_model.pause();
          wait_after_move.slide = false;
          wait_after_move.slide_play_video = false;
          clearInterval(playing);
          if (callback)
            callback();
          video_model.oncanplay = null;
        }
      }, 10);
    }

  }

  video_play = function (number, leave) {
    /////
    if (number == 0 && leave == 'parent') {
      play_video_path(0, 4.05, 'play 1',
        // function () {
        //   go_top = false;
        // }
      )
    }
    //////
    if (number == 'parent' && leave == 0) {
      play_video_path(14.8, 18.8, 'play 1 reverse',
        // function () {
        //   wait_after_move.section = false;
        //   main_fullpage.moveSectionUp();
        // },
        // function () {
        //   wait_after_move.section = false;
        //   go_top = true;
        // }
      )
    }
    /////
    if (number == 1 && leave == 0) {
      play_video_path(4.05, 6.35, 'play 2')
    }
    /////
    if (number == 0 && leave == 1) {
      play_video_path(12.8, 14.8, 'play 2 reverse')
    }
    /////
    if (number == 2 && leave == 1) {
      play_video_path(6.3, 9, 'play 3')
    }
    /////
    if (number == 1 && leave == 2) {
      play_video_path(9.8, 12.3, 'play 3 reverse')
    }
  }


  $('.moveTo').click(function(){
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

  $('.section__bottom').scroll(function () {
    console.log('ss');
    if ($(this).scrollTop() == 0) {
      setTimeout(function () {
        main_fullpage.moveSectionUp();
      }, 100)
    }
  })
  function event_scroll() {
    function addHandler(object, event, handler) {
      if (object.addEventListener) {
        object.addEventListener(event, handler, false);
      }
      else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
      }
      else alert("Обработчик не поддерживается");
    }
    addHandler(window, 'DOMMouseScroll', wheel);
    addHandler(window, 'mousewheel', wheel);
    addHandler(document, 'mousewheel', wheel);

    function wheel(event) {
      let delta; // Направление колёсика мыши
      event = event || window.event;
      if (event.wheelDelta) { // В Opera и IE
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; // Дополнительно для Opera
      }
      else if (event.detail) { // Для Gecko
        delta = -event.detail / 3;
      }
      if (way.begin == null || way.direction != (delta > 0 ? 1 : -1)) {
        way.begin = event.wheelDelta;
        way.direction = delta > 0 ? 1 : -1
        way.lenght = 0;
      } else {
        way.lenght += Math.abs(event.wheelDelta);
      }
      slide_change(delta)
    }
  }
  event_scroll();
}
