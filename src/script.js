function drawLine(from, to) {
  const horizontalDistance = Math.max(from.offsetLeft + from.offsetWidth, to.offsetLeft) - Math.min(from.offsetLeft + from.offsetWidth, to.offsetLeft);
  const verticalDistance = Math.max(from.offsetTop, to.offsetTop) - Math.min(from.offsetTop, to.offsetTop);

  const startPointTop = from.offsetTop + from.offsetHeight / 2;
  const startPointLeft = from.offsetLeft + from.offsetWidth;

  const endPointTop = to.offsetTop + to.offsetHeight / 2;
  const endPointLeft = to.offsetLeft + to.offsetWidth;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.style.position = 'absolute';
  canvas.style.top = `${Math.min(startPointTop, endPointTop)}px`;
  canvas.style.left = `${Math.min(startPointLeft, endPointLeft)}px`;
  canvas.width = horizontalDistance;
  canvas.height = verticalDistance || 2;
  canvas.style.zIndex = '2122';

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, 0, horizontalDistance / 2, 0, horizontalDistance / 2, verticalDistance / 2);
  ctx.bezierCurveTo(horizontalDistance / 2, verticalDistance / 2, horizontalDistance / 2, verticalDistance, horizontalDistance, verticalDistance);
  ctx.strokeStyle = '#ff5722';
  ctx.stroke();

  document.body.appendChild(canvas);

  console.log('from', from);
  console.log('to', to);

  console.log('start point top', startPointTop);
  console.log('start point left', startPointLeft);
  console.log('end point top', endPointTop);
  console.log('end point left', endPointLeft);

  console.log('horizontal distance', horizontalDistance);
  console.log('vertical distance', verticalDistance);
}

const links = [
  { from: 'todo_1', to: 'inprogress_2' },
  { from: 'todo_3', to: 'inprogress_3' },
  // { from: 'inprogress_3', to: 'done_1' },
];

for (const link of links) {
  const fromElement = document.querySelector(`#${link.from}`);
  const toElement = document.querySelector(`#${link.to}`);

  drawLine(fromElement, toElement);
}
