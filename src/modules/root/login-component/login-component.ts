import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const login = this.form.get('login')?.value.trim();
      const senha = this.form.get('senha')?.value.trim();

      this.authService.login(login, senha).subscribe({
        next: (response) => {
          console.log('Login realizado com sucesso!');
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
          }

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao logar:', err);
          alert('Usuário ou senha inválidos!');
        }
      });
    }
  }
}
