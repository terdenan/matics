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
          $("#subscribe-response").html(showAlertMessage("Отлично! В скором времени мы Вам перезвоним!", "success"));
      }
    })
  }
}

function showAlertMessage(msg, status) {
    $(".alert").remove();
    msg = `<div class="alert alert-${status} alert-dismissible fade show mt-2" role="alert">${msg}</div>`;
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
