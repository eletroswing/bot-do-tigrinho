const dotenv = require("dotenv");
dotenv.config();

const Logger = require("./../infra/logger");
const payment = require(`../models/payment`);

const path = require("path");
const fs = require("fs");

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { EasyPix } = require("easy-pix");

const TOKEN = process.env.TOKEN;

const deploy = require("./utils/deploy-commands");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();


const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  try {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      Logger.log(
        `The command in path is broken (missing "data" or "execute"): ${filePath}`
      );
    }
  } catch (error) {
    Logger.error(`Error loading command file: ${file}`, error);
  }
}

const Pix = new EasyPix({apiKey: process.env.ASAAS_API_KEY, useSandbox: false});

Pix.onPaid(async (id, metadata) => {
  await payment.create(metadata.user_id, metadata.value,`DEPOSIT`);
  await payment.create(metadata.user_id, -1.99,`HOUSE`);

  const user = await client.users.fetch(metadata.user_id).catch(() => null);

  if (!user) return console.log("User not found");

  await user.send(`Acabamos de confirmar seu depósito de R$${metadata.value}.`).catch(() => {
      console.log("User has DMs closed or has no mutual servers with the bot");
  });
});

Pix.onDue(async (id, metadata) => {
  const user = await client.users.fetch(metadata.user_id).catch(() => null);

  if (!user) return console.log("User not found");

  await user.send(`O seu código de depósito de R$${metadata.value} expirou.`).catch(() => {
      console.log("User has DMs closed or has no mutual servers with the bot");
  });
});

client.once(Events.ClientReady, async (c) => {
  try {
    await deploy();
    Logger.log(`Bot logged in as: ${c.user.tag}`);
  } catch (error) {
    Logger.error("Error deploying commands", error);
  }
});

client.login(TOKEN);

client.on(Events.InteractionCreate, execute);

async function execute(interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    Logger.error("Command not found.");
    return;
  }

  try {
    await command.execute(interaction, Pix);
  } catch (error) {
    Logger.error("Failed to execute command:", error);
    await interaction.reply("Failed to execute this command");
  }
}
