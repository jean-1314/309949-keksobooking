'use strict';

var ADS_NUMBER = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_RANGE = [300, 900, 100, 500]; // [xMin, xMax, yMin, yMax]
var PIN_SIZE = [40, 40]; // width = 40px; height = 40px;

function getAvatar() {
  var randAvatarNum = Math.floor(Math.random() * ADS_NUMBER + 1);
  return 'img/avatars/user0' + randAvatarNum.toString() + '.png';
}

function getTitle() {
  return TITLES[Math.floor(Math.random() * TITLES.length)];
}

function getPrice() {
  return Math.floor(Math.random() * 1000000) + 1000;
}

function getType() {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
}

function getRooms() {
  return Math.floor(Math.random() * 5) + 1;
}

function getGuests() {
  return Math.floor(Math.random() * 10) + 1;
}

function getCheckInOut() {
  return CHECKINOUT_TIME[Math.floor(Math.random() * CHECKINOUT_TIME.length)];
}

function getFeatures() {
  FEATURES.length = Math.floor(Math.random() * 6);
  return FEATURES;
}

function createRentAd() {
  var locationX = getLocationX();
  var locationY = getLocationY();
  var avatar = getAvatar();

  function getLocationX() {
    var pinX = PIN_SIZE[0] / 2;
    return Math.floor(Math.random() * (PIN_RANGE[1] - PIN_RANGE[0] - pinX) + PIN_RANGE[0]) + pinX;
  }

  function getLocationY() {
    var pinY = PIN_SIZE[1] / 2;
    return Math.floor(Math.random() * (PIN_RANGE[3] - PIN_RANGE[2] - pinY) + PIN_RANGE[2]) + pinY;
  }

  function getAddress() {
    return '' + locationX + ', ' + locationY + '';
  }

  function createPin() {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    var pin = document.createElement('div');
    pin.className = 'pin';
    pin.style = 'left:' + locationX + 'px; top: ' + locationY + 'px';
    pin.innerHTML = '<img src=' + avatar + ' class="rounded" width="40" height="40">';
    fragment.appendChild(pin);
    pinMap.appendChild(fragment);
  }
  createPin();

  function createPanel() {
    var dialogPanel = document.querySelector('.dialog__panel');
    var template = document.querySelector('#lodge-template');
    var lodgeElement = template.content.cloneNode(true);
    lodgeElement.children.textContent = getTitle();
    dialogPanel.appendChild(lodgeElement);
  }
  createPanel();

  return {
    'author': {
      'avatar': getAvatar()
    },

    'offer': {
      'title': getTitle(),
      'address': getAddress(),
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

function createAds(adsNumber) {
  var rentAds = [];

  for (var i = 0; i < adsNumber; i++) {
    rentAds[i] = createRentAd();
  }

  return rentAds;
}

createAds(8);
