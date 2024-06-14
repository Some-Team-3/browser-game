const game = document.getElementById('game');

export default (data, options = []) => {
  const audio = new Audio(data);
  options.forEach(([key, value]) => {
    audio.setAttribute(key, value);
  });
  game.append(audio);
  return audio;
};
