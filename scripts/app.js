import i18next from 'i18next';
import Terminal from './helpers/terminal.js';
import ru from '../locales/lng.js';
import simonGame from './puzzles/simonGame.js';
import sokoban from './puzzles/sokoban.js';
import slidingPuzzle from './puzzles/slidingPuzzle.js';
import wordle from './puzzles/wordle.js';

const game = document.getElementById('game');
const computers = [...document.getElementsByClassName('computer')];

const state = {
  possessed: ['c1'],
  c1: {
    access: 'granted',
    loading: 'run',
    password: null,
    files: ['th0ught$1', 'puzzle_?1+', 'laborotory.png', 'log_1'],
    puzzle: {
      function: null,
      fieldId: null,
    },
    puzzle_state: 'solved',
  },
  c2: {
    access: 'denied',
    loading: 'run',
    password: '130',
    files: ['th0ught$2', 'puzzle_2', 'log_2'],
    puzzle: {
      function: simonGame,
      fieldId: 'fieldSimon',
    },
    puzzle_state: 'not solved',
  },
  c3: {
    access: 'denied',
    loading: 'run',
    password: '0104',
    files: ['th0ught$3', 'log_3', 'puzzle_3', 'prototype.png'],
    puzzle: {
      function: sokoban,
      fieldId: 'fieldSokoban',
    },
    puzzle_state: 'not solved',
  },
  c4: {
    access: 'denied',
    loading: 'run',
    password: '3007',
    files: ['th0ught$4', 'log_4', 'err0r', 'puzzle_4', 'note'],
    puzzle: {
      function: slidingPuzzle,
      fieldId: 'fieldSlidingPuzzle',
    },
    puzzle_state: 'not solved',
  },
  c5: {
    access: 'denied',
    loading: 'run',
    password: '4341',
    files: ['th0ught$5', 'last_day.png', 'warning', 'puzzle_5'],
    puzzle: {
      function: wordle,
      fieldId: 'fieldWordle',
    },
    puzzle_state: 'not solved',
  },
  main: {
    access: 'denied',
    loading: 'run',
    password: '04061',
    files: ['D0_Y0U_R3M3MB3R'],
    puzzle: {
      function: null,
      fieldId: null,
    },
    puzzle_state: 'no puzzle',
  },
};

export default () => {
  const i18nextInst = i18next.createInstance();
  i18nextInst.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  computers.forEach((computer) => {
    computer.addEventListener('click', ({ target }) => {
      const { id } = target;
      if (state.possessed.includes(id)) {
        const terminal = new Terminal(
          id,
          i18nextInst.t('terminal.common', { returnObjects: true, id }),
          i18nextInst.t(`terminal.${id}`, { returnObjects: true }),
          state[id],
          state.possessed,
        );
        terminal.run(game);
      }
    });

    computer.addEventListener('mouseover', ({ target }) => {
      const { id } = target;
      if (state.possessed.includes(id)) {
        target.classList.add('on');
      }
    });

    computer.addEventListener('mouseleave', ({ target }) => {
      const { id } = target;
      if (state.possessed.includes(id)) {
        target.classList.remove('on');
      }
    });
  });
};
