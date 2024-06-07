import i18next from 'i18next';
import Terminal from './helpers/terminal.js';
import ru from '../locales/lng.js';

const game = document.getElementById('game');
const computers = [...document.getElementsByClassName('computer')];

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
      const terminal = new Terminal(i18nextInst, target.id);
      terminal.run(game);
    });
  });
};
