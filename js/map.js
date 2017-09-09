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
    var pinMainWidth = pinMain.offsetWidth;
    var pinMainHeight = pinMain.offsetHeight;

    var pinPoint = {
      x: Math.round(pinMainWidth / 2),
      y: pinMainHeight
    };

    var map = document.querySelector('.tokyo');
    var mapX = map.offsetLeft;

    pinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var pinMainRect = pinMain.getBoundingClientRect();

        var pinPointLocation = {
          x: Math.round(pinMainRect.left) - mapX + pinPoint.x,
          y: pinMainRect.top + pinPoint.y
        };

        var addressInput = document.getElementById('address');
        addressInput.value = 'x: ' + pinPointLocation.x + ', y: ' + pinPointLocation.y;
        var pinRange = window.util.pinRange;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

        if (pinPointLocation.x < pinRange[0]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.left = pinRange[0] - pinPoint.x + 'px';
        } else if (pinPointLocation.x > pinRange[1]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.left = pinRange[1] - pinPoint.x + 'px';
        } else if (pinPointLocation.y < pinRange[2]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.top = pinRange[2] - pinPoint.y + 'px';
        } else if (pinPointLocation.y > pinRange[3]) {
          document.removeEventListener('mousemove', onMouseMove);
          pinMain.style.top = pinRange[3] - pinPoint.y + 'px';
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
