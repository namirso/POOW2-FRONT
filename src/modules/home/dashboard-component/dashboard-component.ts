import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../core/services/usuario-service';
import { ObraService } from '../../../core/services/obra-service';
import { ReviewService } from '../../../core/services/review-service';
import { Review } from '../../../core/models/review';
import { Obra } from '../../../core/models/obra';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {

  // Listas reais
  recentReviews: Review[] = [];
  topObras: Obra[] = [];

  // Cards de estatística (Iniciam zerados)
  stats = [
    { title: 'Total de Obras', value: '0', icon: 'movie', color: 'bg-primary' },
    { title: 'Reviews Feitas', value: '0', icon: 'star', color: 'bg-warning' },
    { title: 'Usuários Ativos', value: '0', icon: 'people', color: 'bg-success' },
    { title: 'Média Geral', value: '0.0', icon: 'trending_up', color: 'bg-info' },
  ];

  constructor(
    private usuarioService: UsuarioService,
    private obraService: ObraService,
    private reviewService: ReviewService,
    private csr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // 1. Carregar Obras (Atualiza Card 1 e Lista Lateral)
    this.obraService.listar().subscribe({
      next: (obras) => {
        this.stats[0].value = obras.length.toString();
        this.topObras = obras.slice(0, 3);
        this.csr.detectChanges();
      }
    });

    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.stats[2].value = usuarios.length.toString();
        this.csr.detectChanges();
      }
    });

    this.reviewService.listar().subscribe({
      next: (reviews) => {
        this.stats[1].value = reviews.length.toString();

        this.recentReviews = reviews.slice(0, 5);

        if (reviews.length > 0) {
          const somaNotas = reviews.reduce((acc, curr) => acc + curr.nota, 0);
          const media = somaNotas / reviews.length;
          this.stats[3].value = media.toFixed(1); // Ex: 8.5
        }
        this.csr.detectChanges();
      }
    });
  }
}
