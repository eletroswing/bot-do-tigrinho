const { SlashCommandBuilder } = require("discord.js");
const { OPERATION_TYPE } = require("easy-pix");

const payment = require(`../../models/payment`);
const user = require(`../../models/user`);
const game = require(`../../models/game`);
const isUserConfigured = require(`../utils/is-user-registered`);

function identfyPixType(input) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const regexTelefone = /^\d{2}\s?\d{4,5}-?\d{4}$/;

  const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

  if (regexEmail.test(input)) {
    return `EMAIL`;
  } else if (regexTelefone.test(input)) {
    return `PHONE`;
  } else if (regexCPF.test(input)) {
    return `CPF`;
  } else if (regexCNPJ.test(input)) {
    return `CNPJ`;
  } else {
    return `EVP`;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkout")
    .setDescription("Retire seu dinheiro agora!"),

  async execute(interaction, pix) {
    if (await isUserConfigured(interaction.user.id)) {
      const games = await game.getAlllByDiscordId(interaction.user.id);
      if (games.rows.length > 0) {
        const old_balance = await payment.getBalanceFromUserByDiscordId(
          interaction.user.id
        );
        if (old_balance.rows[0].saldo == 0 || !old_balance.rows[0].saldo)
          return interaction.reply({
            content: `Sua conta já está vazia!`,
            ephemeral: true,
          });
        const currentUser = await user.getByDiscordId(interaction.user.id);
        const pixType = identfyPixType(currentUser.rows[0].pix);

        try {
          await pix.transfer({
            description: `Checkout jogo do tigrinho`,
            operationType: OPERATION_TYPE.PIX,
            pixAddressKey: currentUser.rows[0].pix,
            pixAddressKeyType: pixType,
            value: old_balance.rows[0].saldo.toFixed(2),
          });
          
          await payment.create(
            interaction.user.id,
            old_balance.rows[0].saldo,
            `CHECKOUT`
          );
          interaction.reply({
            content: `A eh sim! Você acaba de mover R$ ${old_balance.rows[0].saldo.toFixed(
              2
            )}, e seu saldo atual é de R$ 0,00.`,
            ephemeral: true,
          });
        } catch (e) {
          console.log(e);
          interaction.reply({
            content: `Houve um erro ao transferir. Se necessário entre em contato com o email presente em nossos termos de uso.`,
            ephemeral: true,
          });
        }
      } else {
        interaction.reply({
          content: `Opa! Parece que você não realizou nenhum jogo antes de tentar retirar o dinheiro! Que tal jogar um pouco?.`,
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({
        content: `Ops, parece que você ainda não configurou seu pix! Digit /setup e configure agora.`,
        ephemeral: true,
      });
    }
  },
};
