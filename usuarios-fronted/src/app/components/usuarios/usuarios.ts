import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService, Rol, TipoDocumento } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  tiposDocumento: TipoDocumento[] = [];
  loading = true;
  formulario!: FormGroup;
  mensaje: string = '';

  // ✅ Nuevas propiedades
  editando: boolean = false;
  usuarioEditandoId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroDoc: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      foto: [''],
      fechaNacimiento: ['']
    });

    this.cargarUsuarios();
    this.cargarRoles();
    this.cargarTiposDocumento();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cargarRoles(): void {
    this.usuarioService.getRoles().subscribe((data: Rol[]) => this.roles = data);
  }

  cargarTiposDocumento(): void {
    this.usuarioService.getTiposDocumento().subscribe((data: TipoDocumento[]) => this.tiposDocumento = data);
  }

  // ✅ Botón Editar
  editar(usuario: Usuario): void {
    this.formulario.patchValue({
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      numeroDoc: usuario.numeroDoc,
      genero: usuario.genero,
      telefono: usuario.telefono,
      rol: usuario.rol,
      tipoDocumento: usuario.tipoDocumento,
      foto: usuario.foto,
      fechaNacimiento: usuario.fechaNacimiento
    });

    this.editando = true;
    this.usuarioEditandoId = usuario.id!;
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const nuevoUsuario: Usuario = {
      ...this.formulario.value,
      login: this.formulario.value.email,
      password: '1234',
      estado: true,
      usuarioEvento: 'frontend',
      fechaEvento: new Date().toISOString().split('T')[0]
    };

    if (this.editando && this.usuarioEditandoId !== null) {
      this.usuarioService.actualizarUsuario(this.usuarioEditandoId, nuevoUsuario).subscribe({
        next: () => {
          this.mensaje = '✅ Usuario actualizado correctamente';
          this.editando = false;
          this.usuarioEditandoId = null;
          this.formulario.reset();
          this.cargarUsuarios();
          setTimeout(() => this.mensaje = '', 4000);
        },
        error: () => {
          this.mensaje = '❌ Error al actualizar el usuario';
        }
      });
    } else {
      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: () => {
          this.mensaje = '✅ Usuario guardado correctamente';
          this.formulario.reset();
          this.cargarUsuarios();
          setTimeout(() => this.mensaje = '', 4000);
        },
        error: () => {
          this.mensaje = '❌ Error al guardar el usuario';
        }
      });
    }
  }

  eliminar(id: number): void {
  console.log('Eliminando ID:', id);  // 👈 NUEVO

  if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

  this.usuarioService.eliminarUsuario(id).subscribe({
    next: () => {
      this.mensaje = '✅ Usuario eliminado correctamente';
      this.cargarUsuarios();
      setTimeout(() => this.mensaje = '', 3000);
    },
    error: (err) => {
      this.mensaje = '❌ Error al eliminar el usuario';
      console.error(err);  // 👈 Muestra el error real
    }
  });
  }

}
