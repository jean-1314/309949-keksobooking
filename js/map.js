'use strict';

function init(adsNumber) {
  var adItems = [];
  for (var i = 0; i < adsNumber; i++) {
    adItems.push(getRentAd({number: i + 1}));
  }

  adItems.forEach(createPin);
}

init(ADS_NUMBER);

function openDialog(pinData) {
  dialog.style.display = 'block';
  createDialog(pinData);
}

