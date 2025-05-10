import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  credenciales = {
    correoInstitucional: '',
    contrasena: ''
  };
  mostrarContenido = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mostrarAlertaBienvenida();
  }

  mostrarAlertaBienvenida() {
    Swal.fire({
      title: 'Bienvenido/a a la página de reservas de escenarios deportivos de la UdeM.',
      width: '60vw',
      padding: '2em',
      color: '#3498db',
      background: '#fff',
      html: `
        <div style="height: 50vh; display: flex; flex-direction: column; justify-content: center;">
          <img src="assets/images/soccer.gif" 
               style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px; margin-bottom: 15px;" />
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#3498db',
      allowOutsideClick: false,
      allowEscapeKey: false,
      backdrop: `
        rgba(0,0,0,0.7)
        url("assets/images/field.png")
        center top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        this.mostrarContenido = true;
      }
    });
  }
  

  login() {
    if (!this.credenciales.correoInstitucional || !this.credenciales.contrasena) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    this.authService.login(this.credenciales).subscribe({
      next: (res: any) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        
        Swal.fire({
          title: `¡Bienvenido/a ${res.nombre}!`,
          text: 'Serás redirigido a tu perfil',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/perfil']); // Redirección a perfil
        });
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Credenciales incorrectas';
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }
}