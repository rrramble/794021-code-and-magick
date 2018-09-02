'use strict';

function renderStatistics (ctx, names, times) {
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

  var PILE_WIDTH = 40;
  var PILE_INNER_SPACE = 50;
  var PILE_MAX_HEIGHT = 150;
  var PILE_LEFT_MARGIN = 10;

  var TEXT_SIZE = 16;
  var TEXT_FONT = HEADER_SIZE + 'px "PT Mono"';
  var TEXT_COLOR = 'black';

  var HEADERS = ['Ура вы победили!', 'Список результатов:'];
  var HEADER_SIZE = 16;
  var HEADER_FONT =  HEADER_SIZE + 'px "PT Mono"';
  var HEADER_COLOR = 'black';

  var CURRENT_PLAYER_COLOR_STYLE = 'rgba(255, 0, 0, 1)';
  var CURRENT_PLAYER_NAME = 'Вы';


  /*
   * Main code
   */

  drawCloud(SHADOW);
  drawCloud(AREA);

  var headersArea = areaWithoutMargins(AREA, 20, 0, 0, 10);
  drawHeaders(headersArea);

  var statisticsArea = areaWithoutMargins(AREA, 30, 0, 0, PILE_LEFT_MARGIN);
  drawStatistics(statisticsArea, names, times);


  /*
   * Sub-functions
   */

  function drawCloud (area) {
    drawRectangle(area);
  };

  function drawRectangle (rect) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  };

  function drawStatistics (area, names, times) {
    var maxTime = maxInArray(times);
    for (var i = 0; i < names.length; i++) {
      var winnerName = names[i];
      var winnerTime = times[i];

      var colorStyle = chooseBarColor(winnerName);
      drawWinner(area, i, winnerName, winnerTime, maxTime, colorStyle);
    }
  };

  function drawHeaders (area) {
    var x = area.x;
    for (var i = 0; i < HEADERS.length; i++) {
      var y = area.y + i * HEADER_SIZE;
      var text = HEADERS[i];
      drawText(text, x, y, HEADER_COLOR, HEADER_FONT);
    }
  };

  function drawWinner (boundaries, index, textBelow, score, maxScore, colorStyle) {
    var scoreBarArea = {
      width: PILE_WIDTH,
      height: calcBarHeight(score, maxScore, boundaries.height),
      x: boundaries.x + index * (PILE_WIDTH + PILE_INNER_SPACE),
      yBottom: boundaries.y + boundaries.height - 2 * TEXT_SIZE,
      color: colorStyle
    };
    scoreBarArea.y = scoreBarArea.yBottom - scoreBarArea.height,

    drawRectangle(scoreBarArea);

    var xBelow = scoreBarArea.x;
    var yBelow = scoreBarArea.y + scoreBarArea.height + TEXT_SIZE;
    drawText(textBelow, xBelow, yBelow, TEXT_COLOR, TEXT_FONT);

    var xScore = scoreBarArea.x;
    var yScore = scoreBarArea.y - TEXT_SIZE;
    drawNumber(score, xScore, yScore);
  };

  function chooseBarColor (name) {
      if (name === CURRENT_PLAYER_NAME) {
        return CURRENT_PLAYER_COLOR_STYLE;
      } else {
        return randomColorStyle();
      }
  };

  function drawText (text, x, y, colorStyle, fontStyle) {
    ctx.fillStyle = colorStyle;
    ctx.font = fontStyle;
    ctx.fillText(text, x, y);
  };

  function drawNumber (number, x, y) {
    var text = Math.round(number).toString();
    drawText(text, x, y, TEXT_COLOR, TEXT_SIZE);
  };

  function areaWithoutMargins (area, top, right, bottom, left) {
    var newArea = Object.assign({}, area);
    newArea.x = area.x + left;
    newArea.y = area.y + top;
    newArea.width = area.width - right - left;
    newArea.height = area.height - top - bottom;
    return newArea;
  };

  function calcBarHeight (score, maxScore, areaHeight) {
    if (maxScore === 0) return 0;

    var result = (areaHeight - 5 * TEXT_SIZE) / maxScore * score;
    return Math.floor(result);
  };

  function maxInArray (arr) {
    return Math.max.apply(null, arr);
  };

  function randomColorStyle () {
    var red = '0';
    var green = '0';
    var blue = '255';
    var alpha = randomInRangeFractional(0.3, 1).toFixed(2);
    var colorStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
    return colorStyle;
  };

  function randomInRangeFractional (from, to) {
    return Math.random() * (to - from) + from;
  };
};
