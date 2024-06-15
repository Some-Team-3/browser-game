import i18next from 'i18next';
import Terminal from './helpers/terminal.js';
import ru from '../locales/lng.js';
import simonGame from './puzzles/simonGame.js';
import sokoban from './puzzles/sokoban.js';
import slidingPuzzle from './puzzles/slidingPuzzle.js';
import wordle from './puzzles/wordle.js';

import makeSound from './helpers/makeSound.js';
import backgroundMusic from '../sounds/backgroundSound.mp3';
import terminalOpen from '../sounds/terminalON.mp3';
import terminalClose from '../sounds/terminalOFF.mp3';
import finalGameMusic from '../sounds/final.mp3';
import simon1 from '../sounds/simonSound1.mp3';
import simon2 from '../sounds/simonSound2.mp3';
import simon3 from '../sounds/simonSound3.mp3';
import simon4 from '../sounds/simonSound4.mp3';
import errorSound from '../sounds/error.mp3';
import pressKey from '../sounds/keyPressed.mp3';
import slide from '../sounds/slideSound.mp3';

const game = document.getElementById('game');
const computers = [...document.getElementsByClassName('computer')];
const musicToggleIcon = document.getElementById('music_toggle');

const backMusic = makeSound(backgroundMusic, [['loop', 'loop']]);
const finalMusic = makeSound(finalGameMusic, [['loop', 'loop']]);
const openSound = makeSound(terminalOpen);
const closeSound = makeSound(terminalClose);
const sSound1 = makeSound(simon1);
const sSound2 = makeSound(simon2);
const sSound3 = makeSound(simon3);
const sSound4 = makeSound(simon4);
const clickSound = makeSound(pressKey);
const slideSound = makeSound(slide);
const errSound = makeSound(errorSound);

const state = {
  possessed: ['c1', 'main'],
  c1: {
    access: 'granted',
    loading: 'run',
    password: null,
    files: ['th0ught$1', 'puzzle_?1+', 'laboratory.png', 'log_1'],
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
    access: 'granted',
    loading: 'rnun',
    password: '04061',
    files: ['final_th0ught$', 'D0_Y0U_R3M3MB3R'],
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

  document.addEventListener('DOMContentLoaded', () => {
    backMusic.volume = 0.1;
    errSound.volume = 0.2;
    clickSound.volume = 0.7;
    clickSound.playbackRate = 2;
    slideSound.volume = 0.2;
    slideSound.playbackRate = 2;
    sSound1.volume = 0.3;
    sSound2.volume = 0.3;
    sSound3.volume = 0.3;
    sSound4.volume = 0.3;
  });

  musicToggleIcon.classList.add('music_off');

  let isMusicPaused = true;
  musicToggleIcon.addEventListener('click', ({ target }) => {
    if (isMusicPaused) {
      backMusic.play();
      isMusicPaused = false;
    } else {
      backMusic.pause();
      isMusicPaused = true;
    }
    target.classList.toggle('music_off');
    target.classList.toggle('music_on');
  });

  computers.forEach((computer) => {
    computer.addEventListener('click', ({ target }) => {
      openSound.play();
      const { id } = target;
      if (state.possessed.includes(id)) {
        const terminal = new Terminal(
          id,
          i18nextInst.t('terminal.common', { returnObjects: true, id }),
          i18nextInst.t(`terminal.${id}`, { returnObjects: true }),
          state[id],
          state.possessed,
          {
            backMusic,
            finalMusic,
            openSound,
            closeSound,
            sSound1,
            sSound2,
            sSound3,
            sSound4,
            clickSound,
            slideSound,
            errSound,
          },
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
