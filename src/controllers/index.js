const simularEmprestimo = async (req, res) => {
  const validezDados = dadosFormularioSaoValidos(req.body);
  if (validezDados.valido) {
    const { body } = req;
    const { valorRequerido, mesesParaPagar, UF } = body;

    const taxaJuros = getJurosUF(UF);
    const taxajurosPorcentagem = taxaJuros * 100;
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
        `${diaPagamento <= 9 ? "0" + diaPagamento : diaPagamento}/${mesPagamento <= 9 ? "0" + mesPagamento : mesPagamento
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
        ...body,
        UF,
        valorRequerido: formatarNumeroDinheiro(valorRequerido),
        mesesParaPagar,
        taxaJuros: formatarNumeroVirgulaFlutuante(formatarCasasDecimais(taxajurosPorcentagem)) + "%",
        valorParcela: formatarNumeroDinheiro(valorParcela),
        dataParcelas,
        valorTotal: formatarNumeroDinheiro(total),
      },
      mensagem: "simulacao ok",
    });
  } else {
    res.status(400).json({
      mensagem: validezDados.msg,
    });
  }
};

const jurosPorEstado = {
  MG: 0.01,
  SP: 0.008,
  RJ: 0.009,
  ES: 0.0111,
};

const jurosOutrosEstados = 0.01;

const getJurosUF = (UF) => {
  if (jurosPorEstado.hasOwnProperty(UF)) return jurosPorEstado[UF];
  else return jurosOutrosEstados;
};

const dadosFormularioSaoValidos = (dados) => {
  const { CPF, mesesParaPagar, valorRequerido } = dados;
  const objetoDadosInvalidos = (msg) => ({
    valido: false,
    msg,
  });
  if (CPF.length < 9) return objetoDadosInvalidos("CPF inválido.");

  if (mesesParaPagar > 30 * 12) return objetoDadosInvalidos("O prazo máximo para pagamento é 30 anos (360 meses).");

  if (mesesParaPagar <= 0) return objetoDadosInvalidos("O empréstimo deve ser pago em no mínimo 1 mês.");

  if (valorRequerido < 50000) return objetoDadosInvalidos("O valor requerido mínimo é R$ 50000,00");

  return { valido: true };
};

const formatarNumeroDinheiro = (numero) => {
  return "R$ " + formatarCasasDecimais(numero).replace(".", ",");
};

const formatarNumeroVirgulaFlutuante = (numero) => {
  return numero.toString().replace(".", ",");
};

const formatarCasasDecimais = (numero) => {
  return parseFloat(numero).toFixed(2);
};

const fs = require("fs");

const efetivarEmprestimo = async (req, res) => {
  const { body } = req;
  try {
    fs.exists("./dados.json", function (exists) {
      if (exists) {
        fs.readFile("./dados.json", "utf8", function (err, data) {
          if (err) {
            throw "Erro ao ler arquivo dados.json.";
          }

          let jsonAntigo = JSON.parse(data);
          jsonAntigo.dados.push(body);
          jsonAntigo = JSON.stringify(jsonAntigo);

          fs.writeFile("./dados.json", jsonAntigo, (err) => {
            if (err) throw "Erro ao escrever arquivo dados.json.";
          });
        });
      } else {
        let novoJson = JSON.stringify({ dados: [body] });
        fs.writeFile("./dados.json", novoJson, (err) => {
          if (err) throw "Erro ao escrever arquivo dados.json.";
        });
      }
    });

    res.status(200).json({
      mensagem: "Empréstimo solicitado.",
    });
  } catch (err) {
    res.status(400).json({
      mensagem: "Erro ao solicitar empréstimo.",
      erro: err,
    });
  }
};

const getEmprestimosSolicitados = async (req, res) => {
  try {
    fs.exists("./dados.json", function (exists) {
      if (exists) {
        fs.readFile("./dados.json", "utf8", function (err, data) {
          if (err) {
            throw "Erro ao ler arquivo dados.json.";
          }

          const dados = JSON.parse(data);
          res.status(200).json({
            mensagem: "Dados disponibilizados.",
            ...dados,
          });
        });
      } else {
        throw "Não há dados armazenados.";
      }
    });
  } catch (err) {
    res.status(400).json({
      mensagem: "Erro ao recuperar dados.",
      erro: err,
    });
  }
};

module.exports = {
  simularEmprestimo,
  efetivarEmprestimo,
  getEmprestimosSolicitados,
};
