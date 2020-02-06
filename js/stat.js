'use strict';

(function () {
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

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderBar = function (ctx, x, y, color, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, BAR_WIDTH, height);
  };

  var renderText = function (ctx, text, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  /*
   * рендер окна со статистикой
  */
  window.renderStatistics = function (ctx, players, times) {
    window.util.equateLengthArrays(players, times);

    var maxTime = Math.round(window.util.getMaxElement(times));
    var columnX = CLOUD_X + BAR_GAP;

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.font = FONT_STYLE;
    ctx.textBaseline = FONT_BASELINE;

    renderText(ctx, 'Ура вы победили!', '#000', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3);
    renderText(ctx, 'Список результатов:', '#000', CLOUD_X + GAP * 3, CLOUD_Y + GAP * 3 + FONT_GAP);

    for (var i = 0; i < players.length; i++) {
      var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
      var barY = PLAYER_NAME_Y - barHeight - FONT_GAP - GAP;
      var timeY = barY - GAP;
      var color = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : window.util.getRandomHslColor(10, 100, 50);

      renderBar(ctx, columnX, barY, color, BAR_WIDTH, barHeight);
      renderText(ctx, Math.round(times[i]), color, columnX, timeY);
      renderText(ctx, players[i], color, columnX, PLAYER_NAME_Y);

      columnX += BAR_WIDTH + BAR_GAP;
    }
  };

})();
