'use strict';
(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');

  function createPin(data) {

    var fragment = document.createDocumentFragment();
    var pin = document.createElement('div');

    pin.className = 'pin';
    pin.style = 'left:' + data.location.x + 'px; top: ' + data.location.y + 'px';
    pin.innerHTML = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
    window.util.getDialog.querySelector('.dialog__title').firstChild.setAttribute('src', data.author.avatar);
    fragment.appendChild(pin);

    pinMap.appendChild(fragment);
    addPinHandlers(pin, data);
  }

  function addPinHandlers(pin, data) {
    pin.addEventListener('click', function (relatedPinData) {
      if (this.classList.contains('pin--active')) {
        deactivatePin(this);
        window.data.getCloseDialog();
      } else {
        activatePin(this);
        window.map.getOpenDialog(relatedPinData);
      }
    }.bind(pin, data));

    pin.addEventListener('keydown', function (relatedPinData, evt) {
      if (evt.keyCode === window.util.enter) {
        activatePin(this);
        window.map.getOpenDialog(relatedPinData);
      }
    }.bind(pin, data));

    window.util.getDialogOff.addEventListener('click', function () {
      window.data.getCloseDialog();
      deactivatePin(this);
    }.bind(pin));

    window.util.getDialogOff.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.enter) {
        window.data.getCloseDialog();
        deactivatePin(this);
      }
    }.bind(pin));
  }

  function activatePin(pin) {
    Array.prototype.forEach.call(document.querySelectorAll('.pin'), function (item) {
      if (item.classList.contains('pin--active')) {
        item.classList.remove('pin--active');
      }
    });
    pin.classList.add('pin--active');
  }

  function deactivatePin(pin) {
    pin.classList.remove('pin--active');
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.esc) {
      window.data.getCloseDialog();
      deactivatePin(evt.target);
    }
  });

  window.pin = {
    getCreatePin: createPin,
    pinMap: pinMap
  };
})();
