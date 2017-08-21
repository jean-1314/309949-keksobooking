'use strict';

var ADS_NUMBER = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_RANGE = [300, 900, 100, 500]; //[xMin, xMax, yMin, yMax]
var PIN_SIZE = [56, 75]; //width = 56px; height = 75px;

function getAvatar() {
  var randAvatarNum = Math.floor(Math.random() * ADS_NUMBER);
  return 'img/avatars/user{{0' + randAvatarNum.toString() + '}}.png';
}

function getTitle() {
  return TITLES[Math.floor(Math.random() * TITLES.length)];
}

function getAddress() {
  return '{{' + locationX + '}}, {{' + locationY + '}}';
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
  var locationX = Math.floor(Math.random() * (PIN_RANGE[1] - PIN_RANGE[0] - pinX) + PIN_RANGE[0]) + pinX;
  return locationX;
}

function getLocationY() {
  var pinY = PIN_SIZE[1] / 2;
  var locationY = Math.floor(Math.random() * (PIN_RANGE[3] - PIN_RANGE[2] - pinY) + PIN_RANGE[2]) + Math.floor(pinY);
  return locationY;
}

function createRentAd() {
  return {
    "author": {
      "avatar": getAvatar()
    },

    "offer": {
      "title": getTitle(),
      "address": getAddress(),
      "price": getPrice(),
      "type": getType(),
      "rooms": getRooms(),
      "guests": getGuests(),
      "checkin": getCheckInOut(),
      "checkout": getCheckInOut(),
      "features": getFeatures(),
      "description": '',
      "photos": []
    },

    "location": {
      "x": getLocationX(),
      "y": getLocationY()
    }
  }
}

function createAds(adsNumber) {
  var rentAds = [];

  for (var i = 0; i < adsNumber; i++) {
    rentAds[i] = createRentAd();
  }

  return rentAds;
}
console.log(createAds(8));
