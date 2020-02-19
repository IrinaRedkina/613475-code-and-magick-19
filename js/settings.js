'use strict';

(function () {
  var SUCCESS_MESSAGE = 'Данные успешно отправлены';

  var setupPlayer = document.querySelector('.setup');
  var settingsForm = setupPlayer.querySelector('.setup-wizard-form');
  var submitButton = settingsForm.querySelector('.setup-submit');
  var setupFooter = setupPlayer.querySelector('.setup-footer');
  var statusSubmitTemplate = document.querySelector('#status-submit-template').content.querySelector('.status-submit');

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
