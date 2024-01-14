const user = require(`../models/user`);
const isUserConfigured = require(`../src/utils/is-user-registered`);

function validateCpf(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

  if (
    parseInt(cpf.charAt(9)) === digitoVerificador1 &&
    parseInt(cpf.charAt(10)) === digitoVerificador2
  ) {
    return true;
  } else {
    return false;
  }
}

async function CreateOrUpdate(user_id, pix, cpf) {
  if (!user_id || !pix || !cpf)
    throw new Error(`Missing args to createOrUpdate in setup service`);

  if(!validateCpf(cpf)) return `O cpf informado(${cpf}) não é um cpf válido.`

  if (await isUserConfigured(user_id)) {
    await user.update(user_id, pix, cpf);
  } else {
    await user.create(user_id, pix, cpf);
  }
  
  return `Sua chave pix foi configurada para ${pix}!`;
}

module.exports = {
  CreateOrUpdate,
};
