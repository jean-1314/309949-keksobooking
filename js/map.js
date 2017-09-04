'use strict';
(function () {

  function init() {
    window.data.getRentAds.forEach(window.pin.getCreatePin);
  }

  function openDialog(pinData) {
    window.util.getDialog.style.display = 'block';
    window.card.getCreateDialog(pinData);
  }

  init();

  window.map = {
    getOpenDialog: openDialog
  };
})();
