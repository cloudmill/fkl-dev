import AOS from "aos";
import {fullpage_init} from './fullpageIndex';


// anchor
$('.anchor').on('click', 'a', function(event) {
  event.preventDefault();
  $('.anchor a').removeClass('active');
  const id = $(this).attr('href');
  const top = $(id).offset().top;
  $(this).addClass('active');
  $('body,html').animate({scrollTop: top - 180}, 1000);

  setTimeout(() => {
    $(id).find('.accordion-header')
      .addClass("active")
      .next()
      .slideDown();
  }, 1000);
});
// anchor

const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);

// search
$(".sitebar_search").click(function() {
  $(".searchBar").addClass("active");
  $(".searchBar").find('input').focus();
});
$(".searchBar__close").click(function() {
  $(".searchBar").removeClass("active");
});
$(document).mouseup(function (e) {
  const container = $(".searchBar.active");
  if (container.has(e.target).length === 0){
    container.removeClass("active");
  }
});
// search

$(document).keyup(function(e) {
  if($('.searchBar, .menuBar').hasClass('active')) {
    if (e.key === "Escape") {
      $(".searchBar, .menuBar").removeClass("active");
      if(screen_width >= 1240) {
        fullpage_init();
      }
      $("body").css("overflow", 'visible');
      $(".menuBar-item").removeClass("visible slideInUp");
    }
  }
});

// sidemenu
$(".sitebar__sect_menu, .main-nav__toggle--js").click(function() {
  $("body").css("overflow", 'hidden');
  $(".menuBar").addClass("active");

  if(($(this).attr('class') !== 'main-nav__toggle--js')) {
    setTimeout(() => {
      $(".menuBar-item").addClass("visible slideInUp");
      if(screen_width >= 1240) {
        fullpage_api.destroy('all');
      }
    }, 1000);
  }
});
$(".menuBar__close, .menuBar__closeMob").click(function() {
  $("body").css("overflow", 'visible');
  $(".menuBar").removeClass("active");
  if(($(this).attr('class') !== 'menuBar__closeMob')) {
    if(screen_width >= 1240) {
      fullpage_init();
    }
  }
  $(".menuBar-item").removeClass("visible slideInUp");
});
// sidemenu

$(".open--js").click(function() {
  $(this).toggleClass('active');
  $(this).next().toggleClass('active');
});

if (screen_width <= 767) {
  $(".mainTitle--subNav h1").click(function() {
    $(this).toggleClass('active');
    $('.subNav').slideToggle();
    setTimeout(() => AOS.init({
      offset: 50,
    }), 500);
  });
}

$(".aside__header").click(function() {
  $(this).toggleClass('active');
  $(this).next().slideToggle();
});

$(".showForm--js").click(function() {
  $(this).hide();
  $(this).parent().find('.main-content--form').show(500);

  return false;
});

// Hide Header on on scroll down
$(function(){
  let lastScrollTop = 0, delta = 5;
  $(window).scroll(function(){
    const st = $(this).scrollTop();
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    if (st > lastScrollTop && lastScrollTop > 0){
      $("header").addClass('nav-up');
    } else {
      $("header").removeClass('nav-up');
    }
    lastScrollTop = st;
  });
});

$(document).ready(function () {
  const $horizontal = $('.about__section-img');
  if($horizontal.length) {
    const $horizontalImg = $('.about__section-img img');
    const startPosition = $horizontal.position().left;
    const speed = 300;
    $(window).scroll(function () {
      const st = $(this).scrollTop();
      const newPos = (st * (speed / 100)) - startPosition;
      $horizontal.css({
        'right': newPos > 0 ? 0 : newPos
      });
      $horizontalImg.css({"transform": `rotate(${-window.pageYOffset}deg)`});
    });
  }
});
