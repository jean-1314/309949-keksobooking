'use strict';
(function () {
  var noticeForm = document.forms.notice;

  var timeInInput = document.getElementById('timein');
  var timeOutInput = document.getElementById('timeout');

  var noticeInputs = noticeForm.querySelectorAll('input');

  var typeInput = document.getElementById('type');
  var priceInput = document.getElementById('price');

  var roomInput = document.getElementById('room_number');
  var capacityInput = document.getElementById('capacity');

  var submitBtn = document.querySelector('.form__submit');

  function getRoomsCapacity(input) {
    return window.data.getRoomsCapacity[input.value] || 0;
  }

  function addInvalidBorder() {
    for (var i = 0; i < noticeInputs.length; i++) {
      if (!noticeInputs[i].validity.valid) {
        noticeInputs[i].style.border = '1px solid red';
      }
    }
  }

  timeInInput.addEventListener('change', function () {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', function () {
    timeInInput.value = timeOutInput.value;
  });

  typeInput.addEventListener('change', function () {
    priceInput.min = window.data.getLodgeTypePrices[typeInput.value].min || 0;
    priceInput.value = window.data.getLodgeTypePrices[typeInput.value].value || 0;
  });

  roomInput.addEventListener('change', function () {
    capacityInput.value = getRoomsCapacity(roomInput);
  });

  capacityInput.addEventListener('change', function () {
    roomInput.value = getRoomsCapacity(capacityInput);
  });

  submitBtn.addEventListener('click', function () {
    addInvalidBorder();
  });

  submitBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.enter) {
      addInvalidBorder();
    }
  });

  (function init() {
    capacityInput.value = '1';
    priceInput.value = 1000;
  })();
})();
