import "slick-carousel";
import "magnific-popup";
import "select2";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min";
import AOS from "aos";

// $(document).on("click", ".about__video--ico", function() {
//   $(this).hide();
//   const $video = $("#videoNew"),
//     src = $video.attr("src");
//   console.log(src);
//
//   $video.attr("src", src + "&autoplay=1");
// });


const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);

$(document).ready(function() {
  slidersMain();
  slidersMain2();
  slidersMain3();
  slidersCard();
  slidersForNav();
  slidersAbout($(".sliderAbout"));
  slidersAboutRtl();
  slidersTechCard();
  slidersAboutPeople();
  progressList();
  sliderInside();

  $(".scrollContent").mCustomScrollbar();

  // popup
  $(".popup-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find("img");
      },
    },
  });
  $(document).on("click", ".popup-modal-dismiss", function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // accordion
  $(".accordion").on("click", ".accordion-header", function() {
    // $(this).next().fadeOut();
    $(this)
      .toggleClass("active")
      .next()
      .slideToggle();

    setTimeout(() => AOS.refresh(), 500);
  });

  // tabs
  $(".tabs-list").on("click", ".tab", function(e) {
    e.preventDefault();
    const href = $(this).attr("href");

    $(this)
      .closest(".tabs")
      .find(".tabs-list .tab")
      .removeClass("active");
    $(this)
      .closest(".tabs")
      .find("> .tabs-content")
      .removeClass("show");
    $(this).addClass("active");
    $(href).addClass("show");

    if(screen_width > 767) {
      $('.section__bottom__slider').slick("setPosition", 0);
      $('.sliderAbout').slick("setPosition", 0);
    } else {
      $('html, body').animate({
        scrollTop: $(href).offset().top
      }, 500);
    }

    AOS.init({
      offset: 50,
    });
  });

  // select
  function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    const tip = $(state.element).data("tip");
    const $state = tip
      ? $(
        "<span>" +
        state.text +
        '</span> <span class="desc">' +
        tip +
        "</span>"
      )
      : $("<span>" + state.text + "</span>");
    return $state;
  }

  $(".select").select2({
    templateResult: formatState,
  });
  $(".select").on("select2:open", function() {
    $("input.select2-search__field").prop(
      "placeholder",
      "Начните вводить"
    );
    $(".select2-dropdown").hide();
    setTimeout(function() {
      $(".select2-dropdown").slideDown("slow");
    }, 200);
    setTimeout(function() {
      $("input.select2-search__field").focus();
    }, 500);
  });

  $(".showMore--js").click(function() {
    $(this)
      .hide()
      .parent()
      .find(".hidden-content")
      .slideDown();
    return false;
  });

  // input[type=file]
  $(".input__file-js").change(function() {
    $(".input__file-js").each(function() {
      const name = this.value;
      const reWin = /.*\\(.*)/;
      let fileTitle = name.replace(reWin, "$1");
      const reUnix = /.*\/(.*)/;
      fileTitle = fileTitle.replace(reUnix, "$1");
      $(this)
        .parent()
        .parent()
        .find(".input__name-js")
        .val(fileTitle);
      $(this)
        .parent()
        .find(".btn")
        .text(`Загружено ${fileTitle}`);
    });
  });
  // input[type=file]

  $("input[type='radio']").change(function() {
    const getData = $(this).attr("id");
    if (getData === "delivery2") {
      $(".select--js").slideDown();
    } else {
      $(".select--js").slideUp();
    }
  });


  $(".slider-for").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    const num = nextSlide + 1;
    const li = $(`.appendDots .slick-dots li:nth-child(${num})`);
    const getPosition = li.position().left;
    const getWidth = li.width();
    const getHeight = li.height();
    if (screen_width <= 1239) {
      $(".appendDots span").css({
        left: getWidth > 80 ? getPosition - 5 : getPosition,
        width: getWidth > 80 ? getWidth + 10 : getWidth,
        height: getHeight,
      });
    } else {
      $(".appendDots span").css({
        left: getPosition,
      });
    }
  });

});

// sliders
const slidersMain = function() {
  $(".section__bottom__slider1").slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    speed: 1000,
    dots: false,
    arrows: true,
    nextArrow: $(".slick-next1"),
    prevArrow: $(".slick-prev1"),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  });
};
const slidersMain2 = function() {
  $(".section__bottom__slider2").slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    speed: 1000,
    dots: false,
    arrows: true,
    nextArrow: $(".slick-next2"),
    prevArrow: $(".slick-prev2"),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  });
};
const slidersMain3 = function() {
  $(".section__bottom__slider3").slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    speed: 1000,
    dots: false,
    arrows: true,
    nextArrow: $(".slick-next3"),
    prevArrow: $(".slick-prev3"),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  });
};
const slidersCard = function() {
  $(".section__card__slider").slick({
    slidesToScroll: 4,
    slidesToShow: 4,
    speed: 1000,
    dots: false,
    arrows: true,
    nextArrow: $(".slick-next"),
    prevArrow: $(".slick-prev"),
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
};
const progressList = function() {
  $(".progress-listSlider").slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 1000,
    dots: false,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  });
};

const slidersAboutPeople = function() {
  $(".sliderAboutPeople").slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 1000,
    dots: false,
    arrows: true,
    nextArrow: $(".nextPeople"),
    prevArrow: $(".prevPeople"),
    asNavFor: '.slider-for',
  });
};


const sliderInside = function() {
  $('.sliderInside').slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: true,
  });
};

const slidersTechCard = function() {
  const $slickElement = $(".slidersTechCard");

  $slickElement.slick({
    slidesToScroll: 1,
    slidesToShow: 1,
    dots: true,
    speed: 1000,
    arrows: true,
    // fade: true,
    infinite: true,
    cssEase: "ease-in-out",
    touchThreshold: 100,
    nextArrow: $(".nextTech"),
    prevArrow: $(".prevTech"),
    autoplay: true,
    autoplaySpeed: 5000,
    customPaging: function() {
      return '<div class="circle-loader-wrap"><div class="left-wrap"><div class="circle"></div></div><div class="right-wrap"><div class="circle"></div> </div></div>';
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          variableWidth: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: false,
        },
      },
    ],
  });
};

const slidersAbout = function(item) {
  const $status = $(".pagingInfo .counter");
  const $statusF = $(".pagingInfo .counter span:first-child");
  const $statusL = $(".pagingInfo .counter span:last-child");
  const $length = $(".pagingInfo .length");

  item.on("init reInit afterChange", function(
    event,
    slick,
    currentSlide
  ) {
    const i = (currentSlide ? currentSlide : 0) + 1;
    const t =
      Math.ceil(slick.slideCount / 2) === Math.ceil(i / 2)
        ? 1
        : Math.ceil(i / 2) + 1;
    $status.addClass("active");
    $statusF.html(Math.ceil(i / 2));
    $statusL.html(t);
    $length.html(` / ${Math.ceil(slick.slideCount / 2)}`);
  });
  item.on("beforeChange", function() {
    $status.removeClass("active");
  });

  item.slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    dots: true,
    speed: 1000,
    arrows: false,
    infinite: true,
    cssEase: "ease-in-out",
    touchThreshold: 100,
    variableWidth: true,
    autoplaySpeed: 5000,
    customPaging: function() {
      return '<div class="circle-loader-wrap"><div class="left-wrap"><div class="circle"></div></div><div class="right-wrap"><div class="circle"></div> </div></div>';
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          variableWidth: true,
        },
      },
    ],
  });

  $(".next").click(function() {
    const sl = $(this).closest('.about__slider').find('.sliderAbout');
    sl.slick('slickNext');
  });
  $(".prev").click(function() {
    const sl = $(this).closest('.about__slider').find('.sliderAbout');
    sl.slick('slickPrev');
  });
};

const slidersAboutRtl = function() {
  const $status = $(".pagingInfo-rtl .counter");
  const $statusF = $(".pagingInfo-rtl .counter span:first-child");
  const $statusL = $(".pagingInfo-rtl .counter span:last-child");
  const $length = $(".pagingInfo-rtl .length");
  const $slickElement = $(".sliderAbout-rtl");

  $slickElement.on("init reInit afterChange", function(
    event,
    slick,
    currentSlide
  ) {
    const i = (currentSlide ? currentSlide : 0) + 1;
    const t =
      Math.ceil(slick.slideCount / 2) === Math.ceil(i / 2)
        ? 1
        : Math.ceil(i / 2) + 1;
    $status.addClass("active");
    $statusF.html(Math.ceil(i / 2));
    $statusL.html(t);
    $length.html(` / ${Math.ceil(slick.slideCount / 2)}`);
  });
  $slickElement.on("beforeChange", function() {
    $status.removeClass("active");
  });

  $slickElement.slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    dots: true,
    speed: 1000,
    arrows: true,
    variableWidth: true,
    nextArrow: $(".next-rtl"),
    prevArrow: $(".prev-rtl"),
    rtl: true,
    autoplaySpeed: 5000,
    customPaging: function() {
      return '<div class="circle-loader-wrap"><div class="left-wrap"><div class="circle"></div></div><div class="right-wrap"><div class="circle"></div> </div></div>';
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          variableWidth: true,
        },
      },
    ],
  });
};

const navArray = [];

const slidersForNav = function() {
  for (let x=0; x < $(".slider-for--item").length; x++) {
    const item = $(".slider-for--item").eq(x).data("nav");
    navArray.push(item);
  }
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    fade: true,
    dots: true,
    appendDots: $(".appendDots"),
    nextArrow: $(".nextSec"),
    prevArrow: $(".prevSec"),
    asNavFor: '.sliderAboutPeople',
    customPaging: function(slick, index) {
      return navArray[index];
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          adaptiveHeight: true,
        },
      },
    ],
  });
};

$(document).on("click", ".section__bottom__close--js", function(e) {
  $('.section__bottom__form__message').slideUp(500);
});
