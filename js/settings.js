'use strict';

(function () {
  var PERSONAGE_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var PERSONAGE_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBOLL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SUCCESS_MESSAGE = 'Данные успешно отправлены';

  var setupPlayer = document.querySelector('.setup');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var personageEyes = setupPlayer.querySelector('.wizard-eyes');
  var personageCoat = setupPlayer.querySelector('.wizard-coat');

  var settingsForm = setupPlayer.querySelector('.setup-wizard-form');
  var submitButton = settingsForm.querySelector('.setup-submit');
  var setupFooter = setupPlayer.querySelector('.setup-footer');
  var statusSubmitTemplate = document.querySelector('#status-submit-template').content.querySelector('.status-submit');

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

  var renderSubmitMessage = function (messageClass, messageText, hiddenSecond) {
    var statusSubmitElement = statusSubmitTemplate.cloneNode(true);
    var statusSubmitText = statusSubmitElement.querySelector('.status-text');

    statusSubmitElement.classList.add(messageClass);
    submitButton.disabled = true;
    statusSubmitText.innerText = messageText;
    setupFooter.appendChild(statusSubmitElement);

    setTimeout(function () {
      submitButton.disabled = false;
      statusSubmitElement.remove();
    }, hiddenSecond);
  };

  var onSuccess = function () {
    renderSubmitMessage('success', SUCCESS_MESSAGE, 2000);

    setTimeout(function () {
      setupPlayer.classList.add('hidden');
    }, 2000);
  };

  var onError = function (error) {
    renderSubmitMessage('error', error, 3000);
  };

  settingsForm.addEventListener('submit', function (evt) {
    var formData = new FormData(settingsForm);
    window.backend.save(formData, onSuccess, onError);
    evt.preventDefault();
  });

})();
