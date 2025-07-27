import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantesService {
  public readonly CHAVE_ARMAZENAMENTO = 'dados-lista-precos';
  public readonly NOME_APLICACAO = 'Lista de Preços';
  public readonly VERSAO = '1.0.0';

  public readonly PRODUTOS: string[] = [
'Abacaxi',
    'Abóbora seca',
    'Abóbora verde',
    'Agrião',
    'Alface americana',
    'Alface crespa',
    'Alho CX 10kg',
    'Batata chips',
    'Batata escovada',
    'Batata lavada',
    'Batata média',
    'Batata palha',
    'Batata para fritura',
    'Batata para rechear',
    'Batata roxa',
    'Batata-doce boa',
    'Batata-doce G',
    'Batata-doce P',
    'Berinjela',
    'Beterraba boa',
    'Beterraba G',
    'Beterraba miúda',
    'Brócolis',
    'Cebola CX 2',
    'Cebola CX 3',
    'Cebola fraca',
    'Cebola roxa',
    'Cebola VC 1',
    'Cebolinha',
    'Cenoura boa',
    'Cenoura G',
    'Chuchu',
    'Couve-flor',
    'Feijão preto',
    'Feijão vermelho',
    'Gengibre',
    'Laranja',
    'Limão',
    'Manga',
    'Melão',
    'Ovos bandeja',
    'Ovos embalados',
    'Pepino',
    'Pepino japonês',
    'Repolho roxo',
    'Repolho verde',
    'Rúcula',
    'Salsa',
    'Tomate cereja',
    'Tomate G',
    'Tomate médio',
    'Tomate Saladette',
    'Vagem'
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
