'use strict';

window.renderStatistics = exportedFunction;

function exportedFunction(ctx, names, times) {
  var AREA = {
    x: 100,
    y: 10,
    width: 420,
    height: 270,
    color: 'white'
  };

  var SHADOW = {
    x: AREA.x + 10,
    y: AREA.y + 10,
    width: AREA.width,
    height: AREA.height,
    color: 'rgba(0, 0, 0, 0.7)'
  };

  var BAR_WIDTH = 40;
  var BAR_INNER_SPACE = 50;
  var BAR_LEFT_MARGIN = 40;
  var BAR_TOP_MARGIN = 55;
  var BAR_BOTTOM_MARGIN = 10;
  var BAR_RED_CHANNEL = 0;
  var BAR_GREEN_CHANNEL = 0;
  var BAR_BLUE_CHANNEL = 255;
  var BAR_ALPHA_CHANNEL_MIN = 0.3;
  var BAR_ALPHA_CHANNEL_MAX = 1.0;

  var TEXT_SIZE = 16;
  var TEXT_FONT = TEXT_SIZE + 'px "PT Mono"';
  var TEXT_COLOR = 'black';

  var HEADERS = ['Ура вы победили!', 'Список результатов:'];
  var HEADER_SIZE = 16;
  var HEADER_FONT = HEADER_SIZE + 'px "PT Mono"';
  var HEADER_COLOR = 'black';
  var HEADER_TOP_MARGIN = 20;
  var HEADER_LEFT_MARGIN = 60;

  var CURRENT_PLAYER_COLOR_STYLE = 'rgba(255, 0, 0, 1)';
  var CURRENT_PLAYER_NAME = 'Вы';


  /*
   * Main code
   */

  drawCloud(SHADOW);
  drawCloud(AREA);

  var headersArea = areaWithoutMargins(AREA, HEADER_TOP_MARGIN, 0, 0, HEADER_LEFT_MARGIN);
  drawHeaders(headersArea);

  var statisticsArea = areaWithoutMargins(AREA, BAR_TOP_MARGIN, 0, BAR_BOTTOM_MARGIN, BAR_LEFT_MARGIN);
  drawStatistics(statisticsArea, names, times);


  /*
   * Sub-functions
   */

  function drawCloud(area) {
    drawRectangle(area);
  }

  function drawRectangle(rect) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  function drawStatistics(area, winners, scores) {
    var maxTime = maxInArray(scores);
    for (var i = 0; i < winners.length; i++) {
      var winnerName = winners[i];
      var winnerTime = scores[i];

      var colorStyle = chooseBarColor(winnerName);
      drawWinner(area, i, winnerName, winnerTime, maxTime, colorStyle);
    }
  }

  function drawHeaders(area) {
    var x = area.x;
    for (var i = 0; i < HEADERS.length; i++) {
      var y = area.y + i * HEADER_SIZE;
      var text = HEADERS[i];
      drawText(text, x, y, HEADER_COLOR, HEADER_FONT);
    }
  }

  function drawWinner(boundaries, index, textBelow, score, maxScore, colorStyle) {
    var scoreBarArea = {
      width: BAR_WIDTH,
      height: calcBarHeight(score, maxScore, boundaries.height),
      x: boundaries.x + index * (BAR_WIDTH + BAR_INNER_SPACE),
      yBottom: boundaries.y + boundaries.height - TEXT_SIZE,
      color: colorStyle
    };
    scoreBarArea.y = scoreBarArea.yBottom - scoreBarArea.height;

    drawRectangle(scoreBarArea);

    var xBelow = scoreBarArea.x;
    var yBelow = scoreBarArea.y + scoreBarArea.height + TEXT_SIZE;
    drawText(textBelow, xBelow, yBelow, TEXT_COLOR, TEXT_FONT);

    var xScore = scoreBarArea.x;
    var yScore = scoreBarArea.y - TEXT_SIZE;
    drawNumber(score, xScore, yScore);
  }

  function chooseBarColor(name) {
    if (name === CURRENT_PLAYER_NAME) {
      return CURRENT_PLAYER_COLOR_STYLE;
    } else {
      return randomColorStyle();
    }
  }

  function drawText(text, x, y, colorStyle, fontStyle) {
    ctx.fillStyle = colorStyle;
    ctx.font = fontStyle;
    ctx.fillText(text, x, y);
  }

  function drawNumber(number, x, y) {
    var text = Math.round(number).toString();
    drawText(text, x, y, TEXT_COLOR, TEXT_SIZE);
  }

  function areaWithoutMargins(area, top, right, bottom, left) {
    var newArea = Object.assign({}, area);
    newArea.x = area.x + left;
    newArea.y = area.y + top;
    newArea.width = area.width - right - left;
    newArea.height = area.height - top - bottom;
    return newArea;
  }

  function calcBarHeight(score, maxScore, areaHeight) {
    if (maxScore === 0) {
      return 0;
    }

    var result = (areaHeight - TEXT_SIZE - TEXT_SIZE) / maxScore * score;
    return Math.floor(result);
  }

  function maxInArray(arr) {
    return Math.max.apply(null, arr);
  }

  function randomColorStyle() {
    var alpha = randomInRangeFractional(BAR_ALPHA_CHANNEL_MIN, BAR_ALPHA_CHANNEL_MAX).toFixed(2);
    var colorStyle = 'rgba(' + BAR_RED_CHANNEL + ', ' + BAR_GREEN_CHANNEL + ', ' + BAR_BLUE_CHANNEL + ', ' + alpha + ')';
    return colorStyle;
  }

  function randomInRangeFractional(from, to) {
    return Math.random() * (to - from) + from;
  }
}
