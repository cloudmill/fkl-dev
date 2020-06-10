import "magnific-popup";
import "select2";
import AOS from "aos";

$(function () {
  auth();
  account();
  basket();
  order();
  filter();
  wherebuy();
  formSubmer();
});

const auth = function () {
  console.log("auth");

  $("[data-type=js-auth]").on("submit", function (e) {
    e.preventDefault();
    let mist = 0,
      auth = $("[data-type=js-auth]"),
      error = $("[data-type=js-auth-error]"),
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

    error.html('');

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/main/auth.php",
        data: {
          email: email.val(),
          password: password.val(),
        },
        success: function (a) {
          if (a) {
            error.html(a);
          } else {
            location.reload();
          }
        },
      });
    }
  });

  $("[data-type=js-auth-submit]").on("click", function (e) {
    e.preventDefault();
    $("[data-type=js-auth]").submit();
  });

  $("[data-type=js-register]").on("submit", function (e) {
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
          success: function (a) {
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
          success: function (a) {
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

  $("[data-type=js-register-submit]").on("click", function (e) {
    e.preventDefault();
    $("[data-type=js-register]").submit();
  });

  $("[data-type=js-recovery]").on("submit", function (e) {
    e.preventDefault();
    let mist = 0,
      form = $("[data-type=js-recovery]"),
      error = $("[data-type=js-recovery-error]"),
      email = form.find("input[name=email]"),
      sessid = $('input[name=sessid]');

    if (!email.val()) {
      email.parents("label").addClass("error");
      mist++;
    } else {
      email.parents("label").removeClass("error");
    }

    error.html('');

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/main/recovery.php",
        data: {
          "sessid": sessid.val(),
          "email": email.val(),
        },
        dataType: 'json',
        success: function (a) {
          if (a.error) {
            location.href = '/password-recovery/fail/';
          } else {
            location.href = '/password-recovery/success/';
          }
        },
      });
    }
  });
};

const account = function () {
  console.log("account");

  $("[data-type=js-password]").on("submit", function (e) {
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
        success: function (a) {
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

  $("[data-type=js-register-submit]").on("click", function (e) {
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
          success: function (a) {
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
          success: function (a) {
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

  $("[data-type=js-profile]").on("submit", function (e) {
    e.preventDefault();
    let mist = 0,
      form = $("[data-type=js-profile]"),
      error = form.find("#error"),
      name = form.find("input[name=name]"),
      phone = form.find("input[name=phone]"),
      city = form.find("select[name=city]"),
      address = form.find("input[name=address]"),
      sessid = $('input[name=sessid]');

    if (!name.val()) {
      name.parents(".form__group").addClass("error");
      mist++;
    } else {
      name.parents(".form__group").removeClass("error");
    }

    if (!phone.val()) {
      phone.parents(".form__group").addClass("error");
      mist++;
    } else {
      phone.parents(".form__group").removeClass("error");
    }

    error.html("");

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/account/profile.php",
        data: {
          "name": name.val(),
          "phone": phone.val(),
          "city": city.val(),
          "address": address.val(),
          "sessid": sessid.val()
        },
        dataType: 'json',
        success: function (a) {
          if (a.error) {
            error.html(a);
          } else {
            form.hide();
            $(".mainTitle h2").text("Профиль изменен!");
            AOS.init({
              offset: 50,
            });
          }
        },
      });
    }
  });

  $("[data-type=js-requisites]").on("submit", function (e) {
    e.preventDefault();
    let mist = 0,
      form = $("[data-type=js-requisites]"),
      error = form.find("#error"),
      company = form.find("input[name=company]"),
      inn = form.find("input[name=inn]"),
      kpp = form.find("input[name=kpp]"),
      bic = form.find("input[name=bic]"),
      kor_bill = form.find("input[name=kor_bill]"),
      bill = form.find("input[name=bill]"),
      legal_adr = form.find("input[name=legal_adr]"),
      post_adr = form.find("input[name=post_adr]"),
      director = form.find("input[name=director]"),
      act = form.find("input[name=act]"),
      state = form.find("input[name=state]"),
      sessid = $('input[name=sessid]');

    error.html("");

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/account/requisites.php",
        data: {
          "company": company.val(),
          "inn": inn.val(),
          "kpp": kpp.val(),
          "bic": bic.val(),
          "kor_bill": kor_bill.val(),
          "bill": bill.val(),
          "legal_adr": legal_adr.val(),
          "post_adr": post_adr.val(),
          "director": director.val(),
          "act": act.val(),
          "state": state.val(),
          "sessid": sessid.val()
        },
        dataType: 'json',
        success: function (a) {
          console.log(a);
          if (a.error) {
            error.html(a);
          } else {
            form.hide();
            $(".mainTitle h2").text("Реквизиты изменены!");
            AOS.init({
              offset: 50,
            });
          }
        },
      });
    }
  });
};

const basket = function () {
  console.log("basket");
  $("[data-type=js-basket-add]").on("click", function (e) {
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
        success: function (a) {
          $("[data-type=js-basket-header]").load(
            "/local/templates/main/include/ajax/basket/header.php"
          );
          $("[data-type=js-basket-header2]").load(
            "/local/templates/main/include/ajax/basket/header2.php"
          );
        },
      });
    }
  });

  $(document).on("change", "[data-type=js-basket-qty]", function (e) {
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
        success: function (a) {
          $("[data-type=js-basket]").load(
            "/local/templates/main/include/ajax/basket/main.php"
          );
          $("[data-type=js-basket-header]").load(
            "/local/templates/main/include/ajax/basket/header.php"
          );
          $("[data-type=js-basket-header2]").load(
            "/local/templates/main/include/ajax/basket/header2.php"
          );
        },
      });
    }
  });

  $(document).on("click", "[data-type=js-basket-qty-minus]", function (e) {
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

  $(document).on("click", "[data-type=js-basket-qty-plus]", function (e) {
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

  $(document).on("click", "[data-type=js-basket-delete]", function (e) {
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

const order = function () {
  $(document).on('change', '[data-type=js-checkout] select[name=city]', function () {
    orderRefresh();
  });

  $(document).on('click', '[data-type=js-checkout-type]', function (e) {
    e.preventDefault();
    console.log('type');
    $('[data-type=js-checkout-type]').removeClass('active');
    $(this).addClass('active');
    orderRefresh();
  });

  $(document).on('change', '[data-type=js-checkout] input[name=delivery]', function () {
    console.log('delivery');
    orderRefresh();
  });

  function orderRefresh() {
    console.log('refresh');
    let url = window.location.pathname,
      checkout = $('[data-type=js-checkout]'),
      type = checkout.find('[data-type=js-checkout-type]'),
      typeValue = 'fz',
      name = checkout.find('input[name=name]'),
      phone = checkout.find('input[name=phone]'),
      email = checkout.find('input[name=email]'),
      city = checkout.find('select[name=city]'),
      address = checkout.find('input[name=address]'),
      message = checkout.find('textarea[name=message]'),
      delivery = checkout.find('input[name=delivery]'),
      deliveryValue = 0,
      payment = checkout.find('input[name=payment]'),
      paymentValue = 0;

    type.each(function () {
      if ($(this).hasClass('active')) {
        typeValue = $(this).attr('data-value');
      }
    });

    delivery.each(function () {
      if ($(this).prop('checked')) {
        deliveryValue = $(this).val();
      }
    });

    payment.each(function () {
      if ($(this).prop('checked')) {
        paymentValue = $(this).val();
      }
    });

    $.ajax({
      type: 'POST',
      url: url,
      data: ({
        'ajax_checkout': true,
        'type': typeValue,
        'name': name.val(),
        'phone': phone.val(),
        'email': email.val(),
        'city': city.val(),
        'address': address.val(),
        'message': message.val(),
        'delivery': deliveryValue,
        'payment': paymentValue,
      }),
      success: function (a) {
        $('[data-type=js-checkout]').html(a);

        function formatState(state) {
          if (!state.id) {
            return state.text;
          }
          const tip = $(state.element).data('tip');
          const $state = $(
            '<span>' + state.text + '</span> <span class="desc">' + tip + '</span>'
          );
          return $state;
        };


        $('[data-type=js-checkout] .select').select2({
          templateResult: formatState
        });
        $('[data-type=js-checkout] .select').on('select2:open', function () {
          $('input.select2-search__field').prop('placeholder', 'Начните вводить город');
          $('.select2-dropdown').hide();
          setTimeout(function () {
            $('.select2-dropdown').slideDown("slow");
          }, 200);
        });

        $('[data-type=js-checkout] [name=phone]').mask('+7 (999) 999-9999');

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

            $(window).scroll(function () { // scroll event
              const windowTop = $(window).scrollTop(); // returns number

              if (stopPoint < windowTop) {
                $sticky.css({
                  position: 'absolute',
                  top: diff
                });
              } else if (stickyTop < windowTop + stickOffset) {
                $sticky.css({
                  position: 'fixed',
                  top: stickOffset
                });
              } else {
                $sticky.css({
                  position: 'absolute',
                  top: 'initial'
                });
              }
            });

          }
        }
      }
    });
  }

  $(document).on('click', '[data-type=js-checkout-submit]', function (e) {
    e.preventDefault();
    orderSubmit();
  });


  function orderSubmit() {
    console.log('submit');
    let mist = 0,
      checkout = $('[data-type=js-checkout]'),
      type = checkout.find('[data-type=js-checkout-type]'),
      typeValue = 'fz',
      name = checkout.find('input[name=name]'),
      phone = checkout.find('input[name=phone]'),
      email = checkout.find('input[name=email]'),
      city = checkout.find('select[name=city]'),
      address = checkout.find('input[name=address]'),
      message = checkout.find('textarea[name=message]'),
      deliveryPrice = checkout.find('input[name=delivery_price]'),
      delivery = checkout.find('input[name=delivery]'),
      deliveryValue = 0,
      payment = checkout.find('input[name=payment]'),
      paymentValue = 0,
      agreement = checkout.find('input[name=agreement]');

    type.each(function () {
      if ($(this).hasClass('active')) {
        typeValue = $(this).attr('data-value');
      }
    });

    delivery.each(function () {
      if ($(this).prop('checked')) {
        deliveryValue = $(this).val();
      }
    });

    payment.each(function () {
      if ($(this).prop('checked')) {
        paymentValue = $(this).val();
      }
    });

    if (!name.val()) {
      name.parents('label').addClass('error');
      mist++;
    } else {
      name.parents('label').removeClass('error');
    }

    if (!phone.val() || phone.val().length != 17) {
      phone.parents('label').addClass('error');
      mist++;
      console.log(phone.val().length);
    } else {
      phone.parents('label').removeClass('error');
    }

    if (!city.val()) {
      city.parents('.form__group').addClass('error');
      mist++;
    } else {
      city.parents('.form__group').removeClass('error');
    }

    if (!deliveryValue) {
      delivery.parents('.radio').addClass('error');
      mist++;
    } else {
      delivery.parents('.radio').removeClass('error');
    }

    if (!paymentValue) {
      payment.parents('.radio').addClass('error');
      mist++;
    } else {
      payment.parents('.radio').removeClass('error');
    }

    if (!agreement.prop('checked')) {
      mist++;
      agreement.parents('.checkbox').addClass('error');
    } else {
      agreement.parents('.checkbox').removeClass('error');
    }

    if (typeValue == 'fz') {
      if (mist == 0) {
        $.ajax({
          type: 'POST',
          url: '/local/templates/main/include/ajax/checkout/add.php',
          data: ({
            'type': typeValue,
            'name': name.val(),
            'phone': phone.val(),
            'email': email.val(),
            'city': city.val(),
            'address': address.val(),
            'message': message.val(),
            'delivery': deliveryValue,
            'deliveryPrice': deliveryPrice.val(),
            'payment': paymentValue,
          }),
          success: function (a) {
            $('[data-type=js-checkout]').html(a);
          }
        });
      } else {
        if (checkout.find('.error').eq(0).length) {
          $('html,body').animate({
            scrollTop: checkout.find('.error').eq(0).offset().top
          }, 'slow');
        }
      }
    }

    if (typeValue == 'ur') {
      let company = checkout.find('input[name=company]'),
        inn = checkout.find('input[name=inn]'),
        kpp = checkout.find('input[name=kpp]'),
        bic = checkout.find('input[name=bic]'),
        korrBill = checkout.find('input[name=korrBill]'),
        bill = checkout.find('input[name=bill]'),
        legalAdr = checkout.find('input[name=legalAdr]'),
        postAdr = checkout.find('input[name=postAdr]'),
        director = checkout.find('input[name=director]'),
        act = checkout.find('input[name=act]'),
        state = checkout.find('input[name=state]');

      if (!company.val()) {
        company.parents('label').addClass('error');
        mist++;
      } else {
        company.parents('label').removeClass('error');
      }

      if (!inn.val()) {
        inn.parents('label').addClass('error');
        mist++;
      } else {
        inn.parents('label').removeClass('error');
      }

      if (!kpp.val()) {
        kpp.parents('label').addClass('error');
        mist++;
      } else {
        kpp.parents('label').removeClass('error');
      }

      if (!bic.val()) {
        bic.parents('label').addClass('error');
        mist++;
      } else {
        bic.parents('label').removeClass('error');
      }

      if (!korrBill.val()) {
        korrBill.parents('label').addClass('error');
        mist++;
      } else {
        korrBill.parents('label').removeClass('error');
      }

      if (!bill.val()) {
        bill.parents('label').addClass('error');
        mist++;
      } else {
        bill.parents('label').removeClass('error');
      }

      if (!legalAdr.val()) {
        legalAdr.parents('label').addClass('error');
        mist++;
      } else {
        legalAdr.parents('label').removeClass('error');
      }

      if (!postAdr.val()) {
        postAdr.parents('label').addClass('error');
        mist++;
      } else {
        postAdr.parents('label').removeClass('error');
      }

      if (!director.val()) {
        director.parents('label').addClass('error');
        mist++;
      } else {
        director.parents('label').removeClass('error');
      }

      if (!act.val()) {
        act.parents('label').addClass('error');
        mist++;
      } else {
        act.parents('label').removeClass('error');
      }

      if (!state.val()) {
        state.parents('label').addClass('error');
        mist++;
      } else {
        state.parents('label').removeClass('error');
      }

      if (mist == 0) {
        $.ajax({
          type: 'POST',
          url: '/local/templates/main/include/ajax/checkout/add.php',
          data: ({
            'type': typeValue,
            'name': name.val(),
            'phone': phone.val(),
            'email': email.val(),
            'city': city.val(),
            'address': address.val(),
            'message': message.val(),
            'delivery': deliveryValue,
            'deliveryPrice': deliveryPrice.val(),
            'payment': paymentValue,
            'company': company.val(),
            'inn': inn.val(),
            'kpp': kpp.val(),
            'bic': bic.val(),
            'korrBill': korrBill.val(),
            'bill': bill.val(),
            'legalAdr': legalAdr.val(),
            'postAdr': postAdr.val(),
            'director': director.val(),
            'act': act.val(),
            'state': state.val(),
          }),
          success: function (a) {
            $('[data-type=js-checkout]').html(a);
          }
        });
      } else {
        if (checkout.find('.error').eq(0).length) {
          $('html,body').animate({
            scrollTop: checkout.find('.error').eq(0).offset().top
          }, 'slow');
        }
      }
    }
  }
};

const filter = function () {
  $("[data-type=js-filter-submit]").on("click", function (e) {
    e.preventDefault();
    $("[data-type=js-filter]").submit();
  });
};

const wherebuy = function () {
  console.log("wherebuy");
  $('[data-type=js-country-select]').on('change', function () {
    let url = window.location.pathname,
      country = $(this).val();

    $.ajax({
      type: 'POST',
      url: url,
      data: ({
        'ajax_city_select': true,
        'country': country,
      }),
      success: function (a) {
        $('[data-type=js-city-select-body]').html(a);
        $("[data-type=js-city-select-body] .select").select2({
          templateResult: formatState,
        });
      }
    });
  });

  if ($('[data-type=js-city-action]').length) {
    $('[data-type=js-city-action]').each(function () {
      if ($(this).hasClass('active')) {
        let city = $(this).attr('data-value'),
          map = $(this).attr('data-map');

        city_action(city, map);
      }
    });
  }

  $('[data-type=js-city-action]').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-city-action]').removeClass('active');
    $(this).addClass('active');
    let city = $(this).attr('data-value'),
      map = $(this).attr('data-map');

    city_action(city, map);
  });

  function city_action(city, map) {
    let url = window.location.pathname;

    $.ajax({
      type: 'POST',
      url: url,
      data: ({
        'ajax_city_action': true,
        'city': city,
        'map': map,
      }),
      success: function (a) {
        $('[data-type=js-city-body]').html(a);
        $('[data-type=js-city-body] input[name=map_center2]').trigger('change');
      }
    });
  }

  $(document).on('change', '[data-type=js-city-select]', function () {
    console.log("city");
    let url = window.location.pathname,
      city = $(this).val();

    $.ajax({
      type: 'POST',
      url: url,
      data: ({
        'ajax_city_map': true,
        'city': city,
      }),
      success: function (a) {
        $('[data-type=js-city-select-body] input[name=map_center]').val(a);
        $('[data-type=js-city-select-body] input[name=map_center]').trigger('change');
      }
    });
  });
};

const formSubmer = function () {
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $('[data-type=js-subscribe-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      email = form.find('input[name=email]'),
      sessid = $('input[name=sessid]'),
      types = [];

    form.find('input[name=types]').each(function () {
      if ($(this).prop('checked')) {
        types[types.length] = $(this).val();
      }
    });

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/subscribe.php",
        data: ({
          "sessid": sessid.val(),
          "types": types,
          "email": email.val()
        }),
        success: function (a) {
          form.find('.section__bottom__form__message').show();
          console.log(a);
        }
      });
    }
  });

  $('[data-type=js-feedback-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      email = form.find('input[name=email]'),
      message = form.find('textarea[name=message]'),
      agree = form.find('input[name=agree]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (agree.prop('checked')) {
      agree.parents('.checkbox').removeClass('error');
    } else {
      agree.parents('.checkbox').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/feedback.php",
        data: ({
          "sessid": sessid.val(),
          "name": name.val(),
          "phone": phone.val(),
          "email": email.val(),
          "message": message.val()
        }),
        success: function (a) {
          console.log(a);
          if (form.hasClass('basicControl')) {
            form.hide();
            $(".mainTitle h2").text("Запрос отправлен!");
            AOS.init({
              offset: 50,
            });
          } else {
            form.find('.inner').slideDown();
            form.find('.outer').hide();
          }
        }
      });
    }
  });

  $('[data-type=js-feedback-form] .simpleForm-btn').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-feedback-form]').submit();
  });

  $('[data-type=js-feedback-form] .return--js').on('click', function (e) {
    e.preventDefault();
    $(this).parents('[data-type=js-feedback-form]').find('.inner').hide();
    $(this).parents('[data-type=js-feedback-form]').find('.outer').slideDown();
    $(this).parents('[data-type=js-feedback-form]').find('input,textarea').val('');
  });

  $('[data-type=js-vacancy-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      email = form.find('input[name=email]'),
      message = form.find('textarea[name=message]'),
      agree = form.find('input[name=agree]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (agree.prop('checked')) {
      agree.parents('.checkbox').removeClass('error');
    } else {
      agree.parents('.checkbox').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/vacancy.php",
        data: ({
          "sessid": sessid.val(),
          "name": name.val(),
          "phone": phone.val(),
          "email": email.val(),
          "message": message.val()
        }),
        success: function (a) {
          console.log(a);
          $('.inner').slideDown();
          $('.outer').hide();
        }
      });
    }
  });

  $('[data-type=js-vacancy-form] .simpleForm-btn').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-vacancy-form]').submit();
  });

  $('[data-type=js-vacancy-form] .return--js').on('click', function (e) {
    e.preventDefault();
    $(this).parents('[data-type=js-vacancy-form]').find('.inner').hide();
    $(this).parents('[data-type=js-vacancy-form]').find('.outer').slideDown();
    $(this).parents('[data-type=js-vacancy-form]').find('input,textarea').val('');
  });

  $('[data-type=js-vacancy-detail-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      types = form.find('input[name=vacancy]'),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      email = form.find('input[name=email]'),
      agree = form.find('input[name=agree]'),
      message = form.find('textarea[name=message]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (agree.prop('checked')) {
      agree.parents('.checkbox').removeClass('error');
    } else {
      agree.parents('.checkbox').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/vacancy.php",
        data: ({
          "sessid": sessid.val(),
          "types": types.val(),
          "name": name.val(),
          "phone": phone.val(),
          "email": email.val(),
          "message": message.val()
        }),
        success: function (a) {
          form.parents('.accordion-content').find('.main-content--list').show();
          form.parents('.accordion-content').find('.showForm--js').show();
          form.find('input,textarea').val('');
          form.hide();
        }
      });
    }
  });

  $('[data-type=js-dealer-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      email = form.find('input[name=email]'),
      message = form.find('textarea[name=message]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/dealer.php",
        data: ({
          "sessid": sessid.val(),
          "name": name.val(),
          "phone": phone.val(),
          "email": email.val(),
          "message": message.val()
        }),
        success: function (a) {
          console.log(a);
          $('.inner').slideDown();
          $('.outer').hide();
        }
      });
    }
  });

  $('[data-type=js-dealer-form] .simpleForm-btn').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-dealer-form]').submit();
  });

  $('[data-type=js-dealer-form] .return--js').on('click', function (e) {
    e.preventDefault();
    $(this).parents('[data-type=js-dealer-form]').find('.inner').hide();
    $(this).parents('[data-type=js-dealer-form]').find('.outer').slideDown();
    $(this).parents('[data-type=js-dealer-form]').find('input,textarea').val('');
  });

  $('[data-type=js-supplier-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      email = form.find('input[name=email]'),
      message = form.find('textarea[name=message]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/supplier.php",
        data: ({
          "sessid": sessid.val(),
          "name": name.val(),
          "phone": phone.val(),
          "email": email.val(),
          "message": message.val()
        }),
        success: function (a) {
          console.log(a);
          $('.inner').slideDown();
          $('.outer').hide();
        }
      });
    }
  });

  $('[data-type=js-supplier-form] .simpleForm-btn').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-supplier-form]').submit();
  });

  $('[data-type=js-supplier-form] .return--js').on('click', function (e) {
    e.preventDefault();
    $(this).parents('[data-type=js-supplier-form]').find('.inner').hide();
    $(this).parents('[data-type=js-supplier-form]').find('.outer').slideDown();
    $(this).parents('[data-type=js-supplier-form]').find('input,textarea').val('');
  });

  $('[data-type=js-call-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      message = form.find('textarea[name=message]'),
      agree = form.find('input[name=agree]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (agree.prop('checked')) {
      agree.parents('.checkbox').removeClass('error');
    } else {
      agree.parents('.checkbox').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/call.php",
        data: ({
          "sessid": sessid.val(),
          "name": name.val(),
          "phone": phone.val(),
          "message": message.val()
        }),
        success: function (a) {
          console.log(a);
          form.find('.inner').slideDown();
          form.find('.outer').hide();
        }
      });
    }
  });

  $('[data-type=js-call-form] .simpleForm-btn').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-call-form]').submit();
  });

  $('[data-type=js-call-form] .return--js').on('click', function (e) {
    e.preventDefault();
    $(this).parents('[data-type=js-call-form]').find('.inner').hide();
    $(this).parents('[data-type=js-call-form]').find('.outer').slideDown();
    $(this).parents('[data-type=js-call-form]').find('input,textarea').val('');
  });

  $('[data-type=js-work-form]').on('submit', function (e) {
    e.preventDefault();
    let
      mist = 0,
      form = $(this),
      name = form.find('input[name=name]'),
      phone = form.find('input[name=phone]'),
      email = form.find('input[name=email]'),
      message = form.find('textarea[name=message]'),
      agree = form.find('input[name=agree]'),
      sessid = $('input[name=sessid]');

    if (name.val()) {
      name.parents('label').removeClass('error');
    } else {
      name.parents('label').addClass('error');
      mist++;
    }

    if (phone.val()) {
      phone.parents('label').removeClass('error');
    } else {
      phone.parents('label').addClass('error');
      mist++;
    }

    if (validateEmail(email.val())) {
      email.parents('label').removeClass('error');
    } else {
      email.parents('label').addClass('error');
      mist++;
    }

    if (message.val()) {
      message.parents('label').removeClass('error');
    } else {
      message.parents('label').addClass('error');
      mist++;
    }

    if (agree.prop('checked')) {
      agree.parents('.checkbox').removeClass('error');
    } else {
      agree.parents('.checkbox').addClass('error');
      mist++;
    }

    if (mist == 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/form/work.php",
        data: ({
          "sessid": sessid.val(),
          "name": name.val(),
          "phone": phone.val(),
          "email": email.val(),
          "message": message.val()
        }),
        success: function (a) {
          console.log(a);
          $('.inner').slideDown();
          $('.outer').hide();
        }
      });
    }
  });

  $('[data-type=js-work-form] .simpleForm-btn').on('click', function (e) {
    e.preventDefault();
    $('[data-type=js-work-form]').submit();
  });

  $('[data-type=js-work-form] .return--js').on('click', function (e) {
    e.preventDefault();
    $(this).parents('[data-type=js-work-form]').find('.inner').hide();
    $(this).parents('[data-type=js-work-form]').find('.outer').slideDown();
    $(this).parents('[data-type=js-work-form]').find('input,textarea').val('');
  });
};

function formatState(state) {
  if (!state.id) {
    return state.text;
  }
  const tip = $(state.element).data("tip");
  const $state = tip ?
    $(
      "<span>" +
      state.text +
      '</span> <span class="desc">' +
      tip +
      "</span>"
    ) :
    $("<span>" + state.text + "</span>");
  return $state;
}