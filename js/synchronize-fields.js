'use strict';

window.synchronizeFields = (function () {

  return function (firstInput, secondInput, firstInputValues, secondInputValues, syncValues) {
    firstInput.addEventListener('change', function () {
      var secondInputValue = secondInputValues[firstInputValues.indexOf(firstInput.value)];
      syncValues(secondInput, secondInputValue);
    });
  };

})();
