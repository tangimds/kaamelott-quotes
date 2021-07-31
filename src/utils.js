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

module.exports = {
  formatSlackResponse,
};
