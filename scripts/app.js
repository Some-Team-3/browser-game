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
const backMusic = makeSound(backgroundMusic, [['loop', 'loop']]);
backMusic.volume = 0.5;
const openSound = makeSound(terminalOpen);
const closeSound = makeSound(terminalClose);
const finalMusic = makeSound(finalGameMusic, [['loop', 'loop']]);
const sSound1 = makeSound(simon1);
const sSound2 = makeSound(simon2);
const sSound3 = makeSound(simon3);
const sSound4 = makeSound(simon4);
const errSound = makeSound(errorSound);
errSound.volume = 0.2;
const clickSound = makeSound(pressKey);
clickSound.volume = 0.7;
clickSound.playbackRate = 1.5;
const slideSound = makeSound(slide);
slideSound.volume = 0.6;
slideSound.playbackRate = 1.5;

const state = {
  possessed: ['c1', 'c2', 'c3', 'c4', 'c5', 'main'],
  c1: {
    access: 'granted',
    loading: 'rnun',
    password: null,
    files: ['th0ught$1', 'puzzle_?1+', 'laboratory.png', 'log_1'],
    puzzle: {
      function: null,
      fieldId: null,
    },
    puzzle_state: 'solved',
  },
  c2: {
    access: 'granted',
    loading: 'rnun',
    password: '130',
    files: ['th0ught$2', 'puzzle_2', 'log_2'],
    puzzle: {
      function: simonGame,
      fieldId: 'fieldSimon',
    },
    puzzle_state: 'not solved',
  },
  c3: {
    access: 'granted',
    loading: 'rnun',
    password: '0104',
    files: ['th0ught$3', 'log_3', 'puzzle_3', 'prototype.png'],
    puzzle: {
      function: sokoban,
      fieldId: 'fieldSokoban',
    },
    puzzle_state: 'not solved',
  },
  c4: {
    access: 'granted',
    loading: 'rnun',
    password: '3007',
    files: ['th0ught$4', 'log_4', 'err0r', 'puzzle_4', 'note'],
    puzzle: {
      function: slidingPuzzle,
      fieldId: 'fieldSlidingPuzzle',
    },
    puzzle_state: 'not solved',
  },
  c5: {
    access: 'granted',
    loading: 'rnun',
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

  const play = () => {
    backMusic.play();
    document.removeEventListener('click', play);
  };

  document.addEventListener('click', play);

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
            openSound,
            closeSound,
            finalMusic,
            sSound1,
            sSound2,
            sSound3,
            sSound4,
            errSound,
            clickSound,
            slideSound,
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
