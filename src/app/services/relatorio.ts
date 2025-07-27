import { Injectable } from '@angular/core';
import { Relatorio, ProdutoComPreco } from '../models/relatorio';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  /**
   * Gera um relatório baseado nos dados fornecidos
   */
  public gerarRelatorio(
    titulo: string,
    precos: { [nome: string]: number }
  ): Relatorio | null {
    const produtosComPreco = this.extrairProdutosComPreco(precos);

    if (produtosComPreco.length === 0) {
      return null;
    }

    return {
      titulo: titulo || 'Lista de Preços',
      data: new Date(),
      produtos: produtosComPreco,
    };
  }

  /**
   * Extrai produtos que possuem preços válidos
   */
  private extrairProdutosComPreco(precos: {
    [nome: string]: number;
  }): ProdutoComPreco[] {
    return Object.entries(precos)
      .filter(([_, preco]) => preco && preco > 0)
      .map(([nome, preco]) => ({ nome, preco }))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }

  /**
   * Formata preço para exibição em reais
   */
  public formatarPreco(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  /**
   * Formata data para exibição em português
   */
  public formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
