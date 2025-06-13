import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Importar Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // ✅ Inyectar Router
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (this.form.invalid) return;

    const credenciales = this.form.value;

    this.http.post('http://localhost:8080/api/usuarios/login', credenciales, { responseType: 'text' })
      .subscribe({
        next: (resp) => {
          this.mensaje = resp;
          this.router.navigate(['/usuarios']); // ✅ Redirigir al componente de usuarios
        },
        error: (err: HttpErrorResponse) => {
          this.mensaje = err.error || '❌ Error al iniciar sesión';
        }
      });
  }
}
