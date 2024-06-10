import Typed from 'typed.js';
import runPuzzle from './runPuzzle.js';

const allCommands = ['help', 'browse', 'open', 'exit', 'password'];

class Terminal {
  constructor(common, content, state) {
    this.common = common;
    this.content = content;
    this.state = state;
    this.commands = this.state.access === 'granted' ? [...allCommands] : ['password', 'help', 'exit'];
  }

  run(container) {
    const terminal = document.createElement('div');
    const terminalContent = document.createElement('div');
    this.terminal = terminalContent;
    terminal.setAttribute('id', 'terminal');
    terminalContent.setAttribute('id', 'terminal_content');
    terminal.append(terminalContent);
    container.append(terminal);
    if (this.state.loading === 'run') {
      this.type(this.content.loading);
      this.state.loading = 'skip';
    } else {
      this.readline();
    }
  }

  type(str) { // нельзя вызывать несколько раз подряд
    const messages = str.split('|');
    const typingManager = document.createElement('span');
    typingManager.setAttribute('id', 'manage_typing');
    this.terminal.append(typingManager);
    const mElems = messages.map((m) => {
      const span = document.createElement('span');
      span.innerHTML = m;
      span.classList.add('hide');
      span.classList.add('typed');
      typingManager.before(span);
      return span;
    });

    return new Typed('#manage_typing', {
      strings: messages,
      typeSpeed: 50,
      startDelay: 1500,
      fadeOut: true,
      fadeOutDelay: 0,
      preStringTyped: () => {
        typingManager.classList.remove('hide');
      },
      onStringTyped: (arrayPos) => {
        typingManager.classList.add('hide');
        mElems[arrayPos].classList.remove('hide');
      },
      onComplete: (self) => {
        self.destroy();
        typingManager.remove();
        this.readline();
      },
    });
  }

  readline() {
    const input = document.createElement('input');
    const label = document.createElement('label');
    input.setAttribute('id', 'command_line_input');
    input.setAttribute('type', 'text');
    input.addEventListener('keydown', ({ code, target }) => {
      if (code === 'Enter') {
        const command = target.value;
        label.remove();
        this.execute(command);
      }
    });
    label.setAttribute('id', 'command_line');
    label.innerHTML = '>';
    label.append(input);
    this.terminal.append(label);
    input.focus();
  }

  execute(input) {
    const commandRun = document.createElement('span');
    commandRun.classList.add('typed');
    commandRun.innerHTML = `>${input}`;
    this.terminal.append(commandRun);
    const [command, prompt] = input.split(' ');
    if (!allCommands.includes(command)) {
      this.type(this.common.command_failed);
    } else if (!this.commands.includes(command)) {
      this.type(this.common.no_access);
    } else {
      this[command](prompt);
    }
  }

  browse() {
    this.type(this.content.files.browse);
  }

  async open(filename) {
    if (!this.state.files.includes(filename)) {
      this.type(this.common.open_failed);
    } else if (filename.startsWith('puzzle')) {
      if (this.state.puzzle_state === 'solved') {
        this.type(this.common.no_puzzle.join(this.content.puzzle_solved));
      } else {
        await runPuzzle(this.state.puzzle, this.terminal);
        this.type(this.content.puzzle_solved);
        this.state.puzzle_state = 'solved';
      }
    } else if (filename.endsWith('.png')) {
      const img = document.createElement('div');
      img.setAttribute('id', 'img');
      img.classList.add(filename.slice(0, -4));
      this.terminal.append(img);
      this.readline();
    } else {
      this.type(this.content.files[filename]);
    }
  }

  help() {
    this.type(this.common.help);
  }

  password(value) {
    if (this.state.access === 'granted') {
      this.type(this.common.no_password);
    } else if (this.state.password === value) {
      this.state.access = 'granted';
      this.commands = [...allCommands];
      this.type(this.common.password_right);
    } else {
      this.type(this.common.password_wrong);
    }
  }

  exit() {
    this.terminal.parentElement.remove();
  }
}

export default Terminal;
