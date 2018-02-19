'use strict';

function callBack(location) {
  var name = '';
  var phone = '';
  var formData = new FormData();

  if (location == 'header') {
    name = $('#name').val();
    phone = $('#phone').val();
  }
  else {
    name = $('#name-modal').val();
    phone = $('#phone-modal').val();
  }

  formData.append('name', name);
  formData.append('phone', phone);

  if (name && phone) {
    if (phone != '+7 ') {
      $.ajax({
        url: "/bid",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        error: function (response) {
            //var errorText = ajaxErrors(response);
            var errorText = 'Что-то пошло не так, попробуйте позже.'
            if (location == 'header') $("#response").html(showAlertMessage(errorText, "danger"));
            else $("#response-modal").html(showAlertMessage(errorText, "danger"));
        },
        success: function (response) {
            $("input").val("");
            if (location == 'header') $("#response").html(showAlertMessage("Отлично! В скором времени мы Вам перезвоним!", "success"));
            else $("#response-modal").html(showAlertMessage("Отлично! В скором времени мы Вам перезвоним!", "success"));
        }
      })
    }
    else {
      if (location == 'header') $("#response").html(showAlertMessage("Вы не ввели телефонный номер!", "danger"));
      else $("#response-modal").html(showAlertMessage("Вы не ввели телефонный номер!", "danger"));
    }
  }
}

function subscribe(event) {
  const email = $('#email').val();

  var formData = new FormData();
  formData.append('email', email);

  if (email) {
    $.ajax({
      url: "/subscriber",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      error: function (response) {
          //var errorText = ajaxErrors(response);
          var errorText = 'Что-то пошло не так, попробуйте позже.'
          $("#subscribe-response").html(showAlertMessage(errorText, "danger"));
      },
      success: function (response) {
          $("input").val("");
          $("#subscribe-response").html(showAlertMessage("Отлично! Подписка оформлена!", "success"));
      }
    })
  }
}

function showAlertMessage(msg, status) {
    $(".msg").remove();
    msg = `<div class="msg msg-${status} msg-${status}-text">${msg}</div>`;
    return msg;
}

$(function () {
  $(".presentation .block").on("click", function(){
    if (!$(this).hasClass("active")) {
      $(".presentation .block").removeClass("active");
      $(this).addClass("active");
    }
  });
});

$("head").append('<script type="text/javascript" src="/js/ajax-errors.js"></script>');
