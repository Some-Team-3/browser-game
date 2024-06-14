import makeSound from '../helpers/makeSound.js';
import errorSound from '../../sounds/error.mp3';

const errorSoundEl = makeSound(errorSound);

const processAttempt = (attempt, answer) => {
  const letters = [...attempt];
  let remain = answer;
  return letters.map((letter, i) => {
    if (remain.includes(letter)) {
      remain = remain.replace(letter, '');
      if (letter === answer[i]) {
        return 'correct';
      }
      return 'present';
    }
    return 'wrong';
  });
};

export default (field, sounds) => {
  const letters = 'абвгдеёжзиклмнопрстуфхцчщшьыъэюя'.split('');
  const word = 'вирус';
  const level = Array(6).fill(0).map(() => Array(5).fill(''));
  let attempt;
  let attemptRowI;
  let attemptElI;
  let curr;

  const build = () => {
    level.forEach((row, rowI) => {
      const rowEl = document.createElement('div');
      rowEl.classList.add('wordle_row');
      rowEl.setAttribute('rowIndex', rowI);

      row.forEach((content, elI) => {
        const el = document.createElement('div');
        el.classList.add('wordle_square');
        el.setAttribute('squareIndex', elI);
        el.innerHTML = content;
        rowEl.append(el);
      });
      field.append(rowEl);
    });
  };

  const reset = () => {
    curr = structuredClone(level);
    attemptRowI = 0;
    attemptElI = 0;
    build();
  };

  const isWin = () => attempt === word;

  const handleKeydown = (e) => {
    sounds.clickSound.play();
    const currRow = field.querySelector(`[rowIndex="${attemptRowI}"]`);
    let currSquare = currRow.querySelector(`[squareIndex="${attemptElI}"]`);
    if (letters.includes(e.key)) {
      if (attemptElI < word.length) {
        curr[attemptRowI][attemptElI] = e.key;
        currSquare.innerHTML = curr[attemptRowI][attemptElI];
        attemptElI += 1;
      }
    } else if (e.key === 'Enter') {
      if (curr[attemptRowI].includes('')) {
        currRow.classList.add('error');
        sounds.errSound.play();
        setTimeout(() => {
          currRow.classList.remove('error');
        }, 1500);
        return;
      }
      attempt = curr[attemptRowI].join('');
      if (attemptRowI === level.length - 1) {
        field.replaceChildren();
        reset();
        return;
      }
      const processedAttempt = processAttempt(attempt, word);
      const squares = [...currRow.children];
      processedAttempt.forEach((result, i) => {
        squares[i].classList.add(result);
      });
      if (isWin()) {
        window.removeEventListener('keydown', handleKeydown);
        errorSoundEl.remove();
        field.click();
      }
      attemptRowI += 1;
      attemptElI = 0;
    } else if (e.key === 'Backspace') {
      if (attemptElI > 0) {
        attemptElI -= 1;
        curr[attemptRowI][attemptElI] = '';
        currSquare = currRow.querySelector(`[squareIndex="${attemptElI}"]`);
        currSquare.innerHTML = '';
      }
    }
  };

  reset();
  setTimeout(() => {
    window.addEventListener('keydown', handleKeydown);
  }, 1000);
  return isWin;
};
