'use strict';

function createPin(data) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var pin = document.createElement('div');

  pin.className = 'pin';
  pin.style = 'left:' + data.location.x + 'px; top: ' + data.location.y + 'px';
  pin.innerHTML = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
  dialog.querySelector('.dialog__title').firstChild.setAttribute('src', data.author.avatar);
  fragment.appendChild(pin);

  pinMap.appendChild(fragment);
  addPinHandlers(pin, data);
}

function addPinHandlers(pin, data) {
  pin.addEventListener('click', function (relatedPinData) {
    if (this.classList.contains('pin--active')) {
      deactivatePin(this);
      closeDialog();
    } else {
      activatePin(this);
      openDialog(relatedPinData);
    }
  }.bind(pin, data));

  pin.addEventListener('keydown', function (relatedPinData, evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePin(this);
      openDialog(relatedPinData);
    }
  }.bind(pin, data));

  dialogOff.addEventListener('click', function () {
    closeDialog();
    deactivatePin(this);
  }.bind(pin));

  dialogOff.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeDialog();
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
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
    deactivatePin(evt.target);
  }
});
