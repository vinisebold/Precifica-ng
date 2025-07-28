import { Component, Input } from '@angular/core';
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

  public abrirConfiguracoes(): void {
    alert('Abrir configurações de regras de negócio (a implementar).');
    // Exemplo: this.router.navigate(['/configuracoes']);
  }
}
