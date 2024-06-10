export default async (puzzle, puzzleFieldId, container) => {
  const field = document.createElement('div');
  field.setAttribute('id', puzzleFieldId);
  container.append(field);
  const isWin = puzzle(field);
  await new Promise((resolve) => {
    const listener = () => {
      if (isWin()) {
        window.removeEventListener('keydown', listener);
        window.removeEventListener('click', listener);
        resolve();
      }
    };
    window.addEventListener('keydown', listener);
    window.addEventListener('click', listener);
  });
};
