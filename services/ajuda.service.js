function getHelpMessage() {
  return {
    title: "Como usar o bot do tigrinho?",
    color: "#00FFFF",
    description:
      'Bem-vindo ao Bot do Tigrinho para Discord, o seu portal para a emocionante experiência do "jogo do tigre" diretamente no seu servidor! Este bot oferece uma jornada envolvente de apostas e sorte, onde os jogadores têm a chance de ganhar dinheiro formando combinações de símbolos alinhados nas linhas de pagamento.',
    fields: [
      { name: "Geral", value: "Multiplique em até 500% sua aposta! Valor de aposta limitado a R$20,00 pois ainda está em faze inicial!" },
      {
        name: "Antes de tudo, configure",
        value:
          "Antes de começar a usar o bot e fazer suas bets, você precisa configurar sua chave pix rodando /setup < sua_chave > < cpf >, se isso não for feito, nenhum outro comando funcionara.",
      },
      {
        name: "Deposito e Balanço",
        value:
          "Para inserir valores, você pode rodar /deposit < valor desejado>, o minimo atual é de 5 e máximo de 100.\n\nPara ver o balanço da sua conta, digite /balance.",
      },
      {
        name: "Retirar o dinheiro",
        value:
          "Para retirar o dinheiro você deve dar /checkout, mas tenha em mente que pra tirar o dinheiro, você deve ter jogado pelo menos 1 vez no bot..",
      },
      {
        name: "Jogar",
        value:
          "Para jogar, digite /rodar < valor da aposta > (min: $5, max: $20), você poderá ver o resultado na hora!",
      },
      {
        name: "Aos donos",
        value:
          "O dono do servidor ganha parte do volume monetário trafegado nesse bot através de seu discord, mas ele passa pelos mesmos fluxos de cadastro e saque. Ele recebe 10% do que é obtido dos jogos feitos em seu servidor.",
      },
      {
        name: "Termos de uso",
        value: "Ao usar o bot você concorda com os termos de uso e privacidade presentes em: Termos: https://pastebin.com/raw/AxkuL5uP"
      },
      {
        name: "Privacidade",
        value: "Ao usar o bot você concorda com as políticas de privacidade presentes em https://pastebin.com/raw/WyeK1hFu"
      }
    ],
  };
}

module.exports = {
    getHelpMessage,
};