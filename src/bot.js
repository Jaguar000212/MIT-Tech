const { Client, IntentsBitField, Collection, REST, Routes } = require('discord.js');
const path = require("path");
const { table } = require("table");

const { recursiveReadDirSync } = require("./helpers/utils");

module.exports = class Bot extends Client {
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.MessageContent
            ]
        });

        this.logger = require("./helpers/Logger");
        this.commands = new Collection();
    }

    /**
     * Load all events from the specified directory
     * @param {string} directory directory containing the event files
     */
    loadEvents(directory) {
        let success = 0;
        let failed = 0;
        const clientEvents = [];

        recursiveReadDirSync(directory).forEach((filePath) => {
            const file = path.basename(filePath);
            try {
                const eventName = path.basename(file, ".js");
                const event = require(filePath);

                this.on(eventName, event.bind(null, this));
                clientEvents.push([file, "✓"]);

                delete require.cache[require.resolve(filePath)];
                success += 1;
            } catch (ex) {
                failed += 1;
                this.logger.error(`loadEvent - ${file}`, ex);
            }
        });

        console.log(
            table(clientEvents, {
                header: {
                    alignment: "center",
                    content: "Client Events",
                },
                singleLine: true,
                columns: [{ width: 25 }, { width: 5, alignment: "center" }],
            })
        );

        this.logger.log(`Loaded ${success + failed} events. Success (${success}) Failed (${failed})`);
    }

    loadCommands(directory) {
        let success = 0;
        let failed = 0;
        const clientCommands = [];
        const commands = [];

        recursiveReadDirSync(directory).forEach((filePath) => {
            const file = path.basename(filePath);
            try {
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                    this.commands.set(command.data.name, command);
                    clientCommands.push([file, "✓"]);
                    success += 1;
                } else {
                    clientCommands.push([file, "✗"]);
                    failed += 1;
                    this.logger.warn(`loadCommand - ${file}`, "The command is missing a required 'data' or 'execute' property.");
                }
            } catch (ex) {
                failed += 1;
                this.logger.error(`loadCommand - ${file}`, ex);
            }
        });

        console.log(
            table(clientCommands, {
                header: {
                    alignment: "center",
                    content: "Client Commands",
                },
                singleLine: true,
                columns: [{ width: 25 }, { width: 5, alignment: "center" }],
            })
        );

        this.logger.log(`Loaded ${success + failed} commands. Success (${success}) Failed (${failed})`);
        const rest = new REST().setToken(process.env.TOKEN);
        
        (async () => {
            try {
                this.logger.log(`Started refreshing ${commands.length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    { body: commands },
                );
                this.logger.success(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                
                this.logger.error(error);
            }
        })();
    }
    
}
