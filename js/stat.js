'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

// отрисовка окна и тени
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// поиск максимального значения в массиве
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
  var randomSaturate = Math.floor(min + Math.random() * (max - min + 1));
  return 'hsl(240, ' + randomSaturate + '%, ' + lightness + '%)';
};

window.renderStatistics = function (ctx, players, times) {

  // окно с тенью
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // стили для текста
  ctx.font = '16px PT MONO';
  ctx.textBaseline = 'baseline';

  // надпись о победе
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3 + FONT_GAP);

  // максимальное время
  var maxTime = Math.round(getMaxElement(times));

  // координаты 1-й колонки по X
  var columnX = CLOUD_X + BAR_GAP;

  // координаты имени игрока по Y
  var nameY = CLOUD_Y + CLOUD_HEIGHT - GAP;

  for (var i = 0; i < players.length; i++) {

    // высота бара по Y
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;

    // координаты бара по Y
    var barY = nameY - barHeight - FONT_GAP - GAP;

    // координаты времени по Y
    var timeY = barY - GAP;

    // отрисовка бара
    var barBackground = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor(20, 100, 40);
    ctx.fillStyle = barBackground;
    ctx.fillRect(columnX, barY, BAR_WIDTH, barHeight);

    // отрисовка времени и имени игрока
    ctx.fillText(Math.round(times[i]), columnX, timeY);
    ctx.fillText(players[i], columnX, nameY);

    // координаты для следующей колонки по X
    columnX += BAR_WIDTH + BAR_GAP;
  }

};
