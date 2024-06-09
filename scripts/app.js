import i18next from 'i18next';
import Terminal from './helpers/terminal.js';
import ru from '../locales/lng.js';
import sokoban from './puzzles/sokoban.js';
import simonGame from './puzzles/simonGame.js';
import slidingPuzzle from './puzzles/slidingPuzzle.js';

const game = document.getElementById('game');
const computers = [...document.getElementsByClassName('computer')];

const state = {
  // possessed: ['c1'],
  c1: {
    access: 'granted',
    loading: 'run',
    password: null,
    files: ['th0ught$1', 'broken_puzzle', 'laborotory.png', 'log_1'],
    puzzle: null,
    puzzle_state: 'no puzzle',
  },
  c2: {
    access: 'denied',
    loading: 'run',
    password: '130',
    files: ['th0ught$2', 'puzzle_1', 'log_2'],
    puzzle: sokoban,
    puzzle_state: 'not solved',
  },
  c3: {
    access: 'denied',
    loading: 'run',
    password: '0104',
    files: ['th0ught$3', 'log_3', 'puzzle_2', 'prototype.png'],
    puzzle: simonGame,
    puzzle_state: 'not solved',
  },
  c4: {
    access: 'denied',
    loading: 'run',
    password: '3007',
    files: ['th0ught$4', 'log_4', 'err0r', 'puzzle_3', 'note'],
    puzzle: slidingPuzzle,
    puzzle_state: 'not solved',
  },
  c5: {
    access: 'denied',
    loading: 'run',
    password: '4341',
    files: ['th0ught$5', 'last_day.png', 'warning', 'puzzle_4'],
    puzzle: simonGame,
    puzzle_state: 'not solved',
  },
  main: {
    access: 'denied',
    loading: 'run',
    password: '04061',
    files: ['D0_Y0U_R3M3MB3R'],
    puzzle: null,
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
      const terminal = new Terminal(
        i18nextInst.t('terminal.common', { returnObjects: true }),
        i18nextInst.t(`terminal.${target.id}`, { returnObjects: true }),
        state[target.id],
      );
      terminal.run(game);
    });
  });
};
