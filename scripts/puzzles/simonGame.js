const simonGame = () => {
  let targetSequence = [];
  let userSequence = [];
  let levelCounter = 1;
  let randomNumber;

  document.body.style.backgroundColor = 'black';

  const textline = document.createElement('h1');
  textline.setAttribute('class', 'textline');
  textline.textContent = 'Нажмите ENTER';
  document.body.append(textline);

  const fieldSimon = document.createElement('div');
  fieldSimon.setAttribute('id', 'fieldSimon');
  document.body.append(fieldSimon);

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

  const makeSequence = () => {
    for (let i = 1; i <= levelCounter; i += 1) {
      randomNumber = Math.ceil(Math.random() * 4);
      targetSequence.push(randomNumber);
    }
    targetSequence.forEach((item, index) => {
      setTimeout(() => {
        showSequence(item);
      }, index * 1400);
    });
  };

  const changeLevel = () => {
    if (levelCounter === 5) {
    // alert('win')
      return;
    }
    levelCounter += 1;
    userSequence = [];
    targetSequence = [];
    textline.textContent = `Уровень: ${levelCounter}`;
    makeSequence();
  };

  const resetGame = () => {
    textline.textContent = 'Нажмите ENTER';
    document.body.style.backgroundColor = 'black';
    levelCounter = 1;
    targetSequence = [];
    userSequence = [];
  };

  const launchError = () => {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
      resetGame();
    }, 1500);
  };

  const checkSequence = (indexOfArray) => {
    if (userSequence[indexOfArray] === targetSequence[indexOfArray]) {
      if (targetSequence.length === userSequence.length) {
        setTimeout(() => {
          changeLevel();
        }, 1000);
      }
    } else {
      launchError();
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      textline.textContent = `Уровень: ${levelCounter}`;
      makeSequence();
    }
  });

  document.addEventListener('click', (e) => {
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
    checkSequence(userSequence.length - 1);
  });
};

export default simonGame;
