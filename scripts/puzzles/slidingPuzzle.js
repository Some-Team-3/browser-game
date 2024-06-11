const slidingPuzzle = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);
  const size = 3;
  let emptyIndex = size * size - 1;
  const tiles = Array.from({ length: 8 }, (_, index) => index + 1);
  const shuffleTiles = (arr) => arr.sort(() => Math.random() - 0.5);
  const shuffledTiles = shuffleTiles(tiles);
  shuffledTiles.push(9);

  const makeGrid = () => {
    container.innerHTML = '';
    const tileWidth = container.offsetWidth / size;
    const tileHeight = container.offsetHeight / size;

    shuffledTiles.forEach((number, index) => {
      const tile = document.createElement('div');
      tile.setAttribute = ('class', 'tile');
      if (number !== 9) {
        const x = ((number - 1) % size) * tileWidth;
        const y = Math.floor((number - 1) / size) * tileHeight;
        tile.style.backgroundImage = 'url(/images/slidingPuzzle.png)';
        tile.style.backgroundSize = `${container.offsetWidth}px ${container.offsetHeight}px`;
        tile.style.backgroundPosition = `-${x}px -${y}px`;
      } else {
        tile.classList.add('empty');
      }
      tile.addEventListener('click', () => {
        if (checkExchange(index, emptyIndex)) {
          exchangeTiles(index, emptyIndex);
          emptyIndex = index;
        }
      });
      container.appendChild(tile);
    });
  };

  const isWin = () => shuffledTiles.join('') === '123456789';

  const exchangeTiles = (index1, index2) => {
    [shuffledTiles[index1], shuffledTiles[index2]] = [shuffledTiles[index2], shuffledTiles[index1]];
    makeGrid();
    if (isWin()) {
      alert('win');
    }
  };

  const checkExchange = (index1, index2) => {
    const [row1, col1] = [Math.floor(index1 / size), index1 % size];
    const [row2, col2] = [Math.floor(index2 / size), index2 % size];
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  makeGrid();
};

slidingPuzzle();

export default slidingPuzzle;
