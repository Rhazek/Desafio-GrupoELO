const validarEntradaDeDados = (lancamento) => {
  if (!lancamento.cpf) return "CPF não informado, tente novamente";
  if (!lancamento.valor) return "Valor não informado, tente novamente";
  if (lancamento.valor < -2000.0)
    return "Valor não pode ser inferior a -2000,00, digite um valor válido";
  if (lancamento.valor > 15000.0)
    return "Valor não pode ser superior a 15000,00, digite um valor válido";
  if (!validaCPF(lancamento.cpf)) return "CPF inválido, digite um CPF válido";
  return null;
};

const recuperarSaldosPorConta = (lancamentos) => {
  var lancamentosPorCPF = [];
  var ListaCPF = new Set(lancamentos.map((lancamento) => lancamento.cpf));
  for (let cpf of ListaCPF) {
    const lancamentoPorCPF = recuperarSaldosPorCpf(lancamentos, cpf);
    lancamentosPorCPF.push(lancamentoPorCPF);
  }
  return lancamentosPorCPF;
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
  let CPFlancamentos = [];
  for (let i = 0; i < lancamentos.length; i++) {
    if (lancamentos[i].cpf == cpf) {
      CPFlancamentos.push(lancamentos[i]);
    }
  }

  if (CPFlancamentos.length == 0) {
    return [];
  } else if (CPFlancamentos.length == 1) {
    return [
      { cpf: CPFlancamentos[0].cpf, valor: CPFlancamentos[0].valor },
      { cpf: CPFlancamentos[0].cpf, valor: CPFlancamentos[0].valor },
    ];
  } else {
    CPFlancamentos.sort(
      (lancamentoInicial, lancamentoFinal) =>
        lancamentoInicial.valor - lancamentoFinal.valor
    );
    return [
      { cpf: cpf, valor: CPFlancamentos[0].valor },
      { cpf: cpf, valor: CPFlancamentos[CPFlancamentos.length - 1].valor },
    ];
  }
};

const recuperarMaioresSaldos = (lancamentos) => {
  let top3CPF = recuperarSaldosPorConta(lancamentos);
  top3CPF.sort(
    (lancamentoInicial, lancamentoFinal) =>
      lancamentoFinal.valor - lancamentoInicial.valor
  );
  top3CPF = top3CPF.slice(0, 3);
  return top3CPF;
};

const recuperarMaioresMedias = (lancamentos) => {
  var lancamentosCPFMedia = [];
  var ListaCPF = new Set(lancamentos.map((lancamento) => lancamento.cpf));
  for (let cpf of ListaCPF) {
    let conta = recuperarSaldosPorCpf(lancamentos, cpf);
    let quantCPFs = lancamentos.filter(
      (lancamentoPorCpf) => lancamentoPorCpf.cpf == cpf
    ).length;
    lancamentosCPFMedia.push({
      cpf: cpf,
      valor: conta.valor / quantCPFs,
    });
  }
  lancamentosCPFMedia = lancamentosCPFMedia.sort(
    (lancamentoInicial, lancamentoFinal) =>
      lancamentoFinal.valor - lancamentoInicial.valor
  );
  return lancamentosCPFMedia.slice(0, 3);
};

const recuperarSaldosPorCpf = (lancamentos, cpf) => {
  let lancamentosCPF = lancamentos.filter(
    (lancamentoPorCpf) => lancamentoPorCpf.cpf == cpf
  );
  let valor = 0;
  for (let lancamentoCpf of lancamentosCPF) {
    valor += lancamentoCpf.valor;
  }
  return { cpf: cpf, valor: valor };
};

function validaCPF(cpf) {
  var Soma = 0;
  var Resto;
  var strCPF = String(cpf).replace(/[^\d]/g, "");

  if (strCPF.length !== 11) return false;
  if (strCPF.split("").every((cpf) => cpf === strCPF[0])) return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;

  return true;
}
