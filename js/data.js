'use strict';
(function () {
  var ADS_NUMBER = 8;
  // var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  // var TYPES = ['flat', 'house', 'bungalo'];
  // var CHECKINOUT_TIME = ['12:00', '13:00', '14:00'];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // var pinRange = window.util.pinRange;
  // var rand = window.util.getRandomNumber;

  // function getAvatar(nameSuffix) {
  //   return 'img/avatars/user0' + nameSuffix + '.png';
  // }

  // function getTitle() {
  //   return TITLES[Math.floor(Math.random() * TITLES.length)];
  // }

  // function getPrice() {
  //   var minPrice = 1000;
  //   var maxPrice = 1000000;
  //   return rand(minPrice, maxPrice);
  // }

  // function getType() {
  //   return TYPES[Math.floor(Math.random() * TYPES.length)];
  // }

  // function getRooms() {
  //   var minRooms = 1;
  //   var maxRooms = 5;
  //   return rand(minRooms, maxRooms);
  // }

  // function getGuests() {
  //   var minGuests = 1;
  //   var maxGuests = 10;
  //   return rand(minGuests, maxGuests);
  // }

  // function getCheckInOut() {
  //   return CHECKINOUT_TIME[Math.floor(Math.random() * CHECKINOUT_TIME.length)];
  // }

  // function getFeatures() {
  //   var randFeaturesNumber = rand(0, FEATURES.length - 1);
  //   window.util.shuffle(FEATURES);
  //   return FEATURES.slice(0, randFeaturesNumber);
  // }

  // var pinX = window.util.pinSize[0] / 2;
  // var pinY = window.util.pinSize[1];

  // function getLocationX() {
  //   return rand(pinRange[0], pinRange[1]);
  // }

  // function getLocationY() {
  //   return rand(pinRange[2], pinRange[3]);
  // }

  // function getRentAd(params) {
  //   var locationX = getLocationX();
  //   var locationY = getLocationY();

  //   return {
  //     'author': {
  //       'avatar': getAvatar(params.number)
  //     },

  //     'offer': {
  //       'title': getTitle(),
  //       'address': '' + locationX + ', ' + locationY + '',
  //       'price': getPrice(),
  //       'type': getType(),
  //       'rooms': getRooms(),
  //       'guests': getGuests(),
  //       'checkin': getCheckInOut(),
  //       'checkout': getCheckInOut(),
  //       'features': getFeatures(),
  //       'description': '',
  //       'photos': []
  //     },

  //     'location': {
  //       'x': locationX - pinX,
  //       'y': locationY - pinY
  //     }
  //   };
  // }

  function getRentAds() {
    return window.backend.load;
  }

  function closeDialog() {
    window.util.getDialog.style.display = 'none';
  }

  closeDialog();
  window.data = {
    getAdsNumber: ADS_NUMBER,
    getRentAds: getRentAds(),
    getCloseDialog: closeDialog
  };
})();
