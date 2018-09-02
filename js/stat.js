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

  drawCloud(SHADOW);
  drawCloud(AREA);

  function drawCloud (area) {
    drawRectangle(area);
  };

  function drawRectangle (rect) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  };
};
