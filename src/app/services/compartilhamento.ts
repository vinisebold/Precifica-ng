import { Injectable } from '@angular/core';
import { Relatorio } from '../models/relatorio';
import { RelatorioService } from './relatorio';

@Injectable({
  providedIn: 'root'
})
export class CompartilhamentoService {

  constructor(private relatorioService: RelatorioService) {}

  /**
   * Compartilha o relatório usando a Web Share API ou fallback
   */
  public async compartilharRelatorio(relatorio: Relatorio): Promise<void> {
    try {
      const imagem = await this.gerarImagemRelatorio(relatorio);
      
      if (this.suportaWebShare()) {
        await this.compartilharComWebAPI(relatorio, imagem);
      } else {
        await this.compartilharComFallback(relatorio, imagem);
      }
    } catch (erro) {
      console.error('Erro ao compartilhar:', erro);
      throw new Error('Erro ao compartilhar. Tente novamente.');
    }
  }

  /**
   * Compartilha o relatório como texto formatado
   */
  public async compartilharRelatorioComoTexto(relatorio: Relatorio): Promise<void> {
    const texto = this.gerarTextoRelatorio(relatorio);
    if (navigator.share) {
      try {
        await navigator.share({
          title: relatorio.titulo,
          text: texto,
        });
      } catch (e) {
        // Usuário pode cancelar
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(texto);
      alert('Texto copiado para a área de transferência!');
    } else {
      alert(texto);
    }
  }

  /**
   * Verifica se o navegador suporta Web Share API
   */
  private suportaWebShare(): boolean {
    return 'share' in navigator && 'canShare' in navigator;
  }

  /**
   * Compartilha usando Web Share API
   */
  private async compartilharComWebAPI(relatorio: Relatorio, canvas: HTMLCanvasElement): Promise<void> {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/png', 0.9);
    });

    const arquivo = new File([blob], 'lista-precos.png', { type: 'image/png' });

    if (navigator.canShare({ files: [arquivo] })) {
      await navigator.share({
        title: relatorio.titulo,
        text: `${relatorio.titulo} - ${this.relatorioService.formatarData(relatorio.data)}`,
        files: [arquivo]
      });
    } else {
      // Fallback se não conseguir compartilhar arquivos
      await navigator.share({
        title: relatorio.titulo,
        text: this.gerarTextoRelatorio(relatorio),
        url: window.location.href
      });
    }
  }

  /**
   * Compartilhamento de fallback (download da imagem)
   */
  private async compartilharComFallback(relatorio: Relatorio, canvas: HTMLCanvasElement): Promise<void> {
    const link = document.createElement('a');
    link.download = 'lista-precos.png';
    link.href = canvas.toDataURL('image/png', 0.9);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Gera imagem do relatório usando canvas
   */
  private async gerarImagemRelatorio(relatorio: Relatorio): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Configurações do canvas
    canvas.width = 800;
    const produtosHeight = relatorio.produtos.length * 80;
    const headerHeight = 120;
    const footerHeight = 110;
    canvas.height = Math.max(600, headerHeight + produtosHeight + footerHeight);

    // Fundo branco
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cabeçalho destacado
    ctx.fillStyle = '#e0e7ef';
    ctx.fillRect(0, 0, canvas.width, headerHeight);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, headerHeight - 6, canvas.width, 6);

    // Título
    ctx.fillStyle = '#23272f';
    ctx.font = 'bold 34px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(relatorio.titulo, canvas.width / 2, 54);

    // Data
    ctx.font = '18px Arial';
    ctx.fillStyle = '#64748b';
    ctx.fillText(this.relatorioService.formatarData(relatorio.data), canvas.width / 2, 86);

    // Produtos
    let y = headerHeight + 30;
    ctx.textAlign = 'left';
    relatorio.produtos.forEach((produto, idx) => {
      // Card arredondado com sombra sutil
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(50 + 12, y - 24);
      ctx.arcTo(canvas.width - 50, y - 24, canvas.width - 50, y + 36, 12);
      ctx.arcTo(canvas.width - 50, y + 36, 50, y + 36, 12);
      ctx.arcTo(50, y + 36, 50, y - 24, 12);
      ctx.arcTo(50, y - 24, canvas.width - 50, y - 24, 12);
      ctx.closePath();
      ctx.shadowColor = 'rgba(30,41,59,0.07)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#f3f4f6';
      ctx.fill();
      ctx.restore();

      // Nome do produto
      ctx.font = '600 20px Arial';
      ctx.fillStyle = '#334155';
      ctx.fillText(produto.nome, 70, y + 10);

      // Preço
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#2563eb';
      ctx.textAlign = 'right';
      ctx.fillText(this.relatorioService.formatarPreco(produto.preco), canvas.width - 70, y + 10);
      ctx.textAlign = 'left';

      // Separador
      if (idx < relatorio.produtos.length - 1) {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(70, y + 32);
        ctx.lineTo(canvas.width - 70, y + 32);
        ctx.stroke();
      }
      y += 80;
    });

    // Rodapé com estatísticas
    const estatisticas = this.relatorioService.calcularEstatisticas(relatorio.produtos);
    ctx.save();
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, canvas.height - footerHeight, canvas.width, footerHeight);
    ctx.restore();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#23272f';
    ctx.textAlign = 'center';
    ctx.fillText('Resumo', canvas.width / 2, canvas.height - footerHeight + 36);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText(`Total de Itens:`, 80, canvas.height - footerHeight + 70);
    ctx.fillText(`Valor Total:`, 320, canvas.height - footerHeight + 70);
    ctx.fillText(`Preço Médio:`, 480, canvas.height - footerHeight + 70);
    ctx.fillText(`Maior Preço:`, 640, canvas.height - footerHeight + 70);
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#2563eb';
    ctx.fillText(`${relatorio.produtos.length}`, 200, canvas.height - footerHeight + 70);
    ctx.fillText(`${this.relatorioService.formatarPreco(estatisticas.total)}`, 410, canvas.height - footerHeight + 70);
    ctx.fillText(`${this.relatorioService.formatarPreco(estatisticas.media)}`, 570, canvas.height - footerHeight + 70);
    ctx.fillText(`${this.relatorioService.formatarPreco(estatisticas.maiorPreco)}`, 740, canvas.height - footerHeight + 70);

    return canvas;
  }

  /**
   * Gera texto do relatório para compartilhamento
   */
  private gerarTextoRelatorio(relatorio: Relatorio): string {
    let texto = `${relatorio.titulo}\n${this.relatorioService.formatarData(relatorio.data)}\n\n`;
    
    relatorio.produtos.forEach(produto => {
      texto += `${produto.nome}: ${this.relatorioService.formatarPreco(produto.preco)}\n`;
    });

    return texto;
  }
}