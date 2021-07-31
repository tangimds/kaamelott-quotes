const formatSlackResponse = ({ quote, character, season, episode }) => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: quote,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            (character && bold(italic(character))) +
            (season ? ` - ${italic(season)}` : "") +
            (episode ? ` - ${italic(episode)}` : ""),
        },
      },
    ],
  };
};

const bold = (x) => `*${x}*`;
const italic = (x) => `_${x}_`;

const formatResponse = ({ format, data }) => {
  console.log({ format, data });
  if (format === "slack") return formatSlackResponse(data.quote);
  return { ok: true, data };
};

const filter = ({ filters, array }) =>
  array.filter((e) => {
    let match = true;
    Object.keys(filters).forEach((f) => {
      if (!filters[f]) return;
      return (match = match && e[f]?.includes(filters[f]));
    });
    return match;
  });

const arabicToRoman = (e) => {
  if (e === "1") return "I";
  if (e === "2") return "II";
  if (e === "3") return "III";
  if (e === "4") return "IV";
  if (e === "5") return "V";
  if (e === "6") return "VI";
  return e;
};

const notFoundQuote = {
  quote: "Hum, la, franchement.... Ca m'dit rien !",
  character: "Alexandre Astier",
};
const _random = (array) =>
  (array && array[Math.floor(Math.random() * array.length)]) || notFoundQuote;

module.exports = {
  formatSlackResponse,
  filter,
  arabicToRoman,
  formatResponse,
  _random,
};
