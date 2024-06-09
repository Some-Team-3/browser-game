export default async (puzzle, container) => {
  const field = document.createElement('div');
  field.setAttribute('id', 'field');
  container.append(field);
  const isWin = puzzle(field);
  await new Promise((resolve) => {
    const listener = () => {
      if (isWin()) {
        window.removeEventListener('keydown', listener);
        resolve();
      }
    };
    window.addEventListener('keydown', listener);
  });
};
