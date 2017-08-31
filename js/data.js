'use strict';
(function () {
  var ADS_NUMBER = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PIN_RANGE = [300, 900, 100, 500]; // [xMin, xMax, yMin, yMax]
  var PIN_SIZE = [40, 40]; // width = 40px; height = 40px;

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

  var dialog = document.getElementById('offer-dialog');
  var dialogOff = document.querySelector('.dialog__close');


  function generateRandomNumber(min, max) {
    var multiplier = max + 1 - min;
    return Math.floor(min + Math.random() * multiplier);
  }

  function shuffle(a) {
    var j;
    var x;
    var i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  function getAvatar(nameSuffix) {
    return 'img/avatars/user0' + nameSuffix + '.png';
  }

  function getTitle() {
    return TITLES[Math.floor(Math.random() * TITLES.length)];
  }

  function getPrice() {
    var minPrice = 1000;
    var maxPrice = 1000000;
    return generateRandomNumber(minPrice, maxPrice);
  }

  function getType() {
    return TYPES[Math.floor(Math.random() * TYPES.length)];
  }

  function getRooms() {
    var minRooms = 1;
    var maxRooms = 5;
    return generateRandomNumber(minRooms, maxRooms);
  }

  function getGuests() {
    var minGuests = 1;
    var maxGuests = 10;
    return generateRandomNumber(minGuests, maxGuests);
  }

  function getCheckInOut() {
    return CHECKINOUT_TIME[Math.floor(Math.random() * CHECKINOUT_TIME.length)];
  }

  function getFeatures() {
    var randFeaturesNumber = generateRandomNumber(0, FEATURES.length - 1);
    shuffle(FEATURES);
    return FEATURES.slice(0, randFeaturesNumber);
  }

  function getLocationX() {
    var pinX = PIN_SIZE[0] / 2;
    return Math.floor(Math.random() * (PIN_RANGE[1] - PIN_RANGE[0] - pinX) + PIN_RANGE[0]) + pinX;
  }

  function getLocationY() {
    var pinY = PIN_SIZE[1] / 2;
    return Math.floor(Math.random() * (PIN_RANGE[3] - PIN_RANGE[2] - pinY) + PIN_RANGE[2]) + pinY;
  }

  function getRentAd() {
    var locationX = getLocationX();
    var locationY = getLocationY();

    return {
      'author': {
        'avatar': getAvatar()
      },

      'offer': {
        'title': getTitle(),
        'address': '' + locationX + ', ' + locationY + '',
        'price': getPrice(),
        'type': getType(),
        'rooms': getRooms(),
        'guests': getGuests(),
        'checkin': getCheckInOut(),
        'checkout': getCheckInOut(),
        'features': getFeatures(),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }

  function closeDialog() {
    dialog.style.display = 'none';
  }

  closeDialog();

  window.data = {
    getAdsNumber: function () {
      return ADS_NUMBER;
    },

    esc: function () {
      return ESC_KEYCODE;
    },

    enter: function () {
      return ENTER_KEYCODE;
    },

    getLodgeTypePrices: function () {
      return LODGE_TYPES_PRICES;
    },

    getRoomsCapacity: function () {
      return ROOMS_CAPACITY;
    },

    getDialog: function () {
      return dialog;
    },

    getDialogOff: function () {
      return dialogOff;
    },

    getAd: function () {
      return getRentAd();
    },

    getCloseDialog: function () {
      return closeDialog();
    }
  };
})();
