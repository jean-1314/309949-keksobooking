'use strict';

function createDialog(data) {
  var template = document.getElementById('lodge-template').cloneNode(true);

  template.content.querySelector('.lodge__title').textContent = data.offer.title;
  template.content.querySelector('.lodge__address').textContent = data.offer.address;
  template.content.querySelector('.lodge__price').innerHTML = data.offer.price + ' &#x20bd;/ночь';

  switch (data.offer.type) {
    case 'flat': template.content.querySelector('.lodge__type').textContent = 'Квартира';
      break;

    case 'house': template.content.querySelector('.lodge__type').textContent = 'Дом';
      break;

    case 'bungalo': template.content.querySelector('.lodge__type').textContent = 'Бунгало';
      break;

    default: template.content.querySelector('.lodge__type').textContent = 'Неопознанный тип жилья';
      break;
  }

  template.content.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  template.content.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout + '';

  var lodgeFeatures = template.content.querySelector('.lodge__features');
  for (var i = 0; i < data.offer.features.length; i++) {
    lodgeFeatures.innerHTML += '<span class="feature__image feature__image--' + data.offer.features[i] + '"></span>';
  }

  template.content.querySelector('.lodge__description').textContent = data.offer.description;

  dialog.querySelector('.dialog__title img').src = data.author.avatar;

  dialog.replaceChild(template.content, dialog.children[1]);
}
