'use strict';
(function () {

  var template = document.getElementById('lodge-template');

  function createDialog(data) {
    var templateClone = template.cloneNode(true);
    var type = templateClone.content.querySelector('.lodge__type');
    switch (data.offer.type) {
      case 'bungalo':
        type.textContent = 'Лачуга';
        break;
      case 'flat':
        type.textContent = 'Квартира';
        break;
      case 'house':
        type.textContent = 'Дом';
        break;
      case 'palace':
        type.textContent = 'Дворец';
        break;
      default:
        type.textContent = 'Неопознанный тип жилья';
    }

    templateClone.content.querySelector('.lodge__title').textContent = data.offer.title;
    templateClone.content.querySelector('.lodge__address').textContent = data.offer.address;
    templateClone.content.querySelector('.lodge__price').textContent = data.offer.price + ' ₽/ночь';
    templateClone.content.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
    templateClone.content.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout + '';

    var lodgeFeatures = templateClone.content.querySelector('.lodge__features');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.offer.features.length; i++) {
      var span = document.createElement('span');
      span.classList.add('feature__image');
      span.classList.add('feature__image--' + data.offer.features[i] + '');
      fragment.appendChild(span);
    }
    lodgeFeatures.appendChild(fragment);

    templateClone.content.querySelector('.lodge__description').textContent = data.offer.description;

    window.util.getDialog.querySelector('.dialog__title img').src = data.author.avatar;

    window.util.getDialog.replaceChild(templateClone.content, window.util.getDialog.children[1]);
  }

  window.card = {
    getCreateDialog: createDialog
  };
})();
