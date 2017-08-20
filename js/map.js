'use strict';

var ADS_NUMBER = 8;

function getAvatar() {
  var randAvatarNum = Math.floor(Math.random() * ADS_NUMBER);
  var randAvatar = 'img/avatars/user{{0' + randAvatarNum.toString() + '}}.png';
  return randAvatar;
}

function createRentAd() {
  var rentAd = {
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
      "checkin": getCheckin(),
      "checkout": getCheckout(),
      "features": getFeatures(),
      "description": '',
      "photos": []
    },

    "location": {
      "x": getLocationX(),
      "y": getLocationY()
    }
  }
  return rentAd;
}

function createAds(adsNumber) {
  var rentAds = [];

  for (var i = 0; i < adsNumber; i++) {
    rentAds[i] = createRentAd();
  }

  return rentAds;
}
