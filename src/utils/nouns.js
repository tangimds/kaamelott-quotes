const nouns = {
  m: {
    s: {
      det: 'le',
      data: ['suceur', 'mangeur', 'lécheur', 'renifleur', 'amateur', 'baiseur'],
    },
    p: {
      det: 'les',
      data: [
        'suceurs',
        'mangeurs',
        'lécheurs',
        'renifleurs',
        'amateurs',
        'baiseurs',
      ],
    },
  },
  f: {
    s: {
      det: 'la',
      data: [
        'suceuse',
        'mangeuse',
        'lécheuse',
        'renifleuse',
        'amatrice',
        'baiseuse',
      ],
    },
    p: {
      det: 'les',
      data: [
        'suceuses',
        'mangeuses',
        'lécheuses',
        'renifleuses',
        'amatrices',
        'baiseuses',
      ],
    },
  },
};

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

pick = (g, n) => {
  const random = Math.floor(Math.random() * nouns[g][n].data.length);
  const noun = nouns[g][n].data[random];
  const det =
    vowels.includes(noun.charAt(0)) && n === 's' ? "l'" : nouns[g][n].det;
  return `${det} ${noun}`;
};

module.exports = { pick };
