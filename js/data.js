'use strict';
(function () {

  function closeDialog() {
    window.util.getDialog.style.display = 'none';
  }

  closeDialog();
  window.data = {
    getCloseDialog: closeDialog
  };
})();
