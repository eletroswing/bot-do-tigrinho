const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

const userModel = require(`../../models/user`);

const isUserConfigured = require(`../utils/is-user-registered`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription(
      "Faça um depósito(pode levar até um minuto para cair na sua conta)!"
    )
    .addNumberOption((options) =>
      options
        .setName("value")
        .setDescription("O valor do seu depósito (min 5 max 100)")
        .setMinValue(5.0)
        .setMaxValue(100.0)
        .setRequired(true)
    ),

  async execute(interaction, pix) {
    const deposit_value = interaction.options.getNumber("value");
    if (await isUserConfigured(interaction.user.id)) {
      const user = interaction.user;
      const currentUser = await userModel.getByDiscordId(interaction.user.id);

      const pixCode = await pix.create({
        id: interaction.user.id,
        description: `Déposito de R$${deposit_value.toFixed(
          2
        )} no bot do tigrinho.`,
        name: interaction.user.tag,
        taxId: currentUser.rows[0].cpf,
        value: deposit_value.toFixed(2),
        metadata: {
          user_id: interaction.user.id,
          value: deposit_value.toFixed(2)
        },
      });

      interaction.reply({
        content: `O Código pix foi enviado a sua DM.`,
        ephemeral: true,
      });

      const sfbuff = new Buffer.from(pixCode.encodedImage, "base64");
      const sfattach = new AttachmentBuilder(sfbuff, { name: "output.png" });
      
      await user.send(`Pix para carregar R$${deposit_value.toFixed(2)} no bot do tigrinho! Lembre-se, ele expira em 5 minutos. Pode demorar até 1 minuto para confirmarmos o seu depósito.`);
      await user.send({ files: [sfattach] });
      await user.send(pixCode.payload);

    } else {
      interaction.reply({
        content: `Ops, parece que você ainda não configurou seu pix! Digit /setup e configure agora.`,
        ephemeral: true,
      });
    }
  },
};
