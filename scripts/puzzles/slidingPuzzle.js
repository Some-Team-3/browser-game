const slidingPuzzle = (container, { slideSound }) => {
  const size = 3;
  let emptyIndex = size * size - 1;
  const shuffledTiles = [4, 3, 1, 8, 2, 5, 7, 6];
  shuffledTiles.push(9);

  const checkExchange = (index1, index2) => {
    const [row1, col1] = [Math.floor(index1 / size), index1 % size];
    const [row2, col2] = [Math.floor(index2 / size), index2 % size];
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const isWin = () => shuffledTiles.join('') === '123456789';

  const makeGrid = () => {
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = '';
    const tileWidth = container.offsetWidth / size;
    const tileHeight = container.offsetHeight / size;

    shuffledTiles.forEach((number, index) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (number !== 9) {
        const x = ((number - 1) % size) * tileWidth;
        const y = Math.floor((number - 1) / size) * tileHeight;
        tile.classList.add('price');
        tile.style.backgroundSize = `${container.offsetWidth}px ${container.offsetHeight}px`;
        tile.style.backgroundPosition = `-${x}px -${y}px`;
      } else {
        tile.classList.add('empty');
      }
      const handleClick = () => {
        slideSound.play();
        if (checkExchange(index, emptyIndex)) {
          [shuffledTiles[index], shuffledTiles[emptyIndex],
          ] = [shuffledTiles[emptyIndex], shuffledTiles[index]];
          makeGrid();
          if (isWin()) {
            tile.removeEventListener('click', handleClick);
          }
          emptyIndex = index;
        }
      };
      tile.addEventListener('click', handleClick);
      container.appendChild(tile);
    });
  };

  makeGrid();
  return isWin;
};

export default slidingPuzzle;
