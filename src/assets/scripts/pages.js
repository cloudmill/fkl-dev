import noUiSlider from "nouislider";
import wNumb from "wnumb";
import AOS from "aos";


const screen_width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);


$(document).on('click', '.reset--js', function () {
  $('form[name=myForm]').trigger('reset');
  stepsSlider.noUiSlider.reset();
  return false;
});

//range slider
const stepsSlider = document.getElementById('range');
const inputLower = document.getElementById('skip-value-lower');
const inputUpper = document.getElementById('skip-value-upper');
const inputs = [inputLower, inputUpper];

if(stepsSlider) {
  const inputMin = parseFloat(stepsSlider.getAttribute('data-min'));
  const inputMax = parseFloat(stepsSlider.getAttribute('data-max'));
  const inputNowMin = parseFloat(stepsSlider.getAttribute('data-now-min'));
  const inputNowMax = parseFloat(stepsSlider.getAttribute('data-now-max'));

  noUiSlider.create(stepsSlider, {
    start: [inputNowMin, inputNowMax],
    step: 1,
    behaviour: 'drag',
    connect: true,
    range: {
      'min': inputMin,
      'max': inputMax
    },
    format: wNumb({
      decimals: 0
    })
  });
  stepsSlider.noUiSlider.on('end', function () {
    const getTop = $(this)[0].target.offsetTop;
    $('.showFilter').addClass('active').show(500);
    $('.showFilter .showFilterLink').css({top: getTop});
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


$('.filter input').change(function () {
  const getTop = $(this).parent().position().top;
  $('.showFilter').addClass('active').show(500);
  $('.showFilter .showFilterLink').css({top: getTop});
});


export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePhone(phone) {
  const re = /^(\+7)[\s\-]\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return re.test(phone);
}

$('.control').blur(function (event) {
  const isRequired = $(this).attr('required');
  const value = event.target.value;
  if(value) {
    if($(this).prop('type') === 'email') {
      if (validateEmail(value)) {
        $(this).parent().addClass('success');
        $(this).parent().removeClass('error');
        $(this).parent().find('.error-text').text('');
      } else {
        $(this).parent().addClass('error');
        $(this).parent().find('.error-text').text('Неверно заполненное поле');
      }
    } else if($(this).prop('name') === 'phone') {
      if (validatePhone(value)) {
        $(this).parent().addClass('success');
        $(this).parent().removeClass('error');
        $(this).parent().find('.error-text').text('');
      } else {
        $(this).parent().addClass('error');
        $(this).parent().find('.error-text').text('Неверно введен номер телефона');
      }
    } else {
      $(this).parent().addClass('success');
      $(this).parent().removeClass('error');
      $(this).parent().find('.error-text').text('');
    }
  }
  if(!value && isRequired) {
    $(this).parent().addClass('error');
    $(this).parent().find('.error-text').text('Неверно заполненное поле');
    $(this).parent().removeClass('success');
  }
});

$('.sign--js').click(function(e) {
  e.preventDefault();
  const email = $('form').find('input[name=email]');
  const value = email.val();
  if(!value) {
    $(this).parent().find('.control-body').addClass('error');
    $(this).parent().find('.control-body').removeClass('success');
    $(this).parent().find('.error-text').text('Неверно заполненное поле');
  } else {
    if($(this).prop('type') === 'email') {
      if (validateEmail(value)) {
        $(this).parent().find('.control-body').addClass('success');
        $(this).parent().find('.control-body').removeClass('error');
        $(this).parent().find('.error-text').text('');
      } else {
        $(this).parent().find('.control-body').addClass('error');
        $(this).parent().find('.error-text').text('Неверно заполненное поле');
      }
    } else {
      $(this).parent().find('.control-body').addClass('success');
      $(this).parent().find('.control-body').removeClass('error');
      $(this).parent().find('.error-text').text('');
    }
  }
});


$('.order--js').click(function(e) {
  // const input = $(this).parent('form').find('[required]');
  // const checked = $("input[type=checkbox][name]:checked").length;
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
  if ($(this).hasClass('active')) {
    $(this).find('input[type=checkbox]').prop('checked', true);
  } else {
    $(this).find('input[type=checkbox]').prop('checked', false);
  }
});
$(".filter-clicker").click(function() {
  $(this).toggleClass("active");
  $(this).next().toggleClass('active');
  if($(this).hasClass('active')) {
    $(this).find('img:last-child').attr('src', '/local/templates/main/assets/images/icons/minus.svg');
    $(this).find('span').text('Скрыть фильтры');
  } else {
    $(this).find('img:last-child').attr('src', '/local/templates/main/assets/images/icons/plus.svg');
    $(this).find('span').text('Показать фильтры');
  }
  AOS.init({
    offset: 50,
  });
});

if (screen_width <= 767) {
  $('.filter-clicker').trigger('click');
}

const getLogoSrc = process.env.NODE_ENV === 'development'
  ? 'assets/images/logo_blue.svg'
  : '/local/templates/main/assets/images/logo_blue.svg';

const getLogoSrcWhite = process.env.NODE_ENV === 'development'
  ? 'assets/images/logo.svg'
  : '/local/templates/main/assets/images/logo.svg';

// header__menu-el--parent
$(".header__menu-el--parent").mouseleave(function() {
  $(this).parents().find('.header').removeClass('hover');
  if(!$(this).parents().find('.header').hasClass('black')) {
    $(this).parents().find('.header__logo img').attr('src', getLogoSrcWhite);
  }
});
$(".header__menu-el--parent").mouseover(function() {
  const navbar = $('.navbar').width();
  $('.sub-nav__inner').css('width', navbar);
  $(this).parents().find('.header').addClass('hover');
  $(this).parents().find('.header__logo img').attr('src', getLogoSrc);
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
  AOS.init({
    offset: 50,
  });
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

// mask phone {maskedinput}
$("[name=phone]").mask("+7 (999) 999-9999");
$("[name=phone_f]").mask("+7 (999) 999-9999");


const $sticky = $('.sticky');
const $stickyrStopper = $('.sticky-stopper');

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
