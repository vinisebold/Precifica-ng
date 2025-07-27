export interface Relatorio {
  titulo: string;
  data: Date;
  produtos: ProdutoComPreco[];
}

export interface ProdutoComPreco {
  nome: string;
  preco: number;
}
