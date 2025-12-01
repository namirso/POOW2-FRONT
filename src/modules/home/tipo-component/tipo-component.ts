import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tipo } from '../../../core/models/tipo';
import { TipoService } from '../../../core/services/tipo-service';
import { CommonModule } from '@angular/common';

// Imports do Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// 1. ADICIONE O IMPORT DO SNACKBAR
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo',
  standalone: true,
  // 2. ADICIONE O MODULO AQUI NOS IMPORTS
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './tipo-component.html'
})
export class TipoComponent implements OnInit {
  form: FormGroup;
  dados: Tipo[] = [];
  editing = false;

  constructor(
    private service: TipoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar // 3. INJETE O SNACKBAR AQUI
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required]
    });
  }

  ngOnInit() { this.listar(); }

  listar() {
    this.service.listar().subscribe(res => {
      this.dados = res;
      this.cdr.detectChanges();
    });
  }

  salvar() {
    if (this.form.valid) {
      const acao = this.editing ? this.service.atualizar(this.form.value) : this.service.salvar(this.form.value);

      acao.subscribe({
        next: () => {
          this.listar();
          this.resetForm();
          this.mostrarMensagem('Salvo com sucesso!', false);
        },
        error: (err) => {
          this.mostrarMensagem('Erro ao salvar!', true);
        }
      });
    }
  }

  editar(tipo: Tipo) {
    this.editing = true;
    this.form.patchValue(tipo);
  }

  // 4. AQUI ESTÁ A MÁGICA PARA O ERRO DE EXCLUSÃO
  deletar(id: number) {
    if(confirm('Tem certeza que deseja deletar este tipo?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.listar();
          this.mostrarMensagem('Tipo excluído com sucesso!', false);
        },
        error: (err) => {
          console.error(err);
          // Mostra a mensagem específica de vínculo
          this.mostrarMensagem('Não é possível excluir! Existem Obras vinculadas a este Tipo.', true);
        }
      });
    }
  }

  protected resetForm() {
    this.form.reset();
    this.editing = false;
  }

  // Função auxiliar para mostrar o SnackBar bonito
  private mostrarMensagem(msg: string, isError: boolean) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000, // Fica na tela por 5 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['bg-danger', 'text-white'] : ['bg-success', 'text-white']
      // Nota: As classes bg-danger/success dependem do Bootstrap ou CSS global.
      // Se não tiver, ele vai aparecer cinza padrão, o que também funciona.
    });
  }
}
