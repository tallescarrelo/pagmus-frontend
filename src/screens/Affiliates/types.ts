export interface IAffiliate {
    produto: string;
    dataPedido: string;
    dataDoStatus: string;
    valorDaComissão: string;
    tipoDecomissao: string;
    status: 'aprovado' | 'reprovado' | 'pendente';
    acoes: string;
  }
  