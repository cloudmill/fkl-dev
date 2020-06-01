import "slick-carousel";
import "magnific-popup";
import "select2";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min";
import AOS from "aos";

$(document).on("click", ".about__video--ico", function() {
  $(this).hide();
  const $video = $("#video"),
    src = $video.attr("src");

  $video.attr("src", src + "&autoplay=1");
});
$(document).ready(function() {
  slidersMain();
  slidersCard();
  slidersForNav();
  slidersAbout();
  slidersAboutRtl();
  slidersTechCard();
  slidersAboutPeople();
  progressList();

  auth();
  account();
  basket();
  order();
  filter();
  formSubmer();

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

    $(href + " .cityList--js .cityList:first-child li:first-child a").trigger(
      "click"
    );

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
      "Начните вводить город"
    );
    $(".select2-dropdown").hide();
    setTimeout(function() {
      $(".select2-dropdown").slideDown("slow");
    }, 200);
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
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
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
    // autoplay: true,
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
    // fade: true,
    infinite: true,
    cssEase: "ease-in-out",
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
          variableWidth: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: false,
        },
      },
    ],
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
const nav = [
  "2018",
  "2017",
  "2015",
  "2009",
  "1990",
  "1987-1988",
  "1986",
  "1980-1990",
  "1975",
  "1965",
  "1961",
];
const slidersForNav = function() {
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
    customPaging: function(slick, index) {
      return nav[index];
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

const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);

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

$(".submit--js").click(function(e) {
  e.preventDefault();
  const inputMail = $(this)
    .closest(".regForm")
    .find('input[type="email"]');
  const inputPass = $(this)
    .closest(".regForm")
    .find('input[type="password"]');
  $(".regForm-error").text("Неправильно введена электронная почта или пароль");
  inputMail.parent().addClass("error");
  inputPass.parent().addClass("error");
});

const auth = function() {
  console.log("auth");

  $("[data-type=js-auth-submit]").on("click", function(e) {
    e.preventDefault();
    let mist = 0,
      auth = $("[data-type=js-auth]"),
      error = auth.find("#error"),
      email = auth.find("input[name=email]"),
      password = auth.find("input[name=password]");

    if (!email.val()) {
      email.parents("label").addClass("error");
      mist++;
    } else {
      email.parents("label").removeClass("error");
    }

    if (!password.val()) {
      password.parents("label").addClass("error");
      mist++;
    } else {
      password.parents("label").removeClass("error");
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/main/auth.php",
        data: {
          email: email.val(),
          password: password.val(),
        },
        success: function(a) {
          if (a) {
            error.html(a);
          } else {
            location.reload();
          }
        },
      });
    }
  });

  $("[data-type=js-register-submit]").on("click", function(e) {
    e.preventDefault();
    let mist = 0,
      register = $("[data-type=js-register]"),
      legal = $("input[name=legal]"),
      error = register.find("#error"),
      name = register.find("input[name=name]"),
      company = register.find("input[name=company]"),
      phone = register.find("input[name=phone]"),
      inn = register.find("input[name=inn]"),
      email = register.find("input[name=email]"),
      kpp = register.find("input[name=kpp]"),
      password = register.find("input[name=password]"),
      repassword = register.find("input[name=repassword]"),
      bic = register.find("input[name=bic]"),
      korrBill = register.find("input[name=korrBill]"),
      bill = register.find("input[name=bill]"),
      legalAdr = register.find("input[name=legalAdr]"),
      postAdr = register.find("input[name=postAdr]"),
      director = register.find("input[name=director]"),
      act = register.find("input[name=act]"),
      state = register.find("input[name=state]"),
      name_f = register.find("input[name=name_f]"),
      phone_f = register.find("input[name=phone_f]"),
      email_f = register.find("input[name=email_f]"),
      password_f = register.find("input[name=password_f]"),
      repassword_f = register.find("input[name=repassword_f]");

    error.html("");

    if (legal.prop("checked")) {
      console.log("legal");
      if (!name.val()) {
        name.parents("label").addClass("error");
        mist++;
      } else {
        name.parents("label").removeClass("error");
      }

      if (!company.val()) {
        company.parents("label").addClass("error");
        mist++;
      } else {
        company.parents("label").removeClass("error");
      }

      if (!phone.val() || phone.val().length != 17) {
        phone.parents("label").addClass("error");
        mist++;
      } else {
        phone.parents("label").removeClass("error");
      }

      if (!inn.val()) {
        inn.parents("label").addClass("error");
        mist++;
      } else {
        inn.parents("label").removeClass("error");
      }

      if (!email.val()) {
        email.parents("label").addClass("error");
        mist++;
      } else {
        email.parents("label").removeClass("error");
      }

      if (!kpp.val()) {
        kpp.parents("label").addClass("error");
        mist++;
      } else {
        kpp.parents("label").removeClass("error");
      }

      if (!password.val()) {
        password.parents("label").addClass("error");
        mist++;
      } else {
        password.parents("label").removeClass("error");
      }

      if (!repassword.val()) {
        repassword.parents("label").addClass("error");
        mist++;
      } else {
        repassword.parents("label").removeClass("error");
      }

      if (password.val() && repassword.val()) {
        if (repassword.val() != password.val()) {
          repassword.parents("label").addClass("error");
          password.parents("label").addClass("error");
          mist++;
        } else {
          repassword.parents("label").removeClass("error");
          password.parents("label").removeClass("error");
        }
      }

      if (!bic.val()) {
        bic.parents("label").addClass("error");
        mist++;
      } else {
        bic.parents("label").removeClass("error");
      }

      if (!korrBill.val()) {
        korrBill.parents("label").addClass("error");
        mist++;
      } else {
        korrBill.parents("label").removeClass("error");
      }

      if (!bill.val()) {
        bill.parents("label").addClass("error");
        mist++;
      } else {
        bill.parents("label").removeClass("error");
      }

      if (!legalAdr.val()) {
        legalAdr.parents("label").addClass("error");
        mist++;
      } else {
        legalAdr.parents("label").removeClass("error");
      }

      if (!postAdr.val()) {
        postAdr.parents("label").addClass("error");
        mist++;
      } else {
        postAdr.parents("label").removeClass("error");
      }

      if (!director.val()) {
        director.parents("label").addClass("error");
        mist++;
      } else {
        director.parents("label").removeClass("error");
      }

      if (!act.val()) {
        act.parents("label").addClass("error");
        mist++;
      } else {
        act.parents("label").removeClass("error");
      }

      if (!state.val()) {
        state.parents("label").addClass("error");
        mist++;
      } else {
        state.parents("label").removeClass("error");
      }

      if (mist == 0) {
        $.ajax({
          type: "POST",
          url: "/local/templates/main/include/ajax/main/register.php",
          data: {
            name: name.val(),
            company: company.val(),
            phone: phone.val(),
            inn: inn.val(),
            email: email.val(),
            kpp: kpp.val(),
            password: password.val(),
            bic: bic.val(),
            korrBill: korrBill.val(),
            bill: bill.val(),
            legalAdr: legalAdr.val(),
            postAdr: postAdr.val(),
            director: director.val(),
            act: act.val(),
            state: state.val(),
            legal: true,
          },
          success: function(a) {
            if (a) {
              error.html(a);
            } else {
              location.reload();
            }
          },
        });
      }
    } else {
      if (!name_f.val()) {
        name_f.parents("label").addClass("error");
        mist++;
      } else {
        name_f.parents("label").removeClass("error");
      }

      if (!phone_f.val() || phone_f.val().length != 17) {
        phone_f.parents("label").addClass("error");
        mist++;
      } else {
        phone_f.parents("label").removeClass("error");
      }

      if (!email_f.val()) {
        email_f.parents("label").addClass("error");
        mist++;
      } else {
        email_f.parents("label").removeClass("error");
      }

      if (!password_f.val()) {
        password_f.parents("label").addClass("error");
        mist++;
      } else {
        password_f.parents("label").removeClass("error");
      }

      if (!repassword_f.val()) {
        repassword_f.parents("label").addClass("error");
        mist++;
      } else {
        repassword_f.parents("label").removeClass("error");
      }

      if (password_f.val() && repassword_f.val()) {
        if (repassword_f.val() != password_f.val()) {
          repassword_f.parents("label").addClass("error");
          password_f.parents("label").addClass("error");
          mist++;
        } else {
          repassword_f.parents("label").removeClass("error");
          password_f.parents("label").removeClass("error");
        }
      }

      if (mist == 0) {
        $.ajax({
          type: "POST",
          url: "/local/templates/main/include/ajax/main/register.php",
          data: {
            name: name_f.val(),
            phone: phone_f.val(),
            email: email_f.val(),
            password: password_f.val(),
            legal: false,
          },
          success: function(a) {
            if (a) {
              error.html(a);
            } else {
              location.reload();
            }
          },
        });
      }
    }
  });
};

const account = function() {
  console.log("account");

  $("[data-type=js-password]").on("submit", function(e) {
    e.preventDefault();
    let mist = 0,
      form = $("[data-type=js-password]"),
      error = form.find("#error"),
      newpassword = form.find("input[name=newpassword]"),
      repeatpassword = form.find("input[name=repeatpassword]");

    if (!newpassword.val()) {
      newpassword.parents("label").addClass("error");
      mist++;
    } else {
      newpassword.parents("label").removeClass("error");
    }

    if (!repeatpassword.val()) {
      repeatpassword.parents("label").addClass("error");
      mist++;
    } else {
      repeatpassword.parents("label").removeClass("error");
    }

    if (newpassword.val() && repeatpassword.val()) {
      if (newpassword.val() != repeatpassword.val()) {
        newpassword.parents("label").addClass("error");
        repeatpassword.parents("label").addClass("error");
        mist++;
      } else {
        newpassword.parents("label").removeClass("error");
        repeatpassword.parents("label").removeClass("error");
      }
    }

    error.html("");

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/account/password.php",
        data: {
          password: newpassword.val(),
        },
        success: function(a) {
          if (a) {
            error.html(a);
          } else {
            form.hide();
            $(".mainTitle h2").text("Пароль изменен!");
            AOS.init({
              offset: 50,
            });
          }
        },
      });
    }
  });

  $("[data-type=js-register-submit]").on("click", function(e) {
    e.preventDefault();
    let mist = 0,
      register = $("[data-type=js-register]"),
      legal = $("input[name=legal]"),
      error = register.find("#error"),
      name = register.find("input[name=name]"),
      company = register.find("input[name=company]"),
      phone = register.find("input[name=phone]"),
      inn = register.find("input[name=inn]"),
      email = register.find("input[name=email]"),
      kpp = register.find("input[name=kpp]"),
      password = register.find("input[name=password]"),
      repassword = register.find("input[name=repassword]"),
      bic = register.find("input[name=bic]"),
      korrBill = register.find("input[name=korrBill]"),
      bill = register.find("input[name=bill]"),
      legalAdr = register.find("input[name=legalAdr]"),
      postAdr = register.find("input[name=postAdr]"),
      director = register.find("input[name=director]"),
      act = register.find("input[name=act]"),
      state = register.find("input[name=state]"),
      name_f = register.find("input[name=name_f]"),
      phone_f = register.find("input[name=phone_f]"),
      email_f = register.find("input[name=email_f]"),
      password_f = register.find("input[name=password_f]"),
      repassword_f = register.find("input[name=repassword_f]");

    error.html("");

    if (legal.prop("checked")) {
      console.log("legal");
      if (!name.val()) {
        name.parents("label").addClass("error");
        mist++;
      } else {
        name.parents("label").removeClass("error");
      }

      if (!company.val()) {
        company.parents("label").addClass("error");
        mist++;
      } else {
        company.parents("label").removeClass("error");
      }

      if (!phone.val() || phone.val().length != 17) {
        phone.parents("label").addClass("error");
        mist++;
      } else {
        phone.parents("label").removeClass("error");
      }

      if (!inn.val()) {
        inn.parents("label").addClass("error");
        mist++;
      } else {
        inn.parents("label").removeClass("error");
      }

      if (!email.val()) {
        email.parents("label").addClass("error");
        mist++;
      } else {
        email.parents("label").removeClass("error");
      }

      if (!kpp.val()) {
        kpp.parents("label").addClass("error");
        mist++;
      } else {
        kpp.parents("label").removeClass("error");
      }

      if (!password.val()) {
        password.parents("label").addClass("error");
        mist++;
      } else {
        password.parents("label").removeClass("error");
      }

      if (!repassword.val()) {
        repassword.parents("label").addClass("error");
        mist++;
      } else {
        repassword.parents("label").removeClass("error");
      }

      if (password.val() && repassword.val()) {
        if (repassword.val() != password.val()) {
          repassword.parents("label").addClass("error");
          password.parents("label").addClass("error");
          mist++;
        } else {
          repassword.parents("label").removeClass("error");
          password.parents("label").removeClass("error");
        }
      }

      if (!bic.val()) {
        bic.parents("label").addClass("error");
        mist++;
      } else {
        bic.parents("label").removeClass("error");
      }

      if (!korrBill.val()) {
        korrBill.parents("label").addClass("error");
        mist++;
      } else {
        korrBill.parents("label").removeClass("error");
      }

      if (!bill.val()) {
        bill.parents("label").addClass("error");
        mist++;
      } else {
        bill.parents("label").removeClass("error");
      }

      if (!legalAdr.val()) {
        legalAdr.parents("label").addClass("error");
        mist++;
      } else {
        legalAdr.parents("label").removeClass("error");
      }

      if (!postAdr.val()) {
        postAdr.parents("label").addClass("error");
        mist++;
      } else {
        postAdr.parents("label").removeClass("error");
      }

      if (!director.val()) {
        director.parents("label").addClass("error");
        mist++;
      } else {
        director.parents("label").removeClass("error");
      }

      if (!act.val()) {
        act.parents("label").addClass("error");
        mist++;
      } else {
        act.parents("label").removeClass("error");
      }

      if (!state.val()) {
        state.parents("label").addClass("error");
        mist++;
      } else {
        state.parents("label").removeClass("error");
      }

      if (mist == 0) {
        $.ajax({
          type: "POST",
          url: "/local/templates/main/include/ajax/main/register.php",
          data: {
            name: name.val(),
            company: company.val(),
            phone: phone.val(),
            inn: inn.val(),
            email: email.val(),
            kpp: kpp.val(),
            password: password.val(),
            bic: bic.val(),
            korrBill: korrBill.val(),
            bill: bill.val(),
            legalAdr: legalAdr.val(),
            postAdr: postAdr.val(),
            director: director.val(),
            act: act.val(),
            state: state.val(),
            legal: true,
          },
          success: function(a) {
            if (a) {
              error.html(a);
            } else {
              location.reload();
            }
          },
        });
      }
    } else {
      if (!name_f.val()) {
        name_f.parents("label").addClass("error");
        mist++;
      } else {
        name_f.parents("label").removeClass("error");
      }

      if (!phone_f.val() || phone_f.val().length != 17) {
        phone_f.parents("label").addClass("error");
        mist++;
      } else {
        phone_f.parents("label").removeClass("error");
      }

      if (!email_f.val()) {
        email_f.parents("label").addClass("error");
        mist++;
      } else {
        email_f.parents("label").removeClass("error");
      }

      if (!password_f.val()) {
        password_f.parents("label").addClass("error");
        mist++;
      } else {
        password_f.parents("label").removeClass("error");
      }

      if (!repassword_f.val()) {
        repassword_f.parents("label").addClass("error");
        mist++;
      } else {
        repassword_f.parents("label").removeClass("error");
      }

      if (password_f.val() && repassword_f.val()) {
        if (repassword_f.val() != password_f.val()) {
          repassword_f.parents("label").addClass("error");
          password_f.parents("label").addClass("error");
          mist++;
        } else {
          repassword_f.parents("label").removeClass("error");
          password_f.parents("label").removeClass("error");
        }
      }

      if (mist == 0) {
        $.ajax({
          type: "POST",
          url: "/local/templates/main/include/ajax/main/register.php",
          data: {
            name: name_f.val(),
            phone: phone_f.val(),
            email: email_f.val(),
            password: password_f.val(),
            legal: false,
          },
          success: function(a) {
            if (a) {
              error.html(a);
            } else {
              location.reload();
            }
          },
        });
      }
    }
  });
};

const basket = function() {
  console.log("basket");
  $("[data-type=js-basket-add]").on("click", function(e) {
    e.preventDefault();
    let value = $(this).attr("data-value"),
      qty = $(this)
        .parents("[data-type=js-item]")
        .find("[data-type=js-item-qty]")
        .val();

    if (value) {
      $(".addElement").fadeIn("500");
      setTimeout(() => {
        $(".addElement").fadeOut("500");
      }, 2500);
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/basket/add.php",
        data: {
          value: value,
          qty: qty,
        },
        success: function(a) {
          $("[data-type=js-basket-header]").load(
            "/local/templates/main/include/ajax/basket/header.php"
          );
        },
      });
    }
  });

  $(document).on("change", "[data-type=js-basket-qty]", function(e) {
    e.preventDefault();
    console.log("basket change");
    let value = $(this)
        .parents("[data-type=js-basket-item]")
        .attr("data-value"),
      qty = $(this).val();

    if (value) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/basket/change.php",
        data: {
          value: value,
          qty: qty,
        },
        success: function(a) {
          $("[data-type=js-basket]").load(
            "/local/templates/main/include/ajax/basket/main.php"
          );
          $("[data-type=js-basket-header]").load(
            "/local/templates/main/include/ajax/basket/header.php"
          );
        },
      });
    }
  });

  $(document).on("click", "[data-type=js-basket-qty-minus]", function(e) {
    e.preventDefault();
    console.log("basket change minus");
    let input = $(this)
        .parents("[data-type=js-basket-item]")
        .find("[data-type=js-basket-qty]"),
      qty = parseFloat(input.val());

    qty--;

    if (qty < 1) {
      qty = 1;
    }

    input.val(qty).trigger("change");
  });

  $(document).on("click", "[data-type=js-basket-qty-plus]", function(e) {
    e.preventDefault();
    console.log("basket change plus");
    let input = $(this)
        .parents("[data-type=js-basket-item]")
        .find("[data-type=js-basket-qty]"),
      qty = parseFloat(input.val());

    qty++;

    if (qty < 1) {
      qty = 1;
    }

    input.val(qty).trigger("change");
  });

  $(document).on("click", "[data-type=js-basket-delete]", function(e) {
    e.preventDefault();
    console.log("basket delete");
    let input = $(this)
        .parents("[data-type=js-basket-item]")
        .find("[data-type=js-basket-qty]"),
      qty = parseFloat(input.val());

    qty = 0;

    input.val(qty).trigger("change");
  });
};

const order = function() {
  $(document).on(
    "change",
    "[data-type=js-checkout] select[name=city]",
    function() {
      console.log("city");
      orderRefresh();
    }
  );

  $(document).on(
    "change",
    "[data-type=js-checkout] input[name=delivery]",
    function() {
      console.log("delivery");
      orderRefresh();
    }
  );

  function orderRefresh() {
    console.log("refresh");
    let url = window.location.pathname,
      checkout = $("[data-type=js-checkout]"),
      name = checkout.find("input[name=name]"),
      phone = checkout.find("input[name=phone]"),
      email = checkout.find("input[name=email]"),
      city = checkout.find("select[name=city]"),
      index = checkout.find("input[name=index]"),
      address = checkout.find("input[name=address]"),
      message = checkout.find("textarea[name=message]"),
      delivery = checkout.find("input[name=delivery]"),
      deliveryValue = 0,
      payment = checkout.find("input[name=payment]"),
      paymentValue = 0;

    delivery.each(function() {
      if ($(this).prop("checked")) {
        deliveryValue = $(this).val();
      }
    });

    payment.each(function() {
      if ($(this).prop("checked")) {
        paymentValue = $(this).val();
      }
    });

    $.ajax({
      type: "POST",
      url: url,
      data: {
        ajax_checkout: true,
        name: name.val(),
        phone: phone.val(),
        email: email.val(),
        city: city.val(),
        index: index.val(),
        address: address.val(),
        message: message.val(),
        delivery: deliveryValue,
        payment: paymentValue,
      },
      success: function(a) {
        $("[data-type=js-checkout]").html(a);

        function formatState(state) {
          if (!state.id) {
            return state.text;
          }
          const tip = $(state.element).data("tip");
          const $state = $(
            "<span>" +
            state.text +
            '</span> <span class="desc">' +
            tip +
            "</span>"
          );
          return $state;
        }

        $("[data-type=js-checkout] .select").select2({
          templateResult: formatState,
        });
        $("[data-type=js-checkout] .select").on("select2:open", function() {
          $("input.select2-search__field").prop(
            "placeholder",
            "Начните вводить город"
          );
          $(".select2-dropdown").hide();
          setTimeout(function() {
            $(".select2-dropdown").slideDown("slow");
          }, 200);
        });

        $("[data-type=js-checkout] [name=phone]").mask("+7 (999) 999-9999");
      },
    });
  }

  $(document).on("click", "[data-type=js-checkout-submit]", function(e) {
    e.preventDefault();
    orderSubmit();
  });

  function orderSubmit() {
    console.log("submit");
    let mist = 0,
      checkout = $("[data-type=js-checkout]"),
      name = checkout.find("input[name=name]"),
      phone = checkout.find("input[name=phone]"),
      email = checkout.find("input[name=email]"),
      city = checkout.find("select[name=city]"),
      index = checkout.find("input[name=index]"),
      address = checkout.find("input[name=address]"),
      message = checkout.find("textarea[name=message]"),
      deliveryPrice = checkout.find("input[name=delivery_price]"),
      delivery = checkout.find("input[name=delivery]"),
      deliveryValue = 0,
      payment = checkout.find("input[name=payment]"),
      paymentValue = 0,
      agreement = checkout.find("input[name=agreement]");

    delivery.each(function() {
      if ($(this).prop("checked")) {
        deliveryValue = $(this).val();
      }
    });

    payment.each(function() {
      if ($(this).prop("checked")) {
        paymentValue = $(this).val();
      }
    });

    if (!name.val()) {
      name.parents("label").addClass("error");
      mist++;
    } else {
      name.parents("label").removeClass("error");
    }

    if (!phone.val() || phone.val().length != 17) {
      phone.parents("label").addClass("error");
      mist++;
      console.log(phone.val().length);
    } else {
      phone.parents("label").removeClass("error");
    }

    if (!city.val()) {
      city.parents(".form__group").addClass("error");
      mist++;
    } else {
      city.parents(".form__group").removeClass("error");
    }

    if (!deliveryValue) {
      delivery.parents(".radio").addClass("error");
      mist++;
    } else {
      delivery.parents(".radio").removeClass("error");
    }

    if (!paymentValue) {
      payment.parents(".radio").addClass("error");
      mist++;
    } else {
      payment.parents(".radio").removeClass("error");
    }

    if (!agreement.prop("checked")) {
      mist++;
      agreement.parents(".checkbox").addClass("error");
    } else {
      agreement.parents(".checkbox").removeClass("error");
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/checkout/add.php",
        data: {
          name: name.val(),
          phone: phone.val(),
          email: email.val(),
          city: city.val(),
          index: index.val(),
          address: address.val(),
          message: message.val(),
          delivery: deliveryValue,
          deliveryPrice: deliveryPrice.val(),
          payment: paymentValue,
        },
        success: function(a) {
          $("[data-type=js-checkout]").html(a);
        },
      });
    }
  }
};

const filter = function() {
  $("[data-type=js-filter-submit]").on("click", function(e) {
    e.preventDefault();
    $("[data-type=js-filter]").submit();
  });
};

const formSubmer = function() {
  console.log("forms inited");
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  $('form').submit(function(e){
    if($(this).find(".simpleForm-btn").length>0){
      e.preventDefault();
    }
  })
  $(document).on("click", ".simpleForm-btn", function(e) {
    var form = $(this).closest("form");
    var url = form.attr('action') || "/local/templates/main/include/ajax/unknown.php";
    var formname = form.attr('data-form');
    console.log("submit");
    e.preventDefault();
    var fields = form.find("input,textarea");
    var error = 0;
    var data = [];
    form
      .find(".control-body")
      .addClass("success")
      .removeClass("error");
    form.find(".error-text").text("");
    fields.each(function() {
      if ($(this).attr("required")) {
        var val = $(this).val();

        //проверка на заполненность
        if (val == "") {
          error++;
          $(this)
            .parent()
            .addClass("error");
        }

        //проверка валидности почты
        var name = $(this).attr("name");
        var type = $(this).attr("type");
        var id = $(this).attr("id");
        if (
          (name && name.indexOf("mail") > -1) ||
          (type && type.indexOf("mail") > -1) ||
          (id && id.indexOf("mail") > -1)
        ) {
          if (!validateEmail(val)) {
            $(this)
              .parent()
              .find(".error-text")
              .text("Неверно заполненное поле");
            $(this)
              .parent()
              .addClass("error");
            error++;
          }
        }

        //проверка установки чекбокса
        if ($(this).attr("type") == "checkbox") {
          if (!this.checked) error++;
        }
      }
      if ($(this).attr("type") == "checkbox") {
        data.push({
          name: $(this).attr("name") || $(this).attr("id") || $(this).attr("type"),
          val: this.checked,
        });
      } else {
        data.push({
          name: $(this).attr("name") || $(this).attr("id") || $(this).attr("type"),
          val: val,
        });
      }
    });
    var formData = {
      name: formname,
      fields: data,
    }
    console.log(formData);
    if (error == 0) {
      $.ajax({
        type: "POST",
        url: url,
        data: formData,
        success: function(e) {
          if (a) {
            console.error("Ошибка отправки формы ", e);
          } else {
            form.submit();
          }
        },
        error: function(e) {
          console.error("Ошибка отправки формы ", e);
        },
      });
    }
  });
};
