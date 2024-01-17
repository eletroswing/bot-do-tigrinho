const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const payment = require(`../../models/payment`);
const game = require(`../../models/game`);
const fortuneTiger = require(`./../utils/fortune-tiger`);
const isUserConfigured = require(`../utils/is-user-registered`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rodar")
    .setDescription("Gire agora a roleta e veja sua sorte!")
    .addNumberOption((options) =>
      options
        .setName("valor")
        .setDescription("O valor da sua aposta(min 5 max 20)")
        .setMinValue(5)
        .setMaxValue(20)
        .setRequired(true)
    ),

  async execute(interaction) {
    const betValue = interaction.options.getNumber("valor");
    if (await isUserConfigured(interaction.user.id)) {
      const balance = await payment.getBalanceFromUserByDiscordId(interaction.user.id);      
      if(betValue > balance.rows[0].saldo || !balance.rows[0]) return interaction.reply({content: `Você não tem saldo pra executar com esse valor!`, ephemeral: true});
      const board = fortuneTiger.Run();
      const prize = fortuneTiger.verifyPrize(board, betValue);

      await game.create(interaction.user.id, betValue, prize.win, prize.prize);
      
      const convertedResult = [];

      for (let i = 0; i < board.length; i++) {
        const line = [];
        for (let j = 0; j < board[i].length; j++) {
          const symbol = board[i][j];
          const emoji = fortuneTiger.emojiReference[symbol];
          line.push(emoji);
        }
        convertedResult.push(line);
      }

      const line1 = convertedResult[0].join(` `).toString();
      const line2 = convertedResult[1].join(` `).toString();
      const line3 = convertedResult[2].join(` `).toString();

      const desc = prize.win ? `PARABÉNS ${interaction.user.tag}!!! VOCÊ LEVOU R$${prize.prize.toFixed(2)}.`: `Que pena, ${interaction.user.tag}!!! Não foi dessa vez.`;

      const embed = new EmbedBuilder()
        .setTitle("Roda da fortuna!")
        .setColor("#00FFFF")
        .setDescription(
          desc
        )
        .addFields(
          { name: "‎ ", value: line1},
          { name: "‎ ", value: line2 },
          { name: "‎ ", value: line3 },
        );

      interaction.reply({ embeds: [embed]});

      if(prize.win){
        await payment.create(interaction.user.id, prize.prize - betValue, `EARNING`);
        await payment.create(`513374445121830933`, (prize.prize - betValue) * -1, `DEPOSIT`);  //HOUSE
      } else {
        const house_value = betValue * 0.9;
        const server_owner_value = betValue * 0.1;
        await payment.create(`513374445121830933`, house_value, `DEPOSIT`); //HOUSE
        await payment.create(interaction.guild.ownerId, server_owner_value, `DEPOSIT`);
        await payment.create(interaction.user.id, betValue * -1, `DEPOSIT`);
      };

    } else {
      interaction.reply({
        content: `Ops, parece que você ainda não configurou seu pix! Digit /setup e configure agora.`,
        ephemeral: true,
      });
    }
  },
};
