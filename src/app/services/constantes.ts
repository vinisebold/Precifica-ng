import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantesService {
  public readonly CHAVE_ARMAZENAMENTO = 'dados-lista-precos';
  public readonly NOME_APLICACAO = 'Lista de Preços';
  public readonly VERSAO = '1.0.0';

  public readonly PRODUTOS_CATEGORIZADOS: { categoria: string, produtos: string[] }[] = [
    { categoria: 'Cebolas', produtos: [
      'Cebola CX 3',
      'Cebola CX 2',
      'Cebola VC 1',
      'Cebola fraca',
      'Cebola roxa',
    ] },
    { categoria: 'Batatas', produtos: [
      'Batata lavada',
      'Batata escovada',
      'Batata média',
      'Batata para rechear',
      'Batata roxa',
      'Batata para fritura',
      'Batata palha',
      'Batata chips',
    ] },
    { categoria: 'Alho', produtos: [
      'Alho CX 10kg',
    ] },
    { categoria: 'Ovos', produtos: [
      'Ovos embalados',
      'Ovos bandeja',
    ] },
    { categoria: 'Feijões', produtos: [
      'Feijão preto',
      'Feijão vermelho',
    ] },
    { categoria: 'Raízes e Tubérculos', produtos: [
      'Cenoura boa',
      'Cenoura G',
      'Beterraba G',
      'Beterraba boa',
      'Beterraba miúda',
      'Batata-doce G',
      'Batata-doce boa',
      'Batata-doce P',
      'Gengibre',
    ] },
    { categoria: 'Abóboras', produtos: [
      'Abóbora seca',
      'Abóbora verde',
    ] },
    { categoria: 'Tomates', produtos: [
      'Tomate G',
      'Tomate médio',
      'Tomate Saladette',
      'Tomate cereja',
    ] },
    { categoria: 'Outros Vegetais', produtos: [
      'Pepino',
      'Pepino japonês',
      'Vagem',
      'Chuchu',
    ] },
    { categoria: 'Folhas Verdes e Ervas', produtos: [
      'Alface crespa',
      'Alface americana',
      'Rúcula',
      'Agrião',
      'Cebolinha',
      'Salsa',
    ] },
    { categoria: 'Repolhos e Similares', produtos: [
      'Repolho verde',
      'Repolho roxo',
      'Couve-flor',
      'Brócolis',
    ] },
    { categoria: 'Frutas', produtos: [
      'Manga',
      'Limão',
      'Laranja',
      'Melão',
      'Abacaxi',
    ] },
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
