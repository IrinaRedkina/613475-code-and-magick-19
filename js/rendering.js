'use strict';

(function () {
  var PERSONAGES_QUANTITY = 4;

  var similarPersonageMessageError = 'Не удалось загрузить похожих персонажей.';
  var similarPersonageTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElementSelector = '.setup-similar-list';
  var setupFooter = document.querySelector('.setup-footer');

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
  var renderPersonages = function (personages, selector) {
    var fragment = document.createDocumentFragment();
    var element = document.querySelector(selector);

    for (var i = 0; i < PERSONAGES_QUANTITY; i++) {
      fragment.appendChild(createPersonageElement(personages[i]));
    }

    element.appendChild(fragment);

    if (element.closest('.hidden') !== null) {
      element.closest('.hidden').classList.remove('hidden');
    }
  };

  var onSuccess = function (personages) {
    renderPersonages(personages, similarListElementSelector);
  };

  var onError = function (error) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'margin: 15px 0; font-size: 12px; color: rgba(255,255,255,.8); padding-left: 20px;';
    errorMessage.innerText = similarPersonageMessageError + ' ' + error;
    setupFooter.insertBefore(errorMessage, setupFooter.firstChild);
  };

  window.backend.load(onSuccess, onError);

})();
