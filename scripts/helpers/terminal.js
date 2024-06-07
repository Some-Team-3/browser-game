import Typed from 'typed.js';

class Terminal {
  constructor(text, id) {
    this.common = text.t('terminal.common', { returnObjects: true, id });
    this.content = text.t(`terminal.${id}`, { returnObjects: true });
    this.commands = ['help', 'browse', 'open', 'exit', 'id', 'password'];
    this.password_value = this.content.password ?? null;
    this.access = !this.password_value;
  }

  run(container) {
    const terminal = document.createElement('div');
    const terminalContent = document.createElement('div');
    this.terminal = terminalContent;
    terminal.setAttribute('id', 'terminal');
    terminalContent.setAttribute('id', 'terminal_content');
    terminal.append(terminalContent);
    container.append(terminal);
    this.type(...this.content.loading.split('|'));
  }

  type(...messages) {
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
    label.innerHTML = '>  ';
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
    if (!this.commands.includes(command)) {
      this.type(this.common.command_failed);
    } else if (this.access || (command === 'password' || command === 'exit' || command === 'help')) {
      this[command](prompt);
    } else {
      this.type(this.common.no_access);
    }
  }

  browse() {
    this.type(this.content.files.all);
  }

  open(filename) {
    const fileContent = this.content.files[filename];
    if (!fileContent) {
      this.type(this.common.open_failed);
    } else {
      this.type(this.content.files[filename]);
    }
  }

  help() {
    this.type(...this.common.help.split('|'));
  }

  id() {
    this.type(this.common.id);
  }

  password(pswd) {
    if (this.access) {
      this.type(this.common.no_password);
    } else if (this.password_value === pswd) {
      this.access = true;
      this.type(this.common.password_right);
    } else {
      this.type(this.common.password_wrong);
    }
  }

  exit() {
    this.type(this.common.exit);
    this.terminal.parentElement.remove();
  }
}

export default Terminal;
