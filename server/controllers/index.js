const jurosPorEstado = {
	MG: 0.01,
	SP: 0.008,
	RJ: 0.009,
	ES: 0.0111
}

const jurosOutrosEstados = 0.01;

const simularEmprestimo = async ( req, res ) => {
  if (dadosFormularioSaoValidos(req)) {
    const { valorRequerido, mesesParaPagar } = req.body;
    const taxaJuros = 0.01;
    const taxajurosPorcentagem = formatarNumeroVirgulaFlutuante(taxaJuros * 100) + '%';
    const total = (valorRequerido * (1 + taxaJuros) ** mesesParaPagar).toFixed(2);
    const valorParcela = (total / mesesParaPagar).toFixed(2);

    const dataHoje = new Date();
    const dataParcelas = [];

    // Apenas para evitar dias que nao estejam presentes em todos os meses
		const diaPagamento = dataHoje.getDate() <= 27 ? dataHoje.getDate() + 1 : 28;
		
    // Comecara a pagar no proximo mes
		let mesPagamento = dataHoje.getMonth() + 1 + 1;
		
		let anoPagamento = dataHoje.getFullYear();
		
    for (indiceParcela = 0; indiceParcela < mesesParaPagar; indiceParcela++) {
      dataParcelas.push(
        `${diaPagamento <= 9 ? "0" + diaPagamento : diaPagamento}/${
          mesPagamento <= 9 ? "0" + mesPagamento : mesPagamento
        }/${anoPagamento}`,
      );

      mesPagamento = mesPagamento + 1;
      if (mesPagamento == 13) {
        mesPagamento = 1;
        anoPagamento = anoPagamento + 1;
      }
    }

    res.status(200).json({
      data: {
        valorRequerido: formatarNumeroDinheiro(valorRequerido),
        mesesParaPagar,
        taxaJuros: taxajurosPorcentagem,
        valorParcela: formatarNumeroDinheiro(valorParcela),
        dataParcelas,
        total: formatarNumeroDinheiro(total),
      },
      message: "simulacao ok",
    });
  } else {
    res.status(400).json({
      message: "Dados inválidos",
    });
  }
};

let dadosFormularioSaoValidos = (dados) => {
  return true;
};

const formatarNumeroDinheiro = (numero) => {
  return "R$" + parseFloat(numero).toFixed(2).replace(".", ",");
};

const formatarNumeroVirgulaFlutuante = (numero) => {
  return numero.toString().replace(".", ",");
};

const efetivarEmprestimo = async (req, res) => {
  res.status(200).json({
    message: "emprestimo efetivado",
  });
};

module.exports = {
  simularEmprestimo,
  efetivarEmprestimo,
};
