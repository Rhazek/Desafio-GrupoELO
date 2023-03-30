const validarEntradaDeDados = (lancamento) => {
  if (!lancamento.cpf) return "CPF não informado, tente novamente";
  if (!lancamento.valor) return "Valor não informado, tente novamente";
  if (lancamento.valor < -2000.0)
    return "Valor não pode ser inferior a -2000,00, digite um valor válido";
  if (lancamento.valor > 15000.0)
    return "Valor não pode ser superior a 15000,00, digite um valor válido";
  if (lancamento.cpf.length != 11) return "CPF deve conter 11 dígitos";
  if (!lancamento.cpf.match(/^[0-9]+$/))
    return "CPF deve conter apenas números";
  return null;
};

const recuperarSaldosPorConta = (lancamentos) => {
  const saldos = {};
  for (const lancamento of lancamentos) {
    if (lancamento.cpf && lancamento.valor) {
      if (!saldos[lancamento.cpf]) {
        saldos[lancamento.cpf] = lancamento.valor;
      } else {
        saldos[lancamento.cpf] += lancamento.valor;
      }
    }
  }
  return Object.entries(saldos).map(([cpf, valor]) => ({ cpf, valor }));
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
  const lancamentosCpf = lancamentos.filter(
    (lancamento) => lancamento.cpf === cpf
  );

  if (lancamentosCpf.length === 0) {
    return [];
  } else if (lancamentosCpf.length === 1) {
    return [
      { cpf: lancamentosCpf[0].cpf, valor: lancamentosCpf[0].valor },
      { cpf: lancamentosCpf[0].cpf, valor: lancamentosCpf[0].valor },
    ];
  } else {
    lancamentosCpf.sort((a, b) => a.valor - b.valor);
    return [
      { cpf: cpf, valor: lancamentosCpf[0].valor },
      { cpf: cpf, valor: lancamentosCpf[lancamentosCpf.length - 1].valor },
    ];
  }
};

const recuperarMaioresSaldos = (lancamentos) => {
  const saldos = {};
  for (const lancamento of lancamentos) {
    if (lancamento.cpf && lancamento.valor) {
      if (!saldos[lancamento.cpf]) {
        saldos[lancamento.cpf] = lancamento.valor;
      } else {
        saldos[lancamento.cpf] += lancamento.valor;
      }
    }
  }
  const topCPFs = Object.keys(saldos)
    .map((cpf) => ({ cpf, valor: saldos[cpf] }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 3);
  return topCPFs;
};

const recuperarMaioresMedias = (lancamentos) => {
  const saldos = {};

  for (const lancamento of lancamentos) {
    const cpf = lancamento.cpf;
    const valor = lancamento.valor;

    if (!saldos[cpf]) {
      saldos[cpf] = {
        saldo: 0,
        contador: 0,
      };
    }

    saldos[cpf].saldo += valor;
    saldos[cpf].contador++;
  }

  const saldosMedios = Object.keys(saldos).map((cpf) => ({
    cpf,
    valor: saldos[cpf].saldo / saldos[cpf].contador,
  }));
  saldosMedios.sort((a, b) => b.valor - a.valor);
  return saldosMedios.slice(0, 3);
};
