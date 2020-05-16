import "slick-carousel";
import "magnific-popup";
import "select2";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min";
import AOS from "aos";

$(document).ready(function() {
  slidersMain();
  slidersCard();
  slidersForNav();
  slidersAbout();
  slidersAboutRtl();
  slidersTechCard();
  slidersAboutPeople();
  progressList();

  $(".scrollContent").mCustomScrollbar();

  // popup
  $(".popup-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find("img");
      }
    }
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
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
      .find("> .tabs-list .tab")
      .removeClass("active");
    $(this)
      .closest(".tabs")
      .find("> .tabs-content")
      .removeClass("show");
    $(this).addClass("active");
    $(href).addClass("show");

    $(href + " .cityList--js .cityList:first-child li:first-child a").trigger(
      "click"
    );

    AOS.init();
  });

  // select
  $(".select").select2({
    minimumResultsForSearch: Infinity
  });
  $('.select').on('select2:open', function () {
    $('.select2-dropdown').hide();
    setTimeout(function(){ $('.select2-dropdown').slideDown("slow"); }, 200);
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
});

// sliders
const slidersMain = function() {
  $(".section__bottom__slider").slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    speed: 1000,
    dots: false,
    arrows: true,
    nextArrow: $(".slick-next"),
    prevArrow: $(".slick-prev"),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: 'unslick',
      }
    ]
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
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
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
        settings: 'unslick'
      }
    ]
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
    prevArrow: $(".prevPeople")
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
    cssEase: 'ease-in-out',
    touchThreshold: 100,
    nextArrow: $(".nextTech"),
    prevArrow: $(".prevTech"),
    // autoplay: true,
    autoplaySpeed: 5000,
    customPaging: function() {
      return '<div class="circle-loader-wrap"><div class="left-wrap"><div class="circle"></div></div><div class="right-wrap"><div class="circle"></div> </div></div>';
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          variableWidth: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: false,
        }
      }
    ]
  });
};

const slidersAbout = function() {
  const $status = $(".pagingInfo .counter");
  const $statusF = $(".pagingInfo .counter span:first-child");
  const $statusL = $(".pagingInfo .counter span:last-child");
  const $length = $(".pagingInfo .length");
  const $slickElement = $(".sliderAbout");

  $slickElement.on("init reInit afterChange", function(
    event,
    slick,
    currentSlide
  ) {
    const i = (currentSlide ? currentSlide : 0) + 1;
    const t = Math.ceil(slick.slideCount / 2) === Math.ceil(i / 2) ? 1 : Math.ceil(i / 2) + 1;
    $status.addClass('active');
    $statusF.html(Math.ceil(i / 2));
    $statusL.html(t);
    $length.html(` / ${Math.ceil(slick.slideCount / 2)}`);
  });
  $slickElement.on("beforeChange", function() {
    $status.removeClass('active');
  });

  $slickElement.slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    dots: true,
    speed: 1000,
    arrows: true,
    // fade: true,
    infinite: true,
    cssEase: 'ease-in-out',
    touchThreshold: 100,
    variableWidth: true,
    nextArrow: $(".next"),
    prevArrow: $(".prev"),
    // autoplay: true,
    autoplaySpeed: 5000,
    customPaging: function() {
      return '<div class="circle-loader-wrap"><div class="left-wrap"><div class="circle"></div></div><div class="right-wrap"><div class="circle"></div> </div></div>';
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          variableWidth: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: false,
        }
      }
    ]
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
    const t = Math.ceil(slick.slideCount / 2) === Math.ceil(i / 2) ? 1 : Math.ceil(i / 2) + 1;
    $status.addClass('active');
    $statusF.html(Math.ceil(i / 2));
    $statusL.html(t);
    $length.html(` / ${Math.ceil(slick.slideCount / 2)}`);
  });
  $slickElement.on("beforeChange", function() {
    $status.removeClass('active');
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
    autoplay: true,
    autoplaySpeed: 5000,
    customPaging: function() {
      return '<div class="circle-loader-wrap"><div class="left-wrap"><div class="circle"></div></div><div class="right-wrap"><div class="circle"></div> </div></div>';
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          variableWidth: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: false,
        }
      }
    ]
  });
};
const nav = [
  '2018',
  '2017',
  '2015',
  '2009',
  '1990',
  '1987-1988',
  '1986',
  '1980-1990',
  '1975',
  '1965',
  '1961',
];
const slidersForNav = function() {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    fade: true,
    dots: true,
    appendDots: $('.appendDots'),
    nextArrow: $(".nextSec"),
    prevArrow: $(".prevSec"),
    customPaging: function(slick,index) {
      return nav[index];
    },
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          adaptiveHeight: true,
        }
      },
    ]
  });
};

const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);

$('.slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  const num = nextSlide+1;
  const li = $(`.appendDots .slick-dots li:nth-child(${num})`);
  const getPosition = li.position().left;
  const getWidth = li.width();
  const getHeight = li.height();
  if (screen_width <= 1239) {
    $('.appendDots span').css({
      'left': getWidth > 80 ? getPosition - 5 : getPosition,
      'width': getWidth > 80 ? getWidth + 10 : getWidth,
      'height': getHeight,
    });
  } else {
    $('.appendDots span').css({
      'left': getPosition,
    });
  }
});

$('.submit--js').click(function (e) {
  e.preventDefault();
  const inputMail =  $(this).closest('.regForm').find('input[type="email"]');
  const inputPass =  $(this).closest('.regForm').find('input[type="password"]');
  $('.regForm-error').text('Неправильно введена электронная почта или пароль')
  inputMail.parent().addClass('error');
  inputPass.parent().addClass('error');
});
