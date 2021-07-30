const prefix = process.env.PREFIX || '!';
const token = process.env.TOKEN || '';
const masterId = process.env.MASTER_ID || '';

module.exports = {
  prefix,
  token,
  masterId,
};
