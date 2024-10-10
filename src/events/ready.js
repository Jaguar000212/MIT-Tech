const { ActivityType } = require('discord.js');
const { table } = require("table");

module.exports = async (client) => {
    client.logger.log(`BOT CONNECTED`);

    const clientData = [];
    clientData.push(["Bot Name", client.user.displayName]);
    clientData.push(["Bot ID", client.user.id]);
    console.log(
        table(clientData, {
          header: {
            alignment: "center",
            content: "Client Data",
          },
          singleLine: true,
          columns: [{ width: 10 }, { width: 25 }],
        })
      );

    try {
        client.user.setActivity('over my Engineers', { type: ActivityType.Watching });
        client.logger.success(`Activity set to "${ActivityType[client.user.presence.activities[0].type]} ${client.user.presence.activities[0].name}"`);
    }
    catch (ex) {
        client.logger.error(`ready.js`, ex);
    }
    
};