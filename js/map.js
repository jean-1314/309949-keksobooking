'use strict';

var ADS_NUMBER = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PIN_RANGE = [300, 900, 100, 500]; // [xMin, xMax, yMin, yMax]
var PIN_SIZE = [40, 40]; // width = 40px; height = 40px;

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var adItems = [];
var dialog = document.getElementById('offer-dialog');
closeDialog();

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
  var randFeaturesNumber = generateRandomNumber(0, FEATURES.length);
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

function getRentAd(params) {
  var locationX = getLocationX();
  var locationY = getLocationY();

  return {
    'author': {
      'avatar': getAvatar(params.number)
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
  pin.innerHTML = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
  dialog.querySelector('.dialog__title').firstChild.setAttribute('src', data.author.avatar);
  fragment.appendChild(pin);
  pinMap.appendChild(fragment);
}

function createDialog(data) {
  var template = document.getElementById('lodge-template');

  template.content.querySelector('.lodge__title').textContent = data.offer.title;
  template.content.querySelector('.lodge__address').textContent = data.offer.address;
  template.content.querySelector('.lodge__price').innerHTML = data.offer.price + ' &#x20bd;/ночь';

  switch (data.offer.type) {
    case 'flat': template.content.querySelector('.lodge__type').textContent = 'Квартира';
      break;

    case 'house': template.content.querySelector('.lodge__type').textContent = 'Дом';
      break;

    case 'bungalo': template.content.querySelector('.lodge__type').textContent = 'Бунгало';
      break;

    default: template.content.querySelector('.lodge__type').textContent = 'Неопознанный тип жилья';
      break;
  }

  template.content.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  template.content.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout + '';

  var lodgeFeatures = template.content.querySelector('.lodge__features');
  for (var i = 0; i < data.offer.features.length; i++) {
    lodgeFeatures.innerHTML += '<span class="feature__image feature__image--' + data.offer.features[i] + '"></span>';
  }

  template.content.querySelector('.lodge__description').textContent = data.offer.description;

  dialog.replaceChild(template.content, dialog.children[1]);
}

function init(adsNumber) {
  for (var i = 0; i < adsNumber; i++) {
    adItems.push(getRentAd({number: i + 1}));
  }
  adItems.forEach(createPin);

  createDialog(adItems[adItems.length - 1]);
}

init(ADS_NUMBER);

var pinList = document.querySelectorAll('.pin');
var pinArray = Array.prototype.slice.call(pinList);
var dialogOff = document.querySelector('.dialog__close');

function activatePin(pin) {
  Array.prototype.forEach.call(document.querySelectorAll('.pin'), function(item) { if(item.classList.contains('pin--active')) item.classList.remove('pin--active') });
  pin.classList.add('pin--active');
}

function deactivatePin(pin) {
  pin.classList.remove('pin--active');
}

function openDialog(pinData) {
  console.log(pinData); // TODO теперь здесь передаются нужные данные, можно наполнять окно контентом!
  dialog.style.display = 'block';
  createDialog(pinData);
}

function closeDialog() {
  dialog.style.display = 'none';
}

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
    deactivatePin(evt.target);
  }
});

for (var i = 0; i < pinArray.length; i++) {
  var pin = pinArray[i];

  pin.addEventListener('click', function (relatedPinData) {
    if (this.classList.contains('pin--active')) {
      deactivatePin(this);
      closeDialog();
    } else {
      activatePin(this);
      openDialog(relatedPinData);
    }
  }.bind(pin, adItems[i]));

  pin.addEventListener('keydown', function (relatedPinData, evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePin(this);
      openDialog(relatedPinData);
    }
  }.bind(pin, adItems[i]));

  dialogOff.addEventListener('click', function () {
    closeDialog();
    deactivatePin(this);
  }.bind(pin));

  dialogOff.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeDialog();
      deactivatePin(this);
    }
  }.bind(pin));
}
