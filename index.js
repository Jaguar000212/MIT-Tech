const Bot = require('./src/bot');
require('dotenv').config();

const client = new Bot();
client.loadEvents('./src/events');
client.loadCommands('./src/commands');

client.login(process.env.TOKEN);
