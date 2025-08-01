import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit {  
  public innerWidth: number = 0;
  
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  
  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }
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
