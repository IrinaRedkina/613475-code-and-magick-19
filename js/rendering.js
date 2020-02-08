'use strict';

(function () {
  var similarPersonageTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElementSelector = '.setup-similar-list';

  var createPersonageElement = function (personage) {
    var element = similarPersonageTemplate.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = personage.name;
    element.querySelector('.wizard-coat').style.fill = personage.coatColor;
    element.querySelector('.wizard-eyes').style.fill = personage.eyesColor;

    return element;
  };

  /*
   * Рендер персонажей
   * @param {array} personages, массив с персонажами
   * @param {string} selector, css селектор элемента, в который добавляем персонажей
   */
  var renderPersonages = function (personages, selector) {
    var fragment = document.createDocumentFragment();
    var element = document.querySelector(selector);

    for (var i = 0; i < personages.length; i++) {
      fragment.appendChild(createPersonageElement(personages[i]));
    }

    element.appendChild(fragment);

    if (element.closest('.hidden') !== null) {
      element.closest('.hidden').classList.remove('hidden');
    }
  };

  renderPersonages(window.generation.personages, similarListElementSelector);

})();
