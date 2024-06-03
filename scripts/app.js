export default () => {
  const computers = [...document.getElementsByClassName('computer')];
  computers.forEach((computer) => {
    computer.addEventListener('click', ({ target }) => {
      alert(`screen ${target.getAttribute('id')}`);
    });
  });
};
