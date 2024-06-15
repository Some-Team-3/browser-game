const simonGame = (fieldSimon, sounds) => {
  const targetSequence = [];
  let userSequence = [];
  let levelCounter = 1;
  let randomColorI;
  let showQueue = [];

  const colors = ['green', 'red', 'yellow', 'blue'];
  const buttons = colors.reduce((acc, color) => {
    const button = document.createElement('div');
    button.setAttribute('id', color);
    fieldSimon.append(button);
    return { ...acc, [color]: button };
  }, {});
  const buttonSounds = {
    green: sounds.sSound1,
    red: sounds.sSound2,
    yellow: sounds.sSound3,
    blue: sounds.sSound4,
  };

  const showSequenceItem = (element) => {
    buttons[element].classList.add('light');
    buttonSounds[element].play();
    setTimeout(() => {
      buttons[element].classList.remove('light');
    }, 250);
  };

  const showSequence = () => {
    showQueue.forEach((timeoutId) => clearTimeout(timeoutId));
    showQueue = [];
    targetSequence.forEach((item, index) => {
      showQueue.push(setTimeout(() => {
        showSequenceItem(item);
      }, index * 1300));
    });
  };

  const continueSequence = () => {
    randomColorI = Math.floor(Math.random() * 4);
    targetSequence.push(colors[randomColorI]);
    showSequence();
  };

  const isWin = () => levelCounter === 5 && targetSequence.join('') === userSequence.join('');

  const resetGame = () => {
    userSequence = [];
    showSequence();
  };

  const launchError = () => {
    fieldSimon.classList.add('error');
    sounds.errSound.play();
    setTimeout(() => {
      fieldSimon.classList.remove('error');
      setTimeout(() => {
        resetGame();
      }, 1000);
    }, 1500);
  };

  const handleClick = ({ target }) => {
    const userClicked = target.id;
    showSequenceItem(userClicked);
    const indexOfArray = userSequence.length;
    if (userClicked === targetSequence[indexOfArray]) {
      userSequence.push(userClicked);
      if (targetSequence.length === userSequence.length) {
        if (isWin()) {
          Object.values(buttons).forEach((button) => {
            button.removeEventListener('click', handleClick);
          });
          return;
        }
        setTimeout(() => {
          levelCounter += 1;
          userSequence = [];
          continueSequence();
        }, 1600);
      }
    } else {
      launchError();
    }
  };

  Object.values(buttons).forEach((button) => {
    button.addEventListener('click', handleClick);
  });
  setTimeout(() => {
    continueSequence();
  }, 5000);

  return isWin;
};

export default simonGame;
