'use strict';
(function () {

  function openDialog(pinData) {
    window.util.getDialog.style.display = 'block';
    window.card.getCreateDialog(pinData);
  }

  window.map = {
    getopenDialog: openDialog()
  };
})();
