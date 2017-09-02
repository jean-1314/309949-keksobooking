'use strict';
(function () {

  function createDialog(data) {
    var template = document.getElementById('lodge-template').cloneNode(true);

    template.content.querySelector('.lodge__title').textContent = data.offer.title;
    template.content.querySelector('.lodge__address').textContent = data.offer.address;
    template.content.querySelector('.lodge__price').innerHTML = data.offer.price + ' &#x20bd;/ночь';
    template.content.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
    template.content.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout + '';

    var lodgeFeatures = template.content.querySelector('.lodge__features');
    for (var i = 0; i < data.offer.features.length; i++) {
      lodgeFeatures.innerHTML += '<span class="feature__image feature__image--' + data.offer.features[i] + '"></span>';
    }

    template.content.querySelector('.lodge__description').textContent = data.offer.description;

    window.data.getDialog.querySelector('.dialog__title img').src = data.author.avatar;

    window.data.getDialog.replaceChild(template.content, window.data.getDialog.children[1]);
  }

  window.card = {
    getCreateDialog: createDialog()
  };
})();
