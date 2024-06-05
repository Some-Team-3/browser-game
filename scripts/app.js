import i18next from 'i18next';
import Typed from 'typed.js';
import en from '../locales/lng.js';

const computers = [...document.getElementsByClassName('computer')];
const terminal = document.getElementById('terminal');
const terminalContent = document.getElementById('terminal_output');
const typingManager = document.getElementById('manage_typing');

export default () => {
  const i18nextInst = i18next.createInstance();
  i18nextInst.init({
    lng: 'en',
    debug: true,
    resources: {
      en,
    },
  });

  const runTerminal = () => {
    terminal.classList.remove('hide');
    terminalContent.classList.remove('hide');
    const messages = [i18nextInst.t('loading'), i18nextInst.t('welcome')];
    const mElems = messages.map((m) => {
      const p = document.createElement('span');
      p.innerHTML = m;
      p.classList.add('hide');
      p.classList.add('typed');
      typingManager.before(p);
      return p;
    });
    const typed = new Typed('#manage_typing', {
      strings: messages,
      typeSpeed: 80,
      startDelay: 1500,
      fadeOut: true,
      fadeOutDelay: 0,
      onStringTyped: (arrayPos) => {
        typingManager.classList.add('hide');
        mElems[arrayPos].classList.remove('hide');
      },
      preStringTyped: () => {
        typingManager.classList.remove('hide');
      },
    });
  };

  computers.forEach((computer) => {
    computer.addEventListener('click', () => {
      runTerminal();
    });
  });
};
