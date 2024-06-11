import Typed from 'typed.js';
import runPuzzle from './runPuzzle.js';

const allCommands = ['help', 'browse', 'open', 'exit', 'password', 'id'];

class Terminal {
  constructor(id, common, content, state, accessible) {
    this.computer_id = id;
    this.common = common;
    this.content = content;
    this.state = state;
    this.accessible = accessible;
    this.commands = this.state.access === 'granted' ? [...allCommands] : ['password', 'help', 'exit'];
  }

  run(container) {
    const terminal = document.createElement('div');
    const terminalContent = document.createElement('div');
    this.container = terminalContent;
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

  async type(str, readline = 'enable') {
    const messages = str.split('|');
    const typingManager = document.createElement('span');
    const typingManagerId = `manage_typing${Math.ceil(Math.random() * 10)}`;
    typingManager.setAttribute('id', typingManagerId);
    const wrap = document.createElement('span');
    wrap.classList.add('bl');
    wrap.append(typingManager);
    this.container.append(wrap);
    const mElems = messages.map((m) => {
      const span = document.createElement('span');
      span.innerHTML = m;
      span.classList.add('hide');
      span.classList.add('bl');
      typingManager.before(span);
      return span;
    });

    return new Typed(`#${typingManagerId}`, {
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
        this.container.scrollTop = this.container.scrollHeight;
      },
      onComplete: (self) => {
        self.destroy();
        typingManager.remove();
        if (readline === 'enable') {
          this.readline();
        }
      },
    });
  }

  readline() {
    const input = document.createElement('input');
    const label = document.createElement('label');
    input.setAttribute('id', 'command_line_input');
    input.setAttribute('type', 'text');
    input.setAttribute('spellcheck', 'false');
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
    this.container.append(label);
    this.container.scrollTop = this.container.scrollHeight;
    input.focus();
  }

  execute(input) {
    const commandRun = document.createElement('span');
    commandRun.classList.add('bl');
    commandRun.innerHTML = `>${input}`;
    this.container.append(commandRun);
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
    this.type(this.state.files.join(' '));
  }

  async open(filename) {
    if (!this.state.files.includes(filename)) {
      this.type(this.common.open_failed);
    } else if (filename.startsWith('puzzle')) {
      const computer = document.getElementById(this.computer_id);
      const next = computer.getAttribute('password_for');
      if (this.state.puzzle_state === 'solved') {
        this.type(this.common.no_puzzle, 'disable');
        this.type(this.content.puzzle_solved);
        if (!this.accessible.includes(next)) {
          this.accessible.push(next);
        }
      } else {
        this.type(this.content.puzzle_rules, 'disable');
        await runPuzzle(this.state.puzzle.function, this.state.puzzle.fieldId, this.container);
        this.type(this.content.puzzle_solved);
        this.state.puzzle_state = 'solved';
        this.accessible.push(next);
      }
    } else if (filename.endsWith('.png')) {
      const img = document.createElement('div');
      img.setAttribute('id', 'image');
      img.classList.add(filename.slice(0, -4));
      this.container.append(img);
      this.readline();
    } else if (this.computer_id === 'main') {
      this.type(this.content.files[filename], 'disable');
      setTimeout(() => {
        this.exit();
        const boom = document.createElement('div');
        boom.classList.add('bboom');
        document.body.append(boom);
        boom.classList.add('boom');
      }, 4000);
    } else {
      this.type(this.content.files[filename]);
    }
  }

  help() {
    this.type(this.common.help);
  }

  id() {
    this.type(this.common.get_id);
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
    this.container.parentElement.remove();
  }
}

export default Terminal;
