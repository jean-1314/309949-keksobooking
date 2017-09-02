'use strict';
(function () {

  function getRentAds() {
    var adItems = [];
    for (var i = 0; i < window.util.getAdsNumber; i++) {
      adItems.push(window.util.getAd({number: i + 1}));
    }
    return adItems;
  }

  function init() {
    var adItems = [];
    adItems.forEach(window.pin.getCreatePin);
  }

  function closeDialog() {
    window.util.getDialog.style.display = 'none';
  }

  window.data = {
    getRentAds: getRentAds()
  };

  closeDialog();
  init(window.util.getAdsNumber);
})();
