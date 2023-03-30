const validarEntradaDeDados = (lancamento) => {
   if(!lancamento.cpf) return 'CPF não informado, tente novamente'
   if(!lancamento.valor) return 'Valor não informado, tente novamente'
   if(lancamento.valor < -2000.00) return 'Valor não pode ser inferior a -2000,00, digite um valor válido'
   if(lancamento.valor > 15000.00) return 'Valor não pode ser superior a 15000,00, digite um valor válido'
   if(lancamento.cpf.length != 11) return 'CPF deve conter 11 dígitos'
   if(!lancamento.cpf.match(/^[0-9]+$/)) return 'CPF deve conter apenas números'
   return null
}

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
}

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
  const saldos = {}; // objeto para armazenar os saldos dos CPFs

  // calcula o saldo para cada CPF
  lancamentos.forEach((lancamento) => {
    if (!saldos[lancamento.cpf]) {
      saldos[lancamento.cpf] = 0; // inicializa o saldo com 0 se o CPF ainda não estiver no objeto
    }
    saldos[lancamento.cpf] += lancamento.valor; // adiciona o valor do lançamento ao saldo correspondente
  });

  const topCPFs = Object.keys(saldos) // obtém as chaves do objeto (os CPFs)
    .map((cpf) => ({ cpf, saldo: saldos[cpf] })) // mapeia cada CPF para um objeto com o CPF e o saldo
    .sort((a, b) => b.saldo - a.saldo) // ordena os objetos com base no saldo (do maior para o menor)
    .slice(0, 3); // pega apenas os 3 primeiros objetos (os CPFs com maiores saldos)

  return topCPFs.length > 0 ? topCPFs : []; // retorna o array com os 3 CPFs com maiores saldos ou um array vazio se não houver registros correspondentes

}

const recuperarMaioresMedias = (lancamentos) => {
    return []
}