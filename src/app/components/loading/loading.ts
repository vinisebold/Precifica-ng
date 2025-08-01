import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  @Input() visivel: boolean = false;
  @Input() mensagem: string = 'Processando...';
}
