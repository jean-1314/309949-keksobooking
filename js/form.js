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

  function getCapacity() {
    return window.util.getRoomsCapacity;
  }

  function addInvalidBorder() {
    for (var i = 0; i < noticeInputs.length; i++) {
      if (!noticeInputs[i].validity.valid) {
        noticeInputs[i].style.border = '1px solid red';
      }
    }
  }

  var syncValues = function (element, value) {
    element.value = value;
  };

  function setTimeIn() {
    timeOutInput.value = timeInInput.value;
  }

  function setTimeOut() {
    timeInInput.value = timeOutInput.value;
  }

  timeInInput.addEventListener('change', syncValues(setTimeIn, setTimeOut));

  timeOutInput.addEventListener('change', setTimeOut);
  // timeOutInput.addEventListener('change', function () {
  //   timeInInput.value = timeOutInput.value;
  // });

  typeInput.addEventListener('change', function () {
    priceInput.min = window.util.getLodgeTypePrices[typeInput.value].min || 0;
    priceInput.value = window.util.getLodgeTypePrices[typeInput.value].value || 0;
  });

  roomInput.addEventListener('change', function () {
    capacityInput.value = getCapacity()[roomInput.value] || 0;
  });

  capacityInput.addEventListener('change', function () {
    roomInput.value = getCapacity()[capacityInput.value] || 0;
  });

  submitBtn.addEventListener('click', function () {
    addInvalidBorder();
  });

  submitBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enter) {
      addInvalidBorder();
    }
  });

  (function init() {
    capacityInput.value = '1';
    priceInput.value = 1000;
  })();
})();
