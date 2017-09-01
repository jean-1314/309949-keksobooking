'use strict';
(function () {
  function init(adsNumber) {
    var adItems = [];

    adItems.forEach(window.pin.getCreatePin);
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
