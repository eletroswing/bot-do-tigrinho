const { SlashCommandBuilder } = require("discord.js");

const setupService = require(`../../services/setup.service`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Configure a chave pix na sua conta!")
    .addStringOption((options) =>
      options
        .setName("pix")
        .setDescription("Sua chave pix vai aqui.")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("cpf")
        .setDescription("Seu cpf vai aqui.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const pix = interaction.options.getString("pix");
    const cpf = interaction.options.getString("cpf");
    
    const message = await setupService.CreateOrUpdate(interaction.user.id, pix, cpf)

    interaction.reply({
      content: message,
      ephemeral: true,
    });
  },
};
