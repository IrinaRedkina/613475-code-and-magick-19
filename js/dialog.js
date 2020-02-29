'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('input[name=username]');
  var dialogDragger = setup.querySelector('.upload');
  var avatarInput = setup.querySelector('input[name=avatar]');

  var Coords = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var onDialogDraggerMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = new Coords(evt.clientX, evt.clientY);
    var isDragged = false;

    var onDocumentMousemove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = new Coords(moveEvt.clientX, moveEvt.clientY);
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onDocumentMouseup = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDocumentMousemove);
      document.removeEventListener('mouseup', onDocumentMouseup);

      if (isDragged) {
        var onDialogDraggerClick = function (clickEvt) {
          clickEvt.preventDefault();
          dialogDragger.removeEventListener('click', onDialogDraggerClick);
        };

        dialogDragger.addEventListener('click', onDialogDraggerClick);
      }
    };

    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  };

  var onDialogKeydown = function (evt) {
    window.util.isEscEvent(evt, closeDialog);
  };

  var openDialog = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onDialogKeydown);
    dialogDragger.addEventListener('mousedown', onDialogDraggerMousedown);
    avatarInput.addEventListener('change', window.settings.onAvatarChange);
  };

  var closeDialog = function () {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    document.removeEventListener('keydown', onDialogKeydown);
    dialogDragger.removeEventListener('mousedown', onDialogDraggerMousedown);
    avatarInput.removeEventListener('change', window.settings.onAvatarChange);
  };

  userNameInput.addEventListener('keydown', function () {
    document.removeEventListener('keydown', onDialogKeydown);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onDialogKeydown);
  });

  setupOpen.addEventListener('click', function () {
    openDialog();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openDialog);
  });

  setupClose.addEventListener('click', function () {
    closeDialog();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeDialog);
  });

})();
