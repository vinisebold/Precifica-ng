import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {
  public readonly CHAVE_ARMAZENAMENTO = 'dados-lista-precos';
  public readonly NOME_APLICACAO = 'Lista de Preços';
  public readonly VERSAO = '1.0.0';
  
  public readonly PRODUTOS: string[] = [
    'Cebola CX 3',
    'Cebola CX 2',
    'Cebola VC 1',
    'Cebola fraca',
    'Cebola roxa',
    'Batata lavada',
    'Batata escovada',
    'Batata média',
    'Batata para rechear',
    'Batata roxa',
    'Batata para fritura',
    'Batata palha',
    'Batata chips',
    'Alho CX 10kg',
    'Ovos embalados',
    'Ovos bandeja',
    'Feijão preto',
    'Feijão vermelho',
    'Cenoura boa',
    'Cenoura G',
    'Beterraba G',
    'Beterraba boa',
    'Beterraba miúda',
    'Abóbora seca',
    'Batata-doce G',
    'Batata-doce boa',
    'Batata-doce P',
    'Tomate G',
    'Tomate médio',
    'Tomate Saladette',
    'Tomate cereja',
    'Pepino',
    'Vagem',
    'Abóbora verde',
    'Pepino japonês',
    'Chuchu',
    'Alface crespa',
    'Alface americana',
    'Rúcula',
    'Agrião',
    'Cebolinha',
    'Salsa',
    'Repolho verde',
    'Repolho roxo',
    'Couve-flor',
    'Brócolis',
    'Manga',
    'Limão',
    'Laranja',
    'Melão',
    'Abacaxi',
    'Gengibre'
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