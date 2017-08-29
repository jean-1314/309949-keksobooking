'use strict';

var ENTER_KEYCODE = 13;

var LODGE_TYPES_PRICES = {
  'bungalo': {min: 0, value: 0},
  'flat': {min: 1000, value: 1000},
  'house': {min: 5000, value: 5000},
  'palace': {min: 10000, value: 10000}
};

var ROOMS_CAPACITY = {
  '1': '1',
  '2': '2',
  '3': '3',
  '100': '0',
  '0': '100'
};

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
  return ROOMS_CAPACITY[input.value] || 0;
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
  priceInput.min = LODGE_TYPES_PRICES[typeInput.value].min || 0;
  priceInput.value = LODGE_TYPES_PRICES[typeInput.value].value || 0;
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
  if (evt.keyCode === ENTER_KEYCODE) {
    addInvalidBorder();
  }
});

(function init() {
  capacityInput.value = '1';
  priceInput.value = 1000;
})();
