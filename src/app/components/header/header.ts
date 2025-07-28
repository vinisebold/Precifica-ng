import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  @Input() descricao: string = 'Preencha os preços e gere seu relatório';
  @Input() gerarRelatorioDisabled: boolean = true;
  @Input() mostrarBotoesAcao: boolean = false;

  @Output() gerarRelatorioClick = new EventEmitter<void>();
  @Output() limparTudoClick = new EventEmitter<void>();
  @Output() configuracoesClick = new EventEmitter<void>();

  public abrirConfiguracoes(): void {
    this.configuracoesClick.emit();
  }

  public onGerarRelatorio(): void {
    this.gerarRelatorioClick.emit();
  }

  public onLimparTudo(): void {
    this.limparTudoClick.emit();
  }
}
