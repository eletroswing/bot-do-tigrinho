function Run() {
  const simbols = [
    "7",
    "cherry",
    "bar",
    "lemon",
    "orange",
    "grape",
    "bell",
    "plum",
  ];
  const result = [];

  for (let i = 0; i < 3; i++) {
    const line = [];
    for (let j = 0; j < 3; j++) {
      const random = Math.floor(Math.random() * simbols.length);
      line.push(simbols[random]);
    }
    result.push(line);
  }

  return result;
}

const Prizes = {
  7: 500,
  cherry: 300,
  bar: 200,
  lemon: 100,
  orange: 90,
  grape: 40,
  bell: 20,
  plum: 10,
};

function calculatePrize(result) {
  for (const line of result) {
    const simbol = line[0];
    if (line.every((valor) => valor === simbol) && Prizes[simbol]) {
      // Retorna o valor associado ao simbol da tabela de prêmios
      return Prizes[simbol];
    }
  }

  for (let j = 0; j < 3; j++) {
    const simbol = result[0][j];
    if (
      result[0][j] === result[1][j] &&
      result[1][j] === result[2][j] &&
      Prizes[simbol]
    ) {
      return Prizes[simbol];
    }
  }

  const simbolDiagonalPrincipal = result[0][0];
  const simbolDiagonalSecundaria = result[0][2];
  if (
    result[0][0] === result[1][1] &&
    result[1][1] === result[2][2] &&
    Prizes[simbolDiagonalPrincipal]
  ) {
    return Prizes[simbolDiagonalPrincipal];
  }
  if (
    result[0][2] === result[1][1] &&
    result[1][1] === result[2][0] &&
    Prizes[simbolDiagonalSecundaria]
  ) {
    return Prizes[simbolDiagonalSecundaria];
  }

  return 0; // Retorna 0 se nenhum prêmio for ganho
}

function verifyPrize(result, value) {
  const valuePrize = calculatePrize(result);

  if (valuePrize > 0) {
    const prize = value * (valuePrize / 100);

    return { prize: prize, win: true };
  }

  return { prize: 0, win: false }; // Retorna 0 se nenhum prêmio for ganho
}

const emojiReference = {
    7: `:seven:`,
    cherry: `:cherries:`,
    bar: `:chocolate_bar:`,
    lemon: `:lemon:`,
    orange: `:orange_heart:`,
    grape: `:grapes:`,
    bell: `:bell:`,
    plum: `:feather:`,
  };
  
module.exports = {
    verifyPrize,
    Run,
    emojiReference
}