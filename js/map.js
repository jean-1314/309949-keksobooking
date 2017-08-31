'use strict';
(function () {
  function init(adsNumber) {
    var adItems = [];
    for (var i = 0; i < adsNumber; i++) {
      adItems.push(window.data.getAd(i + 1));
    }

    adItems.forEach(window.pin.getCreatePin());
  }

  init(window.data.getAdsNumber());

  function openDialog(pinData) {
    window.data.getDialog().style.display = 'block';
    window.card.getCreateDialog(pinData);
  }

  window.map = {
    getopenDialog: function () {
      return openDialog();
    }
  };
})();
