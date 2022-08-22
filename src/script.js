function drawLine(from, to) {
  const horizontalDistance = Math.max(from.offsetLeft + from.offsetWidth, to.offsetLeft) - Math.min(from.offsetLeft + from.offsetWidth, to.offsetLeft);
  const verticalDistance = Math.max(from.offsetTop, to.offsetTop) - Math.min(from.offsetTop, to.offsetTop);

  const startPointTopOffset = from.offsetTop + from.offsetHeight / 2;
  const startPointLeftOffset = from.offsetLeft + from.offsetWidth;

  const endPointTopOffset = to.offsetTop + to.offsetHeight / 2;
  const endPointLeftOffset = to.offsetLeft + to.offsetWidth;

  const scale = window.devicePixelRatio;
  const lineWidth = 2;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.style.position = 'absolute';
  canvas.style.top = `${Math.min(startPointTopOffset, endPointTopOffset)}px`;
  canvas.style.left = `${Math.min(startPointLeftOffset, endPointLeftOffset)}px`;
  canvas.style.width = `${horizontalDistance}px`;
  canvas.style.height = `${verticalDistance || 4}px`;
  canvas.width = Math.floor(horizontalDistance * scale);
  canvas.height = Math.floor((verticalDistance ? verticalDistance + lineWidth + 1 : lineWidth * 2) * scale);

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#ff5722';
  ctx.scale(scale, scale);

  if (!verticalDistance) {
    ctx.moveTo(0, lineWidth);
    ctx.lineTo(horizontalDistance, lineWidth);
  } else {
    const direction = from.offsetTop < to.offsetTop ? 'down' : 'up';

    if (direction === 'down') {
      ctx.bezierCurveTo(0, lineWidth, horizontalDistance / 2, lineWidth, horizontalDistance / 2, horizontalDistance /2);
      ctx.lineTo(horizontalDistance / 2, verticalDistance - horizontalDistance / 2);
      ctx.bezierCurveTo(horizontalDistance / 2, verticalDistance - horizontalDistance / 2, horizontalDistance / 2, verticalDistance, horizontalDistance, verticalDistance + lineWidth);
    } else {
      ctx.bezierCurveTo(0, verticalDistance + lineWidth, horizontalDistance / 2, verticalDistance + lineWidth, horizontalDistance / 2, verticalDistance - horizontalDistance / 2);
      ctx.lineTo(horizontalDistance / 2, horizontalDistance / 2);
      ctx.bezierCurveTo(horizontalDistance / 2, horizontalDistance / 2, horizontalDistance / 2, lineWidth, horizontalDistance, lineWidth);
    }
  }

  ctx.stroke();

  document.body.appendChild(canvas);

  console.log('from', from);
  console.log('to', to);

  console.log('start point top offset', startPointTopOffset);
  console.log('start point left offset', startPointLeftOffset);
  console.log('end point top offset', endPointTopOffset);
  console.log('end point left offset', endPointLeftOffset);

  console.log('horizontal distance', horizontalDistance);
  console.log('vertical distance', verticalDistance);
}

const links = [
  { from: 'todo_1', to: 'inprogress_2' },
  { from: 'inprogress_3', to: 'done_1' },
  { from: 'todo_1', to: 'inprogress_4' },
  { from: 'todo_3', to: 'inprogress_4' },
  { from: 'inprogress_2', to: 'done_1' },
  { from: 'todo_5', to: 'inprogress_5' },
];

for (const link of links) {
  const fromElement = document.querySelector(`#${link.from}`);
  const toElement = document.querySelector(`#${link.to}`);

  drawLine(fromElement, toElement);
}
