'use strict';

var ADS_NUMBER = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PIN_RANGE = [300, 900, 100, 500]; // [xMin, xMax, yMin, yMax]
var PIN_SIZE = [40, 40]; // width = 40px; height = 40px;

var adOptions = [];

function getAvatar() {
  var randAvatarNum = Math.floor(Math.random() * ADS_NUMBER + 1);
  return 'img/avatars/user0' + randAvatarNum + '.png';
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
  var avatar = getAvatar();

  return {
    'author': {
      'avatar': avatar
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

function createPin(data) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var pin = document.createElement('div');

  pin.className = 'pin';
  pin.style = 'left:' + data.location.x + 'px; top: ' + data.location.y + 'px';
  pin.innerHTML = '<img src=' + data.author.avatar + ' class="rounded" width="40" height="40">';

  fragment.appendChild(pin);
  pinMap.appendChild(fragment);
}

function createPanel(data) {
  var dialog = document.getElementById('offer-dialog');
  var template = document.getElementById('lodge-template');
  var oldDialog = document.querySelector('dialog__panel');

  template.content.querySelector('.lodge__title').textContent = data.offer.title;
  template.content.querySelector('.lodge__address').textContent = data.offer.address;
  template.content.querySelector('.lodge__price').textContent = data.offer.price + '\&#x20bd;/ночь';

  if (data.offer.type === 'flat') {
    template.content.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (data.offer.type === 'house') {
    template.content.querySelector('.lodge__type').textContent = 'Дом';
  } else if (data.offer.type === 'bungalo') {
    template.content.querySelector('.lodge__type').textContent = 'Бунгало';
  } else {
    template.content.querySelector('.lodge__type').textContent = 'Неопознанный тип жилья';
  }

  template.content.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  template.content.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout + '';

  for (var i = 0; i < data.offer.features.length; i++) {
    template.content.querySelector('.lodge__features').innerHTML = '<span class="feature__image feature__image--' + [i] + '"></span>';
  }

  template.content.querySelector('.lodge__description').textContent = data.offer.description;

  oldDialog = dialog.replaceChild(template.content, dialog.children[1]);
}

function init(adsNumber) {
  for (var i = 0; i < adsNumber; i++) {
    adOptions.push(getRentAd());
  }
  adOptions.map(createPin);
  createPanel(adOptions[0]);
}

init(ADS_NUMBER);
