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

export function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
