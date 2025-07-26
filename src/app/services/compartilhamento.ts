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
    canvas.height = Math.max(600, relatorio.produtos.length * 80 + 300);

    // Fundo com gradiente
    const gradiente = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradiente.addColorStop(0, '#667eea');
    gradiente.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Título
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(relatorio.titulo, canvas.width / 2, 60);

    // Data
    ctx.font = '18px Arial';
    ctx.fillStyle = '#e0e7ff';
    ctx.fillText(this.relatorioService.formatarData(relatorio.data), canvas.width / 2, 90);

    // Produtos
    let y = 150;
    ctx.textAlign = 'left';

    relatorio.produtos.forEach(produto => {
      // Fundo do produto
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(40, y - 30, canvas.width - 80, 60);

      // Nome do produto
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.fillText(produto.nome, 60, y);

      // Preço
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(this.relatorioService.formatarPreco(produto.preco), canvas.width - 60, y);

      ctx.textAlign = 'left';
      y += 70;
    });

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