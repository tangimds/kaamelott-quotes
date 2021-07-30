const subjects = [
  {
    det: 'ton',
    gender: 'm',
    number: 's',
    data: [
      'père',
      'papa',
      'frère',
      'cousin',
      'chien',
      'oncle',
      'grand-père',
      'zgeg',
      'sexe',
      'chat',
      'fils',
    ],
  },
  {
    det: 'ta',
    gender: 'f',
    number: 's',
    data: [
      'mère',
      'maman',
      'soeur',
      'cousine',
      'chienne',
      'tante',
      'grand-mère',
      'chatte',
      'fille',
    ],
  },
  {
    det: 'tes',
    gender: 'm',
    number: 'p',
    data: ['parents', 'grands-parents', 'cousins', 'chiens', 'oncles'],
  },
  {
    det: 'tes',
    gender: 'f',
    number: 'p',
    data: ['chiennes', 'cousines', 'tantes'],
  },
];

pick = () => {
  const r = (arr) => Math.floor(Math.random() * arr.length);
  const i = r(subjects);
  const subject = subjects[i];
  const j = r(subject.data);
  const obj = {
    ...subject,
    subject: subject.data[j],
  };
  return obj;
};

module.exports = { pick };
