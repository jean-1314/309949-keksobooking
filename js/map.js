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

  (function () {
    var pinMain = document.querySelector('.pin__main');
    var map = window.pin.pinMap;

    pinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        var addressInput = document.getElementById('address');
        upEvt.preventDefault();
        addressInput.value = 'x: ' + upEvt.clientX + ', y: ' + upEvt.clientY;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      var drag = function (dragEvt) {

        dragEvt.preventDefault();
        if (dragEvt.clientX <= window.util.pinRange[0]) {
          document.removeEventListener('drag', drag);
          dragEvt.clientX = window.util.pinRange[0];
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('dragover', drag);
    });

    map.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });
  })();

  window.map = {
    getOpenDialog: openDialog
  };
})();
