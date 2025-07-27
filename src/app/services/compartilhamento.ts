import { Injectable } from '@angular/core';
import { Relatorio } from '../models/relatorio';
import { RelatorioService } from './relatorio';
import { ConstantesService } from './constantes';

@Injectable({
  providedIn: 'root',
})
export class CompartilhamentoService {
  constructor(
    private relatorioService: RelatorioService,
    private constantesService: ConstantesService
  ) {}

  /**
   * Compartilha o relatório como texto formatado
   */
  public async compartilharRelatorioComoTexto(
    relatorio: Relatorio
  ): Promise<void> {
    const texto = this.gerarTextoRelatorio(relatorio);
    const shareData = {
      title: relatorio.titulo,
      text: texto,
    };

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch (e) {
        console.error('Erro ao compartilhar com Web Share API:', e);
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(texto);
        alert('Texto copiado para a área de transferência!');
        return;
      } catch (e) {
        console.error('Erro ao copiar para a área de transferência:', e);
      }
    }

    alert(texto);
  }

  /**
   * Gera texto do relatório com base na ordem de ConstantesService.PRODUTOS
   */
  private gerarTextoRelatorio(relatorio: Relatorio): string {
    let texto = `${relatorio.titulo}\n${this.relatorioService.formatarData(
      relatorio.data
    )}\n\n`;

    const produtosRelatorio = new Map(
      relatorio.produtos.map((p) => [p.nome, p])
    );

    for (const nomeProduto of this.constantesService.PRODUTOS) {
      const produto = produtosRelatorio.get(nomeProduto);
      if (produto) {
        texto += `${produto.nome}: ${this.relatorioService.formatarPreco(
          produto.preco
        )}\n`;
      }
    }

    return texto;
  }
}
