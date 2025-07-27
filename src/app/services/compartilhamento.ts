import { Injectable } from '@angular/core';
import { Relatorio } from '../models/relatorio';
import { RelatorioService } from './relatorio';
import { ConstantesService } from './constantes';

@Injectable({
  providedIn: 'root'
})
export class CompartilhamentoService {

  constructor(
    private relatorioService: RelatorioService,
    private constantesService: ConstantesService
  ) {}

  /**
   * Compartilha o relatório como texto formatado
   */
  public async compartilharRelatorioComoTexto(relatorio: Relatorio & { categoriasSelecionadas?: { [categoria: string]: boolean } }): Promise<void> {
    const texto = this.gerarTextoRelatorio(relatorio);
    const shareData = {
      title: relatorio.titulo,
      text: texto,
    };

    // Verifica se a Web Share API é suportada e se os dados são compartilháveis
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return; // Compartilhamento bem-sucedido, não precisa de fallback
      } catch (e) {
        console.error('Erro ao compartilhar com Web Share API:', e);
        // Prossegue para o fallback
      }
    }

    // Fallback: Copiar para a área de transferência
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(texto);
        alert('Texto copiado para a área de transferência!');
        return;
      } catch (e) {
        console.error('Erro ao copiar para a área de transferência:', e);
        // Prossegue para o último fallback
      }
    }

    // Último fallback: Exibir o texto em um alerta
    alert(texto);
  }

  /**
   * Gera texto do relatório para compartilhamento, agrupando por categorias selecionadas
   */
  private gerarTextoRelatorio(relatorio: Relatorio & { categoriasSelecionadas?: { [categoria: string]: boolean } }): string {
    let texto = `${relatorio.titulo}\n${this.relatorioService.formatarData(relatorio.data)}\n\n`;

    // Cria um mapa de produtos do relatório para busca eficiente
    const produtosRelatorio = new Map(relatorio.produtos.map(p => [p.nome, p]));

    // Itera sobre as categorias na ordem definida em PRODUTOS_CATEGORIZADOS
    for (const grupo of this.constantesService.PRODUTOS_CATEGORIZADOS) {
      // Ignora categorias não selecionadas (ou inclui todas se categoriasSelecionadas não estiver definido)
      if (relatorio.categoriasSelecionadas && !relatorio.categoriasSelecionadas[grupo.categoria]) {
        continue;
      }

      // Adiciona o nome da categoria apenas se estiver selecionada
      texto += `${grupo.categoria}\n`;

      // Adiciona os produtos da categoria, na ordem definida
      let temProdutos = false;
      for (const nomeProduto of grupo.produtos) {
        if (produtosRelatorio.has(nomeProduto)) {
          const produto = produtosRelatorio.get(nomeProduto)!;
          texto += `  ${produto.nome}: ${this.relatorioService.formatarPreco(produto.preco)}\n`;
          temProdutos = true;
        }
      }

      // Adiciona uma linha em branco após a categoria, apenas se houver produtos
      if (temProdutos) {
        texto += '\n';
      } else {
        // Remove o nome da categoria se não houver produtos
        texto = texto.slice(0, texto.lastIndexOf(grupo.categoria)) + texto.slice(texto.lastIndexOf(grupo.categoria) + grupo.categoria.length + 1);
      }
    }

    return texto;
  }
}