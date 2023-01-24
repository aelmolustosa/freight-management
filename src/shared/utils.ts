export function isValidCPF(pCpf: string) {
  const cpf = pCpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfNumbersList = cpf.split("").map((el) => +el);

  const rest = (count: number) =>
    ((cpfNumbersList
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;
  return rest(10) === cpfNumbersList[9] && rest(11) === cpfNumbersList[10];
}

export function isValidCNPJ(pCNPJ: string) {
  if (pCNPJ === undefined) {
    return false;
  }

  // Esta função retira os caracteres . / - da string do cnpj, deixando apenas os números
  const strCNPJ = pCNPJ
    .replace(".", "")
    .replace(".", "")
    .replace("/", "")
    .replace("-", "");

  // Testa as sequencias que possuem todos os dígitos iguais e se o cnpj não tem 14 dígitos, retonando falso e exibindo uma msg de erro
  if (
    strCNPJ === "00000000000000" ||
    strCNPJ === "11111111111111" ||
    strCNPJ === "22222222222222" ||
    strCNPJ === "33333333333333" ||
    strCNPJ === "44444444444444" ||
    strCNPJ === "55555555555555" ||
    strCNPJ === "66666666666666" ||
    strCNPJ === "77777777777777" ||
    strCNPJ === "88888888888888" ||
    strCNPJ === "99999999999999" ||
    strCNPJ.length !== 14
  ) {
    return false;
  }

  // A variável numeros pega o bloco com os números sem o DV, a variavel digitos pega apenas os dois ultimos numeros (Digito Verificador).
  let tamanho = strCNPJ.length - 2;
  let numeros = strCNPJ.substring(0, tamanho);
  const digitos = strCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  // Os quatro blocos seguintes de funções irá reaizar a validação do CNPJ propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
  // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos;
    pos -= 1;
    // soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) {
    return false;
  }

  tamanho += 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let k = tamanho; k >= 1; k--) {
    soma += Number(numeros.charAt(tamanho - k)) * pos;
    pos -= 1;
    // soma += Number(numeros.charAt(tamanho - k)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) {
    return false;
  }

  return true;
}

export function isValidCPFCNPJ(pText: string) {
  if (pText.length === 11) {
    return isValidCPF(pText);
  }

  if (pText.length === 14) {
    return isValidCNPJ(pText);
  }

  return false;
}

export function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

export function onlyNumbers(pText: string) {
  return pText.replace(/\D/g, "");
}
