'use strict';
(function () {

  var PIN_RANGE = [300, 900, 200, 600]; // [xMin, xMax, yMin, yMax]
  var PIN_SIZE = [56, 75]; // width = 40px; height = 40px;

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

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

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var dialog = document.getElementById('offer-dialog');
  var dialogOff = document.querySelector('.dialog__close');

  function generateRandomNumber(min, max) {
    var multiplier = max + 1 - min;
    return Math.floor(min + Math.random() * multiplier);
  }

  function shuffle(array) {
    var randomNum;
    var newArray;
    for (var i = array.length; i; i--) {
      randomNum = Math.floor(Math.random() * i);
      newArray = array[i - 1];
      array[i - 1] = array[randomNum];
      array[randomNum] = newArray;
    }
  }

  function debounce(fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  }

  window.util = {
    debounce: debounce,

    pinRange: PIN_RANGE,

    pinSize: PIN_SIZE,

    esc: ESC_KEYCODE,

    enter: ENTER_KEYCODE,

    getLodgeTypePrices: LODGE_TYPES_PRICES,

    getRoomsCapacity: ROOMS_CAPACITY,

    getDialog: dialog,

    getDialogOff: dialogOff,

    getRandomNumber: generateRandomNumber,

    shuffle: shuffle
  };
})();
