import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Obra } from '../../../core/models/obra';
import { Tipo } from '../../../core/models/tipo';
import { ObraService } from '../../../core/services/obra-service';
import { TipoService } from '../../../core/services/tipo-service'; // Precisa listar os tipos
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'; // Para o dropdown

@Component({
  selector: 'app-obra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatSelectModule],
  templateUrl: './obra-component.html'
})
export class ObraComponent implements OnInit {
  form: FormGroup;
  dados: Obra[] = [];
  tipos: Tipo[] = [];
  editing = false;

  constructor(
    private service: ObraService,
    private tipoService: TipoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,

  ) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      direcao: ['', Validators.required],
      tipo: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.listarObras();
    this.listarTipos();
  }

  listarObras() { this.service.listar().subscribe(res => {
    this.dados = res;
    this.cdr.detectChanges();
  }); }
  listarTipos() { this.tipoService.listar().subscribe(res => this.tipos = res); }

  salvar() {
    if (this.form.valid) {
      const acao = this.editing ? this.service.atualizar(this.form.value) : this.service.salvar(this.form.value);
      acao.subscribe(() => { this.listarObras(); this.resetForm(); });
    }
  }

  editar(obra: Obra) {
    this.editing = true;
    this.form.patchValue(obra);
  }

  deletar(id: number) {
    if(confirm('Deletar esta obra?')) this.service.excluir(id).subscribe(() => this.listarObras());
  }

  protected resetForm() {
    this.form.reset();
    this.editing = false;
  }


  compareTipos(t1: Tipo, t2: Tipo): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
