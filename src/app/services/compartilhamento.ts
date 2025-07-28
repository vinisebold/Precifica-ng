import { Injectable } from '@angular/core';
import { Relatorio } from '../models/relatorio';
import { RelatorioService } from './relatorio';
import { ConstantesService, Categoria, Produto } from './constantes';

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
   * Gera texto do relatório com produtos agrupados por categoria, seguindo a ordem de ConstantesService.PRODUTOS
   */
  private gerarTextoRelatorio(relatorio: Relatorio): string {
    let texto = `${relatorio.titulo}\n${this.relatorioService.formatarData(
      relatorio.data
    )}\n\n`;

    const produtosRelatorio = new Map(
      relatorio.produtos.map((p) => [p.nome, p])
    );

    const produtosPorCategoria: { [key in Categoria]: Produto[] } =
      this.constantesService.PRODUTOS.reduce((acc, produto) => {
        acc[produto.categoria] = acc[produto.categoria] || [];
        acc[produto.categoria].push(produto);
        return acc;
      }, {} as { [key in Categoria]: Produto[] });

    const categoriasOrdenadas: Categoria[] = [
      Categoria.Frutas,
      Categoria.Verduras,
      Categoria.Legumes,
      Categoria.RaizesETuberculos,
      Categoria.CebolasEAlhos,
      Categoria.TemperosEErvas,
      Categoria.ProdutosProcessadosEEmbalados,
    ];

    for (const categoria of categoriasOrdenadas) {
      const produtos = produtosPorCategoria[categoria];
      if (produtos && produtos.length > 0) {
        texto += `${categoria}:\n`;
        for (const produto of produtos) {
          const produtoRelatorio = produtosRelatorio.get(produto.nome);
          if (produtoRelatorio) {
            texto += `  ${produtoRelatorio.nome}: ${this.relatorioService.formatarPreco(
              produtoRelatorio.preco
            )}\n`;
          }
        }
        texto += '\n';
      }
    }

    return texto;
  }
}