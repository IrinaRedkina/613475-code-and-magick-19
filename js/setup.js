'use strict';

var PERSONAGE_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var PERSONAGE_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var PERSONAGE_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var PERSONAGE_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIERBOLL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var PERSONAGES_QUANTITY = 4;

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = setup.querySelector('input[name=username]');
var setupForm = setup.querySelector('.setup-wizard-form');
var fierboll = setup.querySelector('.setup-fireball-wrap');
var personageEyes = setup.querySelector('.wizard-eyes');
var personageCoat = setup.querySelector('.wizard-coat');

var similarPersonageTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var generatePersonage = function (names, surnames, coatColors, eyesColors) {
  var element = {};

  element.name = getRandomElement(names) + ' ' + getRandomElement(surnames);
  element.coatColor = getRandomElement(coatColors);
  element.eyesColor = getRandomElement(eyesColors);

  return element;
};

var generatePersonages = function (quantity) {
  var personages = [];

  for (var i = 0; i < quantity; i++) {
    var personage = generatePersonage(PERSONAGE_NAMES, PERSONAGE_SURNAMES, PERSONAGE_COAT_COLORS, PERSONAGE_EYES_COLORS);
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

var personages = generatePersonages(PERSONAGES_QUANTITY);
renderPersonages(personages, '.setup-similar-list');


/*
 * События
 */

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});


/*
 * Настройки персонажа
 */

var setInputValue = function (color, inputName) {
  var input = setupForm.querySelector('input[name=' + inputName + ']');
  input.setAttribute('value', color);
};

var onFierbollClick = function () {
  var fierbollColor = getRandomElement(FIERBOLL_COLORS);
  setInputValue(fierbollColor, 'fireball-color');
  fierboll.style.backgroundColor = fierbollColor;
};

var onPersonageEyesClick = function () {
  var eyesColor = getRandomElement(PERSONAGE_EYES_COLORS);
  setInputValue(eyesColor, 'eyes-color');
  personageEyes.style.fill = eyesColor;
};

var onPersonageCoatClick = function () {
  var coatColor = getRandomElement(PERSONAGE_COAT_COLORS);
  setInputValue(coatColor, 'coat-color');
  personageCoat.style.fill = coatColor;
};

fierboll.addEventListener('click', onFierbollClick);
personageEyes.addEventListener('click', onPersonageEyesClick);
personageCoat.addEventListener('click', onPersonageCoatClick);
