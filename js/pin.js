'use strict';
(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var filtersGroup = tokyoFilters.feature;
  var filters = {
    housingType: tokyoFilters.querySelector('#housing_type'),
    housingPrice: tokyoFilters.querySelector('#housing_price'),
    housingRoomNumber: tokyoFilters.querySelector('#housing_room-number'),
    housingGuestsNumber: tokyoFilters.querySelector('#housing_guests-number')
  };

  var housingFeatures = tokyoFilters.querySelector('#housing_features');

  function typeHandler(offersList, pinsList) {
    if (['flat', 'house', 'bungalo'].includes(filters.housingType.value)) {
      offersList.forEach(function (item, i) {
        if (item.offer.type !== filters.housingType.value) {
          pinsList[i].style.display = 'none';
        }
      });
    }
  }

  function priceHandler(offersList, pinsList) {
    switch (filters.housingPrice.value) {
      case 'low':
        offersList.forEach(function (item, i) {
          if (item.offer.price >= 10000) {
            pinsList[i].style.display = 'none';
          }
        });
        break;
      case 'middle':
        offersList.forEach(function (item, i) {
          if (item.offer.price < 10000 || item.offer.price > 50000) {
            pinsList[i].style.display = 'none';
          }
        });
        break;
      case 'high':
        offersList.forEach(function (item, i) {
          if (item.offer.price <= 50000) {
            pinsList[i].style.display = 'none';
          }
        });
        break;
    }
  }

  function roomNumberHandler(offersList, pinsList) {
    switch (filters.housingRoomNumber.value) {
      case '1':
      case '2':
      case '3':
        offersList.forEach(function (item, i) {
          if (item.offer.rooms !== +filters.housingRoomNumber.value) {
            pinsList[i].style.display = 'none';
          }
        });
        break;
    }
  }

  function guestsNumberHandler(offersList, pinsList) {
    switch (filters.housingGuestsNumber.value) {
      case '1':
      case '2':
        offersList.forEach(function (item, i) {
          if (item.offer.guests !== +filters.housingGuestsNumber.value) {
            pinsList[i].style.display = 'none';
          }
        });
        break;
    }
  }

  function featuresHandler(offersList, pinsList) {
    var featuresFilters = [];
    filtersGroup.forEach(function (item) {
      if (item.checked) {
        featuresFilters.push(item.value);
      }
    });
    offersList.forEach(function (item, i) {
      featuresFilters.forEach(function (filter) {
        if (item.offer.features.indexOf(filter) === -1) {
          pinsList[i].style.display = 'none';
        }
      });
    });
  }

  function setFilters() {
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
        filters[key].addEventListener('change', function () {
          window.util.debounce(filterPins.bind(null, window.map.getDataCached(), window.map.getPinsCached()));
        });
      }
    }
    housingFeatures.addEventListener('click', function (evt) {
      if (evt.target.parentNode.classList.contains('feature') && !evt.target.classList.contains('feature__image')) {
        window.util.debounce(filterPins.bind(null, window.map.getDataCached(), window.map.getPinsCached()));
      }
    });
  }

  function createPin(data) {
    var pin = document.createElement('div');

    pin.className = 'pin';
    pin.style = 'left:' + data.location.x + 'px; top: ' + data.location.y + 'px';
    pin.innerHTML = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
    window.util.getDialog.querySelector('.dialog__title').firstChild.setAttribute('src', data.author.avatar);

    pinMap.appendChild(pin);
    window.showcard.addPinHandlers(pin, data);

    return pin;
  }

  function filterPins(pinsDataList, pinsList) {
    for (var i = 1; i < pinsList.length; i++) {
      pinsList[i].style.display = 'block';
      if (pinsList[i].classList.contains('pin--active')) {
        pinsList[i].classList.remove('pin--active');
      }
    }

    typeHandler(pinsDataList, pinsList);
    priceHandler(pinsDataList, pinsList);
    roomNumberHandler(pinsDataList, pinsList);
    guestsNumberHandler(pinsDataList, pinsList);
    featuresHandler(pinsDataList, pinsList);
  }


  window.pin = {
    filterPins: filterPins,
    getCreatePin: createPin,
    pinMap: pinMap,
    setFilters: setFilters
  };
})();
