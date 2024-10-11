const Bot = require('./src/bot');
require('dotenv').config();

const client = new Bot();
console.clear();
client.loadEvents('./src/events');
client.loadCommands('./src/commands');

client.login(process.env.TOKEN)
    .then(() => client.logger.log('Bot has successfully logged in.'));
