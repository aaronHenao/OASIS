import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { EscenarioService } from 'src/app/services/escenario.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  escenarios: any[] = [];
  reservas: any[] = [];
  horasDisponibles: string[] = [
    '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00'
  ];

  reserva = {
    fecha: '',
    hora: ''
  };

  escenarioSeleccionado: string | null = null;

  constructor(
    private reservaService: ReservaService,
    private escenarioService: EscenarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarEscenarios();
    this.cargarReservasUsuario();
  }

  cargarEscenarios() {
    this.escenarioService.getEscenarios().subscribe(data => {
      this.escenarios = data;
    });
  }

  cargarReservasUsuario() {
    const usuario = this.authService.getUsuarioActual();
    if (!usuario) return;

    this.reservaService.getReservasPorUsuario(usuario.correoInstitucional).subscribe(data => {
      this.reservas = data;
    });
  }

  toggleEscenario(escenario: any) {
  
  this.escenarioSeleccionado = this.escenarioSeleccionado === escenario.nombre ? null : escenario.nombre;
  
}

  hacerReserva(nombreEscenario: string) {
    const usuario = this.authService.getUsuarioActual();
    if (!usuario) {
      this.mostrarError('Debes iniciar sesión para reservar');
      return;
    }

    if (!this.reserva.fecha || !this.reserva.hora) {
      this.mostrarError('Por favor completa todos los campos');
      return;
    }

    const fechaReserva = new Date(`${this.reserva.fecha}T${this.reserva.hora}:00`);
    const ahora = new Date();

    if (fechaReserva < ahora) {
      this.mostrarError('No puedes reservar en fechas/horas pasadas');
      return;
    }

    const dto = {
      correoUsuario: usuario.correoInstitucional,
      nombreEscenario: nombreEscenario,
      fecha: this.reserva.fecha,
      horaInicio: this.reserva.hora
    };

    this.reservaService.crearReserva(dto).subscribe({
      next: () => {
        this.mostrarExito(nombreEscenario);
        this.cargarReservasUsuario();
        this.reserva.fecha = '';
        this.reserva.hora = '';
        this.escenarioSeleccionado = null;
      },
      error: (err) => {
        this.mostrarError(err.error?.message || 'Error al realizar la reserva');
      }
    });
  }

  // Obtiene la fecha actual en formato YYYY-MM-DD
  get fechaActual(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Verifica si una hora es pasada para la fecha seleccionada
  esHoraPasada(hora: string): boolean {
    if (!this.reserva.fecha) return false;
    
    const fechaSeleccionada = new Date(`${this.reserva.fecha}T${hora}:00`);
    return fechaSeleccionada < new Date();
  }

  private mostrarExito(nombreEscenario: string) {
    
    Swal.fire({
      title: '¡Reserva Exitosa!',
      html: `
        <div style="text-align: center;">
          <img src="assets/images/reserva-exitosa.png" style="width: 100px; margin-bottom: 15px;">
          <p style="font-size: 1.1rem; margin-bottom: 5px;">Has reservado:</p>
          <p style="font-weight: bold; font-size: 1.2rem; color: #2c3e50;">${nombreEscenario}</p>
          <p style="margin-top: 10px;">${this.reserva.fecha} - ${this.reserva.hora}</p>
        </div>
      `,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      background: '#ffffff',
      width: '400px'
    });
  }

  private mostrarError(mensaje: string) {
  Swal.fire({
    title: 'Error en la reserva',
    html: `
      <div style="text-align: center;">
        <svg width="80" height="80" viewBox="0 0 24 24" style="margin-bottom: 15px; color: #F44336;">
          <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
        </svg>
        <p style="font-size: 1.1rem; color: #721c24;">${mensaje}</p>
        <p style="font-size: 0.9rem; margin-top: 10px;">Por favor, selecciona una fecha y hora válidas</p>
      </div>
    `,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#d33'
  });
}


}
