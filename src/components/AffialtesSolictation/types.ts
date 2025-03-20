export interface IAffiliate {
    afiliado: string;
    email: string;
    produto: string;
    dataDoPedido: string;
    dataDoStatus: string;
    status: 'aprovado' | 'reprovado' | 'pendente';
    premiações: string;
    acoes: 'Reprovar agora' | 'Aprovar agora';
  }
  