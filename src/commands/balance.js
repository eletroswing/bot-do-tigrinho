const { SlashCommandBuilder } = require("discord.js");

const payment = require(`../../models/payment`);
const isUserConfigured = require(`../utils/is-user-registered`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Veja seu balanço geral!"),

  async execute(interaction) {
    if(await isUserConfigured(interaction.user.id)) {
        const balance = await payment.getBalanceFromUserByDiscordId(interaction.user.id);
        if(balance.rows[0]){
          interaction.reply({content: `Seu balanço é de: R$ ${balance.rows[0].saldo.toFixed(2)}.`, ephemeral: true})
        }else {
          interaction.reply({content: `Seu balanço é de: R$ 0,00.`, ephemeral: true})
        }
    } else {
        interaction.reply({content: `Ops, parece que você ainda não configurou seu pix! Digit /setup e configure agora.`, ephemeral: true})
    }
  },
};