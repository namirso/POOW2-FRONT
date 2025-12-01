import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../../core/models/review';
import { Obra } from '../../../core/models/obra';
import { ReviewService } from '../../../core/services/review-service';
import { ObraService } from '../../../core/services/obra-service'; // Para escolher a obra
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatSelectModule],
  templateUrl: './review-component.html'
})
export class ReviewComponent implements OnInit {
  form: FormGroup;
  dados: Review[] = [];
  obras: Obra[] = [];
  editing = false;

  constructor(
    private service: ReviewService,
    private obraService: ObraService,
    private fb: FormBuilder,
    private csr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      nota: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      descricao: ['', Validators.required],
      obra: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.listarReviews();
    this.listarObras();
  }

  listarReviews() { this.service.listar().subscribe(res => {
    this.dados = res;
    this.csr.detectChanges();
  }); }
  listarObras() { this.obraService.listar().subscribe(res => this.obras = res); }

  salvar() {
    if (this.form.valid) {
      const acao = this.editing ? this.service.atualizar(this.form.value) : this.service.salvar(this.form.value);
      acao.subscribe(() => { this.listarReviews(); this.resetForm(); });
    }
  }

  editar(review: Review) {
    this.editing = true;
    this.form.patchValue(review);
  }

  deletar(id: number) {
    if(confirm('Deletar review?')) this.service.excluir(id).subscribe(() => this.listarReviews());
  }

  protected resetForm() {
    this.form.reset();
    this.editing = false;
  }

  compareObras(o1: Obra, o2: Obra): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
