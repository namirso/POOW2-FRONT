import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../core/models/usuario';
import { UsuarioService } from '../../../core/services/usuario-service';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-component',
  standalone: true,
  templateUrl: './usuario-component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class UsuarioComponent implements OnInit {
  editing = false;
  form: FormGroup;
  dados: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.dados = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao listar:', err)
    });
  }

  protected adicionarUsuario() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;

      this.usuarioService.create(usuario).subscribe({
        next: () => {

          this.listar();
          this.resetForm();
        },
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }

  protected atualizarUsuario() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;

      this.usuarioService.update(usuario).subscribe({
        next: () => {
          this.listar();
          this.resetForm();
        },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    }
  }

  protected editarUsuario(usuario: Usuario) {
    this.editing = true;
    this.form.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: ''
    });
  }

  protected deletarUsuario(usuario: Usuario) {
    if(confirm(`Deseja deletar ${usuario.nome}?`)) {
      this.usuarioService.delete(usuario.id!).subscribe({
        next: () => {
          this.listar();
        },
        error: (err) => console.error('Erro ao deletar:', err)
      });
    }
  }


  protected resetForm() {
    this.form.reset();
    this.editing = false;
    this.form.patchValue({ senha: '123' });
  }
}
