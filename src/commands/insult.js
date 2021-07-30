const { pick: pickSubject } = require('../utils/subjects');
const { pick: pickNoun } = require('../utils/nouns');
const { pick: pickComplement } = require('../utils/complements');
const { masterId } = require('../config');

const getFullInsult = () => {
  const { det: det1, gender, number, subject } = pickSubject();
  const insult = getInsult(gender, number);

  const fullInsult = `${det1} ${subject} ${insult}`;
  return fullInsult;
};
const getInsult = (g, n) => {
  const noun = pickNoun(g, n);
  const comp = pickComplement();

  const insult = `${noun} ${comp} !`;
  return insult;
};

const execute = (msg, args) => {
  const usersMentioned = msg.mentions.users.array() || null;
  const length = usersMentioned.length;
  if (length) {
    if (usersMentioned.map((u) => u.id).includes(masterId)) {
      msg.channel.send(
        `Je n'insulterais JAMAIS mon maître... ${
          msg.author.username
        } ${getInsult('m', 's')}`
      );
      return;
    }
    const n = (length > 1 && 'p') || 's';
    const to = usersMentioned
      .map((u) => u.username)
      .join(length > 2 ? ', ' : ' et ');
    msg.channel.send(to + ' ' + getInsult('m', n));
  } else {
    msg.reply(getFullInsult());
  }
};

module.exports = {
  name: 'insult',
  usage: '[ mention ]',
  aliases: ['roast', 'traite', 'i'],
  execute,
};
