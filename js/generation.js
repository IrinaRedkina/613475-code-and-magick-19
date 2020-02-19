'use strict';

(function () {
  var PERSONAGES = {
    'NAMES': ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    'SURNAMES': ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    'COAT_COLORS': ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    'EYES_COLORS': ['black', 'red', 'blue', 'yellow', 'green']
  };

  var PERSONAGES_QUANTITY = 4;

  var Personage = function (personagesInfo) {
    this.name = window.util.getRandomElement(personagesInfo.NAMES) + ' ' + window.util.getRandomElement(personagesInfo.SURNAMES);
    this.colorCoat = window.util.getRandomElement(personagesInfo.COAT_COLORS);
    this.colorEyes = window.util.getRandomElement(personagesInfo.EYES_COLORS);
  };

  var generatePersonages = function (quantity, personagesInfo) {
    var personages = [];

    for (var i = 0; i < quantity; i++) {
      var personage = new Personage(personagesInfo);
      personages.push(personage);
    }

    return personages;
  };

  window.generation = {
    personages: generatePersonages(PERSONAGES_QUANTITY, PERSONAGES)
  };

})();
