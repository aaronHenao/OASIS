import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { EscenarioService } from 'src/app/services/escenario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
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
    //  Verificar si ya hay una reserva en ese horario
    const yaReservado = this.reservas.some(r =>
      r.fecha === this.reserva.fecha && r.horaInicio === this.reserva.hora
    );

    if (yaReservado) {
      this.mostrarError('Ya tienes una reserva para esa fecha y hora');
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
        const mensaje = typeof err.error === 'string'
          ? err.error
          : err.error?.message || 'Error al realizar la reserva';
        this.mostrarError(mensaje);
        this.cargarReservasUsuario();
        this.reserva.fecha = '';
        this.reserva.hora = '';
        this.escenarioSeleccionado = null;
      }
    });
  }

  // Saber si una reserva es futura (soporta HH:mm y HH:mm:ss)
  esFutura(reserva: any): boolean {
    let hora = reserva.horaInicio;
    if (hora.length === 5) { // formato HH:mm
      hora = hora + ':00';
    }
    const fechaHora = new Date(`${reserva.fecha}T${hora}`);
    return fechaHora > new Date();
  }

  // Cancelar reserva
  cancelarReserva(reserva: any) {
    Swal.fire({
      title: '¿Cancelar reserva?',
      text: `¿Seguro que deseas cancelar la reserva del ${reserva.fecha} a las ${reserva.horaInicio}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.reservaService.cancelarReserva(reserva).subscribe({
          next: () => {
            this.cargarReservasUsuario();
            Swal.fire('Cancelada', 'La reserva fue cancelada', 'success');
          },
          error: (err) => {
            if (err.status === 404) {
              this.cargarReservasUsuario();
              Swal.fire('Atención', 'La reserva ya fue cancelada o no existe.', 'info');
            } else {
              Swal.fire('Error', 'No se pudo cancelar la reserva', 'error');
            }
          }
        });
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

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }
}