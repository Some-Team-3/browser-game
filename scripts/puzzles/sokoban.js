export default function sokoban(field) {
  const levelData = [ // w - стена; b - ящик; p - место для ящика;  y - игрок
    '  wwwww ',
    'www   w ',
    'w b w ww',
    'w w  p w',
    'w    w w',
    'wwbwp  w',
    ' wy  www',
    ' wwwww  ',
  ];
  let level = [[], [], [], [], [], [], [], []];
  let x;
  let y;
  let cell;
  let forwardCell;
  let forward2cell;
  let div;

  const buildLevel = () => {
    levelData.forEach((row, n) => {
      row.split('').forEach((square, m) => {
        level[n].push(div = document.createElement('div'));
        div.className = square === ' ' ? 's' : square;
        field.appendChild(div);
        if (square === 'y') {
          x = m;
          y = n;
        }
      });
    });
  };

  buildLevel();

  const isWin = () => {
    for (let n = 0; n < level.length; n += 1) {
      for (let m = 0; m < level[n].length; m += 1) {
        if (level[n][m].className === 'b') {
          return false;
        }
      }
    }
    return true;
  };

  const handleKeydown = (e) => {
    let dx = 0;
    let dy = 0;
    switch (e.key) {
      case 'ArrowLeft':
        dx = -1;
        dy = 0;
        break;
      case 'ArrowRight':
        dx = 1;
        dy = 0;
        break;
      case 'ArrowUp':
        dx = 0;
        dy = -1;
        break;
      case 'ArrowDown':
        dx = 0;
        dy = 1;
        break;
      case 'Escape':
        field.replaceChildren();
        cell = null;
        forwardCell = null;
        forward2cell = null;
        level = [[], [], [], [], [], [], [], []];
        buildLevel();
        return;
      default:
        return;
    }
    e.preventDefault();
    forwardCell = level[y + dy][x + dx];

    if (forwardCell.className === 'w') return;
    cell = level[y][x];

    if (forwardCell.className === 'b' || forwardCell.className === 'a') {
      forward2cell = level[y + dy * 2][x + dx * 2];
      if (forward2cell.className === 'w' || forward2cell.className === 'b' || forward2cell.className === 'a') return;
      forward2cell.className = forward2cell.className === 'p' ? 'a' : 'b';
      forwardCell.className = forwardCell.className === 'a' ? 'p' : 's';
    }

    if (forwardCell.className === 'w') return;
    cell.className = cell.className === 'Y' ? 'p' : 's';
    forwardCell.className = forwardCell.className === 'p' ? 'Y' : 'y';
    x += dx; y += dy;

    if (isWin() === true) {
      window.removeEventListener('keydown', handleKeydown);
    }
  };

  window.addEventListener('keydown', handleKeydown);
  return isWin;
}
