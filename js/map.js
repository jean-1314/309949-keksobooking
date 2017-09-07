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
    var map = document.querySelector('.tokyo__pin-map');

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

        var addressInput = document.getElementById('address');
        addressInput.value = 'x: ' + moveEvt.clientX + ', y: ' + moveEvt.clientY;

        var posX = moveEvt.pageX;
        var posY = moveEvt.pageY;
        var pinRange = window.util.pinRange;

        if (posX <= pinRange[0]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.left = pinRange[0] + 'px';
        } else if (posX >= pinRange[1]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.left = pinRange[1] + 'px';
        } else if (posY <= pinRange[2]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.top = pinRange[2] + 'px';
        } else if (posY >= pinRange[3]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.top = pinRange[3] + 'px';
        }
      };

      var onMouseUp = function (upEvt) {

        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  })();

  window.map = {
    getOpenDialog: openDialog
  };
})();
