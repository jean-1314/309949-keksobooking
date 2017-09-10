'use strict';
(function () {

  var addressInput = document.getElementById('address');
  var MAIN_PIN_RANGE = [0, 1200, 170, 660];

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
    var pinMainWidth = pinMain.offsetWidth;
    var pinMainHeight = pinMain.offsetHeight;

    var pinPoint = {
      x: Math.round(pinMainWidth / 2),
      y: pinMainHeight
    };

    pinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var pinPointLocation = {
          x: Math.round(pinMain.offsetLeft) + pinPoint.x,
          y: pinMain.offsetTop + pinPoint.y
        };

        var newLocation = {
          x: pinPointLocation.x + (moveEvt.pageX - startCoords.x),
          y: pinPointLocation.y + (moveEvt.pageY - startCoords.y)
        };

        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        if (newLocation.x < MAIN_PIN_RANGE[0]) {
          document.removeEventListener('mousemove', onMouseMove);
          newLocation.x = MAIN_PIN_RANGE[0];
        } else if (newLocation.x > MAIN_PIN_RANGE[1]) {
          document.removeEventListener('mousemove', onMouseMove);
          newLocation.x = MAIN_PIN_RANGE[1];
        }

        if (newLocation.y < MAIN_PIN_RANGE[2]) {
          document.removeEventListener('mousemove', onMouseMove);
          newLocation.y = MAIN_PIN_RANGE[2];
        } else if (newLocation.y > MAIN_PIN_RANGE[3]) {
          document.removeEventListener('mousemove', onMouseMove);
          newLocation.y = MAIN_PIN_RANGE[3];
        }

        addressInput.value = 'x: ' + newLocation.x + ', y: ' + newLocation.y;
        pinMain.style.top = newLocation.y - pinPoint.y + 'px';
        pinMain.style.left = newLocation.x - pinPoint.x + 'px';
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
