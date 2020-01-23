'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var FONT_GAP = 15;
var FONT_STYLE = '16px PT MONO';
var FONT_BASELINE = 'baseline';
var PLAYER_NAME_Y = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP;

/*
 * отрисовка окна и тени
*/
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/*
 * отрисовка бара
*/
var renderBar = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

/*
 * отрисовка текста
*/
var renderText = function (ctx, text, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

/*
 * поиск максимального значения в массиве
*/
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/*
* получение случайного цвета в hsl
* min, max - минимальное и максимальное значения насыщенности
* lightness - яркость
*/
var getRandomColor = function (min, max, lightness) {
  min = Math.abs(parseInt(min, 10));
  max = Math.abs(parseInt(max, 10));
  lightness = Math.abs(parseInt(lightness, 10));

  var randomSaturate = Math.floor(min + Math.random() * (max - min + 1));
  return 'hsl(240, ' + randomSaturate + '%, ' + lightness + '%)';
};

/*
 * Приведение 2-х массивов к одной длине
*/
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

/*
 * рендер окна со статистикой
*/
window.renderStatistics = function (ctx, players, times) {

  equateLengthArrays(players, times);

  // максимальное время
  var maxTime = Math.round(getMaxElement(times));

  // координаты 1-й колонки по X
  var columnX = CLOUD_X + BAR_GAP;

  // окно с тенью
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // стили для текста
  ctx.font = FONT_STYLE;
  ctx.textBaseline = FONT_BASELINE;

  // надпись о победе
  renderText(ctx, 'Ура вы победили!', '#000', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3);
  renderText(ctx, 'Список результатов:', '#000', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3 + FONT_GAP);

  for (var i = 0; i < players.length; i++) {

    // высота бара
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;

    // координаты бара по Y
    var barY = PLAYER_NAME_Y - barHeight - FONT_GAP - GAP;

    // координаты времени по Y
    var timeY = barY - GAP;

    // случайный цвет
    var color = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor(10, 100, 50);

    // отрисовка имени, бара и времени
    renderBar(ctx, columnX, barY, color, BAR_WIDTH, barHeight);
    renderText(ctx, Math.round(times[i]), color, columnX, timeY);
    renderText(ctx, players[i], color, columnX, PLAYER_NAME_Y);

    // координаты для следующей колонки по X
    columnX += BAR_WIDTH + BAR_GAP;
  }

};
