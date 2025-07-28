import { Injectable } from '@angular/core';

// Enumeração para as categorias dos produtos
export enum Categoria {
  Frutas = 'Frutas',
  Verduras = 'Verduras',
  Legumes = 'Legumes',
  RaizesETuberculos = 'Raízes e Tubérculos',
  CebolasEAlhos = 'Cebolas e Alhos',
  TemperosEErvas = 'Temperos e Ervas',
  ProdutosProcessadosEEmbalados = 'Produtos Processados e Embalados',
}

// Interface para representar um produto com nome e categoria
export interface Produto {
  nome: string;
  categoria: Categoria;
}

@Injectable({
  providedIn: 'root',
})
export class ConstantesService {
  public readonly CHAVE_ARMAZENAMENTO = 'dados-lista-precos';
  public readonly NOME_APLICACAO = 'Lista de Preços';
  public readonly VERSAO = '1.0.0';

  // Ordem fixa das categorias
  public readonly CATEGORIAS: Categoria[] = [
    Categoria.Frutas,
    Categoria.Verduras,
    Categoria.Legumes,
    Categoria.RaizesETuberculos,
    Categoria.CebolasEAlhos,
    Categoria.TemperosEErvas,
    Categoria.ProdutosProcessadosEEmbalados,
  ];

  // Arrays privados para os produtos de cada categoria
  private readonly FRUTAS: string[] = [
    'Abacate KG',
    'Abacaxi UN',
    'Ameixa KG',
    'Caqui KG',
    'Kiwi KG',
    'Laranja CX 20KG',
    'Limão Caipira KG',
    'Limão Comum KG',
    'Limão Siciliano KG',
    'Maçã Argentina KG',
    'Maçã Fuji KG',
    'Maçã Gala KG',
    'Maçã Pink KG',
    'Maçã Verde KG',
    'Mamão Formosa KG',
    'Mamão Havaí KG',
    'Manga Espada KG',
    'Manga Palmer KG',
    'Manga Tommy KG',
    'Maracujá KG',
    'Melão KG',
    'Morango CX 4 Bandeja',
    'Nectarina KG',
    'Pera KG',
    'Pêssego KG',
    'Tangerina KG',
    'Uva Benitaka KG',
    'Uva Itália KG',
    'Uva Niágara KG',
    'Uva Ruby KG',
    'Uva Sem Semente Bandeja',
    'Uva Sem Semente Preta Bandeja',
    'Uva Sem Semente Verde Bandeja',
  ];

  private readonly VERDURAS: string[] = [
    'Acelga UN',
    'Agrião UN',
    'Alface Americana UN',
    'Alface Crespa UN',
    'Alface Lisa UN',
    'Alface Roxa UN',
    'Brócolis UN',
    'Chicória UN',
    'Couve-Flor UN',
    'Repolho Roxo UN',
    'Repolho Verde UN',
    'Rúcula UN',
  ];

  private readonly LEGUMES: string[] = [
    'Abóbora Cabotiá KG',
    'Abóbora Moranga KG',
    'Abóbora Seca KG',
    'Abóbora Verde KG',
    'Berinjela KG',
    'Chuchu CX 20KG',
    'Pepino CX 20KG',
    'Pepino Japonês CX 20KG',
    'Pimenta Dedo de Moça KG',
    'Pimentão Amarelo KG',
    'Pimentão Verde KG',
    'Pimentão Vermelho KG',
    'Tomate Cereja KG',
    'Tomate G CX 20KG',
    'Tomate M CX 20KG',
    'Tomate Saladette CX 20KG',
    'Vagem KG',
  ];

  private readonly RAIZES_E_TUBERCULOS: string[] = [
    'Batata Escovada SC 25KG',
    'Batata Florão SC 25KG',
    'Batata Lavada SC 25KG',
    'Batata M SC 25KG',
    'Batata Roxa SC 25KG',
    'Batata-Doce Boa CX 20KG',
    'Batata-Doce G CX 20KG',
    'Batata-Doce P CX 20KG',
    'Beterraba G CX 20KG',
    'Beterraba M CX 20KG',
    'Beterraba P CX 20KG',
    'Cenoura Boa CX 20KG',
    'Cenoura G CX 20KG',
    'Cenoura M CX 20KG',
    'Cenoura Toco CX 20KG',
    'Gengibre KG',
    'Nabo KG',
    'Rabanete KG',
  ];

  private readonly CEBOLAS_E_ALHOS: string[] = [
    'Cebola C1 SC 20KG',
    'Cebola C2 SC 20KG',
    'Cebola C3 SC 20KG',
    'Cebola C4 SC 20KG',
    'Cebola Fraca SC 20KG',
    'Cebola Roxa SC 20KG',
    'Alho Poró UN',
  ];

  private readonly TEMPEROS_E_ERVAS: string[] = [
    'Alecrim UN',
    'Cebolinha UN',
    'Hortelã UN',
    'Manjericão UN',
    'Salsa UN',
  ];

  private readonly PRODUTOS_PROCESSADOS_E_EMBALADOS: string[] = [
    'Batata Chips 300g',
    'Batata Palha KG',
    'Batata Palha Fritura SC 25KG',
    'Feijão Preto SC 30KG',
    'Feijão Vermelho SC 30KG',
    'Ovos Bandeja CX',
    'Ovos Embalados CX',
  ];

  // Array público de produtos com suas categorias
  public readonly PRODUTOS: Produto[] = [
    ...this.FRUTAS.map((nome) => ({ nome, categoria: Categoria.Frutas })),
    ...this.VERDURAS.map((nome) => ({ nome, categoria: Categoria.Verduras })),
    ...this.LEGUMES.map((nome) => ({ nome, categoria: Categoria.Legumes })),
    ...this.RAIZES_E_TUBERCULOS.map((nome) => ({
      nome,
      categoria: Categoria.RaizesETuberculos,
    })),
    ...this.CEBOLAS_E_ALHOS.map((nome) => ({
      nome,
      categoria: Categoria.CebolasEAlhos,
    })),
    ...this.TEMPEROS_E_ERVAS.map((nome) => ({
      nome,
      categoria: Categoria.TemperosEErvas,
    })),
    ...this.PRODUTOS_PROCESSADOS_E_EMBALADOS.map((nome) => ({
      nome,
      categoria: Categoria.ProdutosProcessadosEEmbalados,
    })),
  ];

  /**
   * Gera um ID único para um produto baseado no nome
   */
  public gerarIdProduto(nomeProduto: string): string {
    return nomeProduto
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
