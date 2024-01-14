const { SlashCommandBuilder, EmbedBuilder  } = require("discord.js");
const { getHelpMessage } = require('../../services/ajuda.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Veja como usar o bot."),

  async execute(interaction) {
    const message = getHelpMessage();

    const embed = new EmbedBuilder()
      .setTitle(message.title)
      .setColor(message.color)
      .setDescription(message.description)
      .addFields(...message.fields);

    interaction.reply({ embeds: [embed], ephemeral: true});
  },
};