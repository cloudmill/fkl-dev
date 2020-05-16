import noUiSlider from "nouislider";
import wNumb from "wnumb";
import AOS from "aos";

//range slider
const stepsSlider = document.getElementById('range');
const inputLower = document.getElementById('skip-value-lower');
const inputUpper = document.getElementById('skip-value-upper');
const inputs = [inputLower, inputUpper];

if(stepsSlider) {
  noUiSlider.create(stepsSlider, {
    start: [100, 50000],
    step: 1,
    behaviour: 'drag',
    connect: true,
    range: {
      'min': 100,
      'max': 100000
    },
    format: wNumb({
      decimals: 0
    })
  });
  stepsSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
  });
  inputs.forEach(function (input, handle) {
    input.addEventListener('change', function () {
      stepsSlider.noUiSlider.setHandle(handle, this.value);
    });
    input.addEventListener('keydown', function (e) {
      const values = stepsSlider.noUiSlider.get();
      const value = Number(values[handle]);
      const steps = stepsSlider.noUiSlider.steps();
      const step = steps[handle];
      let position;

      switch (e.which) {
        case 13:
          stepsSlider.noUiSlider.setHandle(handle, this.value);
          break;
        case 38:
          position = step[1];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value + position);
          }
          break;
        case 40:
          position = step[0];
          if (position === false) {
            position = 1;
          }
          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value - position);
          }
          break;
      }
    });
  });
}
//range slider


$('.control').blur(function (event) {
  const isRequired = $(this).attr('required');
  const value = event.target.value;
  if(value) {
    $(this).parent().addClass('success');
    $(this).parent().removeClass('error');
  }
  if(!value && isRequired) {
    $(this).parent().addClass('error');
    $(this).parent().removeClass('success');
  }
});

// count input
function numberWithSpaces(x) {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}
function calcilateSumm(item, count) {
  const priceInput = item.closest('tr').find('.counter--js');
  const price = priceInput.data('price');
  const actualSumm = price * count;
  const setRegexSumm = numberWithSpaces(actualSumm.toFixed(2));
  priceInput.find('.value').text(`${setRegexSumm} р.`);
}
$('.input__number-js').change(function (event) {
  const value = event.target.value;
  calcilateSumm($(this), value);
});
$('.input__quantity-js .inc').click(function () {
  const $input = $(this).closest('.input__quantity-js').find('input');
  let count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
  $input.change();
  calcilateSumm($(this), count);
  return false;
});
$('.input__quantity-js .dec').click(function () {
  const $input = $(this).closest('.input__quantity-js').find('input');
  let count = parseInt($input.val()) + 1;
  count = count > 999 ? 1 : count;
  $input.val(count);
  $input.change();
  calcilateSumm($(this), count);
  return false;
});

// input type ONLY number
function forceNumericOnly (item) {
  return $(item).each(function()
  {
    $(item).keydown(function(e)
    {
      const key = e.charCode || e.keyCode || 0;
      // sucess backspace, tab, delete, arrows, numbers
      return (
        key == 8 ||
        key == 9 ||
        key == 46 ||
        key == 190 ||
        (key >= 37 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
    });
  });
}
forceNumericOnly(".input__number-js");

// search
$(".params__inner-item").click(function() {
  $(this).toggleClass("active");
});
$(".filter-clicker").click(function() {
  $(this).toggleClass("active");
  $(this).next().toggleClass('active');
  if($(this).hasClass('active')) {
    $(this).find('img:last-child').attr('src', 'assets/images/icons/minus.svg');
  } else {
    $(this).find('img:last-child').attr('src', 'assets/images/icons/plus.svg');
  }
  AOS.init();
});

// basket
$(".cabinet-delete--js").click(function() {
  const row = $(this).closest('tr');
  row.remove();
  if($('tr').length === 1) {
    $('table').remove();
  }
  AOS.init();
});

// header__menu-el--parent
$(".header__menu-el--parent").mouseleave(function() {
  $(this).parents().find('.header').removeClass('hover');
});
$(".header__menu-el--parent").mouseover(function() {
  const navbar = $('.navbar').width();
  $('.sub-nav__inner').css('width', navbar);
  $(this).parents().find('.header').addClass('hover');
});

// registerPart
$("#legal").click(function(event) {
  const value = event.target.checked;
  if(!value) {
    $('#resident').show();
    $('#professional').hide();
  } else {
    $('#resident').hide();
    $('#professional').show();
  }
  AOS.init();
});

// passwordPart
$("#passwords--js").click(function() {
  $(this).toggleClass('active');

  if($(this).hasClass('active')) {
    $(this).text('Вернуться назад');
    $('.mainTitle h2').text('Восстановить пароль');
    $('#editPassword').hide();
    $('#restorePassword').show();
  } else {
    $('.mainTitle h2').text('Изменить пароль');
    $(this).text('Восстановить пароль');
    $('#editPassword').show();
    $('#restorePassword').hide();
  }
  return false;
});

// testing actions
// TODO: add backend part and update this functions
$(".testAction").click(function() {
  $('#editPassword').hide();
  $('#restorePassword').hide();
  $('.longLink').hide();
  $('.infoNotice').show();
  $('.mainTitle h2').text('Спасибо!');
  AOS.init();
  return false;
});
$("#restoreForms").click(function() {
  $('#editPassword').show();
  $('.longLink').show();
  $('.infoNotice').hide();
  $('.mainTitle h2').text('Изменить пароль');
  AOS.init();
  return false;
});
$("#restoreForms2").click(function() {
  $('#restorePassword').show();
  $('.longLink').show();
  $('.infoNotice').hide();
  $('.mainTitle h2').text('Восстановить пароль');
  AOS.init();
  return false;
});
// testing actions

$(".faq-form__right .btn--primary").click(function() {
  $('.inner').slideDown();
  $('.outer').hide();
  return false;
});
$(".faq-form__right .return--js").click(function() {
  $('.inner').hide();
  $('.outer').slideDown();
  return false;
});

// mask phone {maskedinput}
$("[name=phone]").mask("+7 (999) 999-9999");


const $sticky = $('.sticky');
const $stickyrStopper = $('.sticky-stopper');
const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
if (screen_width > 767) {
  if (!!$sticky.offset()) {

    const generalSidebarHeight = $sticky.innerHeight();
    const stickyTop = $sticky.offset().top;
    const stickOffset = 0;
    const stickyStopperPosition = $stickyrStopper.offset().top;
    const stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
    const diff = stopPoint + stickOffset - 200;

    $(window).scroll(function(){ // scroll event
      const windowTop = $(window).scrollTop(); // returns number

      if (stopPoint < windowTop) {
        $sticky.css({ position: 'absolute', top: diff });
      } else if (stickyTop < windowTop+stickOffset) {
        $sticky.css({ position: 'fixed', top: stickOffset });
      } else {
        $sticky.css({position: 'absolute', top: 'initial'});
      }
    });

  }
}
