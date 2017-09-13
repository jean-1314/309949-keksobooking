'use strict';
(function () {
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

  var NUMBER_OF_ROOMS = ['1', '2', '3', '100'];
  var NUMBER_OF_GUESTS = ['1', '2', '3', '0'];

  var APARTMENT_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var MIN_PRICES = [1000, 0, 5000, 10000];

  var noticeForm = document.forms.notice;

  var timeInInput = document.getElementById('timein');
  var timeOutInput = document.getElementById('timeout');

  var noticeInputs = noticeForm.querySelectorAll('input');

  var typeInput = document.getElementById('type');
  var priceInput = document.getElementById('price');

  var roomInput = document.getElementById('room_number');
  var capacityInput = document.getElementById('capacity');

  var submitBtn = document.querySelector('.form__submit');

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

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(timeInInput, timeOutInput, CHECKIN_TIME, CHECKOUT_TIME, syncValues);
  window.synchronizeFields(timeOutInput, timeInInput, CHECKOUT_TIME, CHECKIN_TIME, syncValues);

  window.synchronizeFields(roomInput, capacityInput, NUMBER_OF_ROOMS, NUMBER_OF_GUESTS, syncValues);
  window.synchronizeFields(capacityInput, roomInput, NUMBER_OF_GUESTS, NUMBER_OF_ROOMS, syncValues);

  window.synchronizeFields(typeInput, priceInput, APARTMENT_TYPES, MIN_PRICES, syncValueWithMin);

  submitBtn.addEventListener('click', function () {
    addInvalidBorder();
  });

  submitBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.enter) {
      addInvalidBorder();
    }
  });

  function successHandler(evt) {
    evt.preventDefault();
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: green;';
    node.style.position = 'absolute';
    node.style.width = '50%';
    node.style.top = '55%';
    node.style.left = '50%';
    node.style.transform = 'translateX(-50%)';
    node.style.fontSize = '30px';

    node.textContent = 'Ваше объявление успешно размещено!';
    document.body.insertAdjacentElement('afterbegin', node);
    noticeForm.reset();
  }

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), successHandler(), window.map.errorHandler);
    evt.preventDefault();
  });

  (function init() {
    capacityInput.value = '1';
    priceInput.value = 1000;
  })();
})();
