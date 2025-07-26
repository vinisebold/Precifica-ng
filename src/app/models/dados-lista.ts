export interface DadosLista {
  titulo: string;
  precos: { [nomeProduto: string]: number };
  ultimaAtualizacao?: string;
}
