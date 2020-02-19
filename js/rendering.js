'use strict';

(function () {
  var PERSONAGES_QUANTITY = 4;

  var similarPersonageTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createPersonageElement = function (personage) {
    var element = similarPersonageTemplate.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = personage.name;
    element.querySelector('.wizard-coat').style.fill = personage.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = personage.colorEyes;

    return element;
  };


  /*
   * Рендер персонажей
   * @param {array} personages, массив с персонажами
   * @param {string} selector, css селектор элемента, в который добавляем персонажей
   */
  var renderPersonages = function (personages) {
    var fragment = document.createDocumentFragment();
    var element = document.querySelector('.setup-similar-list');

    element.innerHTML = '';

    for (var i = 0; i < PERSONAGES_QUANTITY; i++) {
      fragment.appendChild(createPersonageElement(personages[i]));
    }

    element.appendChild(fragment);

    if (element.closest('.hidden') !== null) {
      element.closest('.hidden').classList.remove('hidden');
    }
  };

  window.rendering = {
    personages: renderPersonages
  };

})();
