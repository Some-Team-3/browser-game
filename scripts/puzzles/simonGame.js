const simonGame = (fieldSimon) => {
  const targetSequence = [];
  let userSequence = [];
  let levelCounter = 1;
  let randomNumber;

  const colors = ['green', 'red', 'yellow', 'blue'];
  for (let k = 0; k < colors.length; k += 1) {
    const button = document.createElement('div');
    button.setAttribute('id', `${colors[k]}`);
    fieldSimon.appendChild(button);
  }

  const showSequence = (element) => {
    switch (element) {
      case 1:
        document.querySelector('#green').classList.add('light');
        setTimeout(() => {
          document.querySelector('#green').classList.remove('light');
        }, 250);
        break;
      case 2:
        document.querySelector('#red').classList.add('light');
        setTimeout(() => {
          document.querySelector('#red').classList.remove('light');
        }, 250);
        break;
      case 3:
        document.querySelector('#yellow').classList.add('light');
        setTimeout(() => {
          document.querySelector('#yellow').classList.remove('light');
        }, 250);
        break;
      case 4:
        document.querySelector('#blue').classList.add('light');
        setTimeout(() => {
          document.querySelector('#blue').classList.remove('light');
        }, 250);
        break;
      default:
        break;
    }
  };

  const continueSequence = () => {
    randomNumber = Math.ceil(Math.random() * 4);
    targetSequence.push(randomNumber);

    targetSequence.forEach((item, index) => {
      setTimeout(() => {
        showSequence(item);
      }, index * 1400);
    });
  };

  const isWin = () => levelCounter === 5 && userSequence.length === 5;

  const resetGame = () => {
    userSequence = [];
    targetSequence.forEach((item, index) => {
      setTimeout(() => {
        showSequence(item);
      }, index * 1400);
    });
  };

  const launchError = () => {
    const terminal = document.getElementById('terminal_content');
    terminal.classList.add('error');
    setTimeout(() => {
      terminal.classList.remove('error');
      setTimeout(() => {
        resetGame();
      }, 1000);
    }, 1500);
  };

  const handleClick = (e) => {
    const userClicked = e.target.id;
    switch (userClicked) {
      case 'green':
        userSequence.push(1);
        showSequence(1);
        break;

      case 'red':
        userSequence.push(2);
        showSequence(2);
        break;

      case 'yellow':
        userSequence.push(3);
        showSequence(3);
        break;

      case 'blue':
        userSequence.push(4);
        showSequence(4);
        break;
      default:
        return;
    }
    const indexOfArray = userSequence.length - 1;
    if (userSequence[indexOfArray] === targetSequence[indexOfArray]) {
      if (targetSequence.length === userSequence.length) {
        setTimeout(() => {
          if (isWin()) {
            document.removeEventListener('click', handleClick);
            return;
          }
          levelCounter += 1;
          userSequence = [];
          continueSequence();
        }, 1600);
      }
    } else {
      launchError();
    }
  };

  document.addEventListener('click', handleClick);
  setTimeout(() => {
    continueSequence();
  }, 5000);

  return isWin;
};

export default simonGame;
