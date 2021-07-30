const comp = [
  'de foutre 🥛',
  'de cérumen 🐝',
  'de pied 🦶🏽',
  "d'ongles 💅",
  "d'orteils",
  "d'auriculaires",
  'de cul 🍑',
  'de fesses 🍑',
  "d'oeil 👁",
  'de coude 💪',
  'de licorne 🦄',
];

pick = () => {
  const random = Math.floor(Math.random() * comp.length);
  return comp[random];
};

module.exports = { pick };
