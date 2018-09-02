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
  var TEXT_STYLE = 'black 16px "PT Mono" "PTMono" "PT_Mono"';
  var CURRENT_PLAYER_COLOR_STYLE = 'rgba(255, 0, 0, 1)';
  var CURRENT_PLAYER_NAME = 'Вы';

  drawCloud(SHADOW);
  drawCloud(AREA);
  drawStatistics(AREA, names, times);

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

  function drawWinner (boundaries, position, textBelow, score, maxScore, colorStyle) {
    var pileBar = {
      x: boundaries.x + position * (PILE_WIDTH + PILE_INNER_SPACE) + PILE_LEFT_MARGIN,
      y: boundaries.y + 3 * TEXT_SIZE,
      width: PILE_WIDTH,
      height: calcBarHeight(score, maxScore, boundaries.height),
      color: colorStyle
    };

    drawRectangle(pileBar);

    var xBelow = pileBar.x;
    var yBelow = pileBar.y + pileBar.height + TEXT_SIZE;
    drawText(textBelow, xBelow, yBelow);

    var xScore = pileBar.x;
    var yScore = pileBar.y - TEXT_SIZE;
    drawNumber(score, xScore, yScore);
  };

  function chooseBarColor (name) {
      if (name === CURRENT_PLAYER_NAME) {
        return CURRENT_PLAYER_COLOR_STYLE;
      } else {
        return randomColorStyle();
      }
  };

  function drawText (text, x, y) {
    ctx.fillStyle = TEXT_STYLE;
    ctx.fillText(text, x, y);
  };

  function drawNumber (number, x, y) {
    ctx.fillStyle = TEXT_STYLE;
    ctx.fillText(Math.round(number), x, y);
  };

  function calcBarHeight (score, maxScore, areaHeight) {
    if (maxScore === 0) return 0;

    var result = (areaHeight - 7 * TEXT_SIZE) / maxScore * score;
    return Math.floor(result);
  };

  function maxInArray (arr) {
    return Math.max.apply(null, arr);
  };

  function randomColorStyle () {
    var red = randomInRange(0, 24) * 10;
    var green = randomInRange(0, 24) * 10;
    var blue = randomInRange(0, 24) * 10;
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  };

  function randomInRange (from, to) {
    return Math.floor(Math.random() * to + from);
  };
};
