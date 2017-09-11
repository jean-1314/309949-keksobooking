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
    window.showcard.addPinHandlers(pin, data);
  }

  window.pin = {
    getCreatePin: createPin,
    pinMap: pinMap,
  };
})();
