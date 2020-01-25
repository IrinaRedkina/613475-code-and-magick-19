'use strict';

var PERSONAGE_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PERSONAGE_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var PERSONAGE_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var PERSONAGE_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarPersonageTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var generatePersonages = function (names, surnames, coatColors, eyesColors, quantity) {
  var personages = [];

  for (var i = 0; i < quantity; i++) {
    var personage = {};

    personage.name = names[getRandomIndex(names)] + ' ' + surnames[getRandomIndex(surnames)];
    personage.coatColor = coatColors[getRandomIndex(coatColors)];
    personage.eyesColor = eyesColors[getRandomIndex(eyesColors)];

    personages.push(personage);
  }

  return personages;
};

var renderPersonageElement = function (personage) {
  var personageElement = similarPersonageTemplate.cloneNode(true);

  personageElement.querySelector('.setup-similar-label').textContent = personage.name;
  personageElement.querySelector('.wizard-coat').style.fill = personage.coatColor;
  personageElement.querySelector('.wizard-eyes').style.fill = personage.eyesColor;

  return personageElement;
};

/*
 * Отображение персонажей
 * @param {array} personages, массив с персонажами
 * @param {string} selector, css селектор элемента, в который добавляем персонажей
 */
var renderPersonages = function (personages, selector) {
  var fragment = document.createDocumentFragment();
  var element = document.querySelector(selector);

  for (var i = 0; i < personages.length; i++) {
    fragment.appendChild(renderPersonageElement(personages[i]));
  }

  element.appendChild(fragment);

  if (element.closest('.hidden') !== null) {
    element.closest('.hidden').classList.remove('hidden');
  }
};

var personages = generatePersonages(PERSONAGE_NAMES, PERSONAGE_SURNAMES, PERSONAGE_COAT_COLORS, PERSONAGE_EYES_COLORS, 4);
renderPersonages(personages, '.setup-similar-list');
