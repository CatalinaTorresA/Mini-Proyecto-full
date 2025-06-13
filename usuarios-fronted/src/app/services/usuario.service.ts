import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Rol {
  id: number;
  nombre: string;
}

export interface TipoDocumento {
  id: number;
  nombre: string;
}

export interface Usuario {
  id?: number;
  login: string;
  password: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: TipoDocumento;
  numeroDoc: string;
  genero: string;
  email: string;
  telefono: string;
  rol: Rol;
  fechaNacimiento?: string;
  foto?: string;
  estado: boolean;
  usuarioEvento: string;
  fechaEvento: string;
  eliminarUsuario: String;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/api'; 
   private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, usuario);
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/roles`);
  }

  getTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.baseUrl}/tipos-documento`);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/api/usuarios/${id}`);
}


}
