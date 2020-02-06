'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var setupPlayer = document.querySelector('.setup-player');

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var getRandomElement = function (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getRandomHslColor = function (min, max, lightness) {
    min = Math.abs(parseInt(min, 10));
    max = Math.abs(parseInt(max, 10));
    lightness = Math.abs(parseInt(lightness, 10));

    var randomSaturate = Math.floor(min + Math.random() * (max - min + 1));
    return 'hsl(240, ' + randomSaturate + '%, ' + lightness + '%)';
  };

  var equateLengthArrays = function (arr1, arr2) {
    if (arr1.length === arr2.length) {
      return;
    }

    if (arr1.length > arr2.length) {
      arr1.length = arr2.length;
    } else {
      arr2.length = arr1.length;
    }
  };

  var colorizeElement = function (colors, element, areaStyle) {
    var color = getRandomElement(colors);
    element.style[areaStyle] = color;

    return color;
  };

  var setInputValue = function (value, inputName) {
    var input = setupPlayer.querySelector('input[name=' + inputName + ']');
    input.setAttribute('value', value);
  };

  window.util = {
    getRandomElement: getRandomElement,
    getMaxElement: getMaxElement,
    getRandomHslColor: getRandomHslColor,
    equateLengthArrays: equateLengthArrays,
    colorizeElement: colorizeElement,
    setInputValue: setInputValue,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };

})();
