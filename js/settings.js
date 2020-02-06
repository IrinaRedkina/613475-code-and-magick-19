'use strict';

(function () {
  var PERSONAGE_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var PERSONAGE_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBOLL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupPlayer = document.querySelector('.setup');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var personageEyes = setupPlayer.querySelector('.wizard-eyes');
  var personageCoat = setupPlayer.querySelector('.wizard-coat');

  var onFireballClick = function () {
    var fireballColor = window.util.colorizeElement(FIREBOLL_COLORS, fireball, 'backgroundColor');
    window.util.setInputValue(fireballColor, 'fireball-color');
  };

  var onPersonageEyesClick = function () {
    var eyesColor = window.util.colorizeElement(PERSONAGE_EYES_COLORS, personageEyes, 'fill');
    window.util.setInputValue(eyesColor, 'eyes-color');
  };

  var onPersonageCoatClick = function () {
    var coatColor = window.util.colorizeElement(PERSONAGE_COAT_COLORS, personageCoat, 'fill');
    window.util.setInputValue(coatColor, 'coat-color');
  };

  fireball.addEventListener('click', onFireballClick);
  personageEyes.addEventListener('click', onPersonageEyesClick);
  personageCoat.addEventListener('click', onPersonageCoatClick);

})();
