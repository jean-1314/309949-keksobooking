'use strict';

var ENTER_KEYCODE = 13;

var noticeForm = document.forms.notice;

var noticeInputs = noticeForm.querySelectorAll('input');
var noticeInputsArray = Array.prototype.slice.call(noticeInputs);

var typeInput = document.getElementById('type');
var priceInput = document.getElementById('price');

var roomInput = document.getElementById('room_number');
var capacityInput = document.getElementById('capacity');

var submitBtn = document.querySelector('.form__submit');

typeInput.addEventListener('change', function () {
  if (typeInput.options[0].selected) {
    priceInput.min = 1000;
    priceInput.value = 1000;
  }

  if (typeInput.options[1].selected) {
    priceInput.min = 0;
    priceInput.value = 0;
  }

  if (typeInput.options[2].selected) {
    priceInput.min = 5000;
    priceInput.value = 5000;
  }

  if (typeInput.options[3].selected) {
    priceInput.min = 10000;
    priceInput.value = 10000;
  }
});

roomInput.addEventListener('change', function () {
  if (roomInput.options[0].selected) {
    capacityInput.options[2].selected = true;
  }

  if (roomInput.options[1].selected) {
    capacityInput.options[1].selected = true;
    capacityInput.options[2].selected = true;
  }

  if (roomInput.options[2].selected) {
    capacityInput.options[0].selected = true;
    capacityInput.options[1].selected = true;
    capacityInput.options[2].selected = true;
  }

  if (roomInput.options[3].selected) {
    capacityInput.options[3].selected = true;
  }
});

capacityInput.addEventListener('change', function () {
  if (capacityInput.options[0].selected) {
    roomInput.options[0].selected = true;
    roomInput.options[1].selected = true;
    roomInput.options[2].selected = true;
  }

  if (capacityInput.options[1].selected) {
    roomInput.options[0].selected = true;
    roomInput.options[1].selected = true;
  }

  if (capacityInput.options[2].selected) {
    roomInput.options[0].selected = true;
  }

  if (capacityInput.options[3].selected) {
    roomInput.options[3].selected = true;
  }
});

function addInvalidBorder() {
  for (var i = 0; i < noticeInputsArray.length; i++) {
    if (!noticeInputsArray[i].validity.valid) {
      noticeInputsArray[i].style.border = '1px solid red';
    }
  }
}

submitBtn.addEventListener('click', function () {
  addInvalidBorder();
});

submitBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    addInvalidBorder();
  }
});
