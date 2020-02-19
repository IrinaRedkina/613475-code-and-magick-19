'use strict';

(function () {
  var PERSONAGE_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var PERSONAGE_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBOLL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupFooter = document.querySelector('.setup-footer');
  var similarPersonageMessageError = 'Не удалось загрузить похожих персонажей.';
  var errorStyles = 'margin: 15px 0; font-size: 12px; color: rgba(255,255,255,.8); padding-left: 20px;';

  var setupPlayer = document.querySelector('.setup');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var personageEyes = setupPlayer.querySelector('.wizard-eyes');
  var personageCoat = setupPlayer.querySelector('.wizard-coat');

  var colorCoat;
  var colorEyes;
  var colorFireball;


  /*
   * Клики по фаерболу, мантии, глазам
   */
  var clicksPersonages = function (personages) {

    var onFireballClick = function () {
      colorFireball = window.util.colorizeElement(FIREBOLL_COLORS, fireball, 'backgroundColor');
      window.util.setInputValue(colorFireball, 'fireball-color');
    };

    var onPersonageEyesClick = window.debounce(function () {
      sortPersonages(personages);
    });

    var onPersonageCoatClick = window.debounce(function () {
      sortPersonages(personages);
    });

    fireball.addEventListener('click', onFireballClick);

    personageEyes.addEventListener('click', function () {
      colorEyes = window.util.colorizeElement(PERSONAGE_EYES_COLORS, personageEyes, 'fill');
      window.util.setInputValue(colorEyes, 'eyes-color');
      onPersonageEyesClick();
    });

    personageCoat.addEventListener('click', function () {
      colorCoat = window.util.colorizeElement(PERSONAGE_COAT_COLORS, personageCoat, 'fill');
      window.util.setInputValue(colorCoat, 'coat-color');
      onPersonageCoatClick();
    });
  };


  /*
   * Рейтинг и сортировка
   */
  var getRank = function (personage) {
    var rank = 0;

    if (personage.colorCoat === colorCoat) {
      rank += 2;
    }

    if (personage.colorEyes === colorEyes) {
      rank += 1;
    }

    return rank;
  };

  var sortPersonages = function (personages) {
    var similarPersonages = personages.slice();

    similarPersonages.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = similarPersonages.indexOf(right) - similarPersonages.indexOf(left);
      }

      return rankDiff;
    });

    window.rendering.personages(similarPersonages);
  };


  var onSuccess = function (data) {
    sortPersonages(data);
    clicksPersonages(data);
  };

  var onError = function (error) {
    var errorMessage = document.createElement('div');
    errorMessage.style = errorStyles;
    errorMessage.innerText = similarPersonageMessageError + ' ' + error;
    setupFooter.insertBefore(errorMessage, setupFooter.firstChild);
  };

  window.backend.load(onSuccess, onError);

})();
