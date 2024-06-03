const computers = [...document.getElementsByClassName('computer')];
const screen = document.getElementById('screen');

export default () => {
  computers.forEach((computer) => {
    computer.addEventListener('click', ({ target }) => {
      screen.classList.remove('hide');
    });
  });
};
