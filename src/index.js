const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.js');
const fs = require('fs');

// get all the commands
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(__dirname + '/commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// ready prompt
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// handling message
client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  if (command.args && !args.length) {
    let reply = `T'as oublié les arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nEssaie plutôt comme ça: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Oopsi 🤦‍♂️, j'arrive pas à executer cette commande ! sorry");
  }
});

client.login(token);
