import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: Usuario = {
    nombre: '',
    apellidos: '',
    cedula: '',
    correoInstitucional: '',
    contrasena: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  registrar() {
    if (!this.validarCampos()) {
      return;
    }

    this.usuarioService.registrar(this.usuario).subscribe({
      next: (usuarioRegistrado) => {
        // Guarda el usuario en localStorage automáticamente
        localStorage.setItem('currentUser', JSON.stringify(usuarioRegistrado));
        
        Swal.fire({
          title: `¡Bienvenido ${usuarioRegistrado.nombre}!`,
          text: 'Tu registro fue exitoso. Serás redirigido a tu perfil',
          icon: 'success',
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/perfil']); // Redirección directa al perfil
        });
      },
      error: (error) => {
        const errorMsg = error.error?.message || 
                        (error.status === 409 ? 'El correo ya está registrado' : 'Error al registrar usuario');
        Swal.fire({
          title: 'Error',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }

  private validarCampos(): boolean {
    if (!this.usuario.cedula || !this.usuario.nombre || !this.usuario.apellidos) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return false;
    }
    
    if (!this.usuario.correoInstitucional.endsWith('@soyudemdellin.edu.co')) {
      Swal.fire('Error', 'Debe usar un correo institucional @soyudemdellin.edu.co', 'error');
      return false;
    }

    if (this.usuario.contrasena.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return false;
    }    

    return true;
  }
}