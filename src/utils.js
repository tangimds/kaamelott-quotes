import { useLocation } from "react-router-dom";

const formatSlackResponse = ({ quote, character, season, episode }) => {
  return {
    response_type: "in_channel",
    text: `${quote}\n\n${sign({ character, season, episode })}`,
  };
};

const sign = ({ character, season, episode }) => {
  let r = "";
  character ? (r += bold(italic(character))) : null;
  season ? (r += " - " + italic(season)) : null;
  episode ? (r += " - " + italic(episode)) : null;
  return r;
};

const bold = (x) => `*${x}*`;
const italic = (x) => `_${x}_`;

const filtersMaps = (e) => {
  switch (e) {
    case "text":
      return "quote";
    case "livre":
      return "season";
    case "citation":
      return "quote";
    case "personnage":
      return "character";
    case "perso":
      return "character";
    default:
      return e;
  }
};

const filterByProps = ({ filters, array }) => {
  if (filters.id) return array.filter((e) => e.id == filters.id);
  delete filters.id;
  return array.filter((e) => {
    let match = true;
    Object.keys(filters).forEach((f) => {
      if (!filters[f]) return;
      return (match = match && _includes(e[filtersMaps(f)], filters[f]));
    });
    return match;
  });
};

const filter = ({ filter, array }) => {
  if (!filter) return array;
  return array.filter((e) => {
    let match = false;
    Object.keys(e).forEach((prop) => {
      if (!e[prop] || typeof e[prop] !== "string") return;
      return (match = match || _includes(e[prop], filter));
    });
    return match;
  });
};

const _includes = (a, b) => a?.toLowerCase().includes(b?.toLowerCase());

const arabicToRoman = (e) => {
  if (e === "1") return "I";
  if (e === "2") return "II";
  if (e === "3") return "III";
  if (e === "4") return "IV";
  if (e === "5") return "V";
  if (e === "6") return "VI";
  return e;
};

const notFoundQuotes = [
  {
    quote: "Hum, la, franchement.... Ca m'dit rien !",
    character: "Alexandre Astier (il a pas vraiment dit ça hein)",
  },
  {
    quote: "J'ai po trouvé :(",
    character: "Alexandre Astier (il a pas vraiment dit ça hein)",
  },
  {
    quote: "T'as pas fait une faute d'ortho... de frappe ?",
    character: "Alexandre Astier (il a pas vraiment dit ça hein)",
  },
  {
    quote: "Ca doit être dans une autre série ça...",
    character: "Alexandre Astier (il a pas vraiment dit ça hein)",
  },
];
const _random = (array) =>
  (array && array[Math.floor(Math.random() * array.length)]) ||
  notFoundQuotes[Math.floor(Math.random() * notFoundQuotes.length)];

const invertKeyValueObject = (obj) =>
  Object.keys(obj).reduce((res, key) => {
    res[obj[key]] = key;
    return res;
  }, {});

const BACKGROUNDS_ARRAY_SIZE = 8;
const getBackground = () =>
  `/assets/backgrounds/${Math.floor(
    Math.random() * BACKGROUNDS_ARRAY_SIZE
  )}.jpg`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const getQuote = ({ array, query }) => {
  const quotesScope = filterByProps({
    array,
    filters: query,
  });
  return { data: _random(quotesScope), total: quotesScope.length };
};

const queryToObject = (q) => {
  let res = {};
  for (let x of q) res[x[0]] = x[1];
  return res;
};

module.exports = {
  formatSlackResponse,
  filter,
  filterByProps,
  arabicToRoman,
  _random,
  invertKeyValueObject,
  getBackground,
  useQuery,
  queryToObject,
  getQuote,
};
