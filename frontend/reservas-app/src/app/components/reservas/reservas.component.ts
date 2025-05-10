import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva.model';
import { Escenario } from 'src/app/models/escenario.model';
import { ReservaService } from 'src/app/services/reserva.service';
import { EscenarioService } from 'src/app/services/escenario.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  escenarios: Escenario[] = [];
  reservas: Reserva[] = [];
  reserva: Partial<Reserva> = {};
  escenarioSeleccionado: string | null = null;
  estaCargando = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  horasDisponibles: string[] = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
  ];

  constructor(
    private reservaService: ReservaService,
    private escenarioService: EscenarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.estaCargando = true;
    this.mensajeError = null;
    this.mensajeExito = null

    // Cargar escenarios
    this.escenarioService.obtenerTodos().subscribe({
      next: (data) => {;
        this.escenarios = data;
        this.obtenerMisReservas();
      },
      error: (err) => {
        console.error('Error al cargar escenarios:', err);
        this.mensajeError = 'No se pudieron cargar los escenarios. Intente nuevamente más tarde.';
        this.estaCargando = false;
      }
    });
  }

  obtenerMisReservas(): void {
    const correo = localStorage.getItem('usuarioLogueado');
    if (!correo) {
      this.mensajeError = 'No se encontró usuario logueado';
      this.estaCargando = false;
      return;
    }

    this.reservaService.obtenerReservasUsuario(correo).subscribe({
      next: (data) => {
        this.reservas = data;
        this.estaCargando = false;
      },
      error: (err) => {
        console.error('Error al cargar reservas:', err);
        this.mensajeError = 'No se pudieron cargar tus reservas. Intente nuevamente más tarde.';
        this.estaCargando = false;
      }
    });
  }

  toggleEscenario(escenario: Escenario): void {
    this.escenarioSeleccionado = this.escenarioSeleccionado === escenario.nombre ? null : escenario.nombre;
    if (this.escenarioSeleccionado) {
      this.reserva.escenario = escenario.nombre;
    } else {
      this.reserva = {};
    }
  }

  hacerReserva(nombreEscenario: string): void {
  console.log('Intentando reservar:', this.reserva);
  const correo = localStorage.getItem('usuarioLogueado');
  if (!correo) {
    this.mensajeError = 'Debe iniciar sesión para realizar reservas';
    return;
  }

  if (!this.reserva.fecha || !this.reserva.hora) {
    this.mensajeError = 'Por favor complete todos los campos';
    return;
  }

  this.estaCargando = true;
  this.mensajeError = null;
  this.mensajeExito = null;

  // Extraer solo la hora de inicio (09:00)
  const horaInicio = this.reserva.hora.split(' - ')[0]; 

  const nuevaReserva = {
    escenario: nombreEscenario,
    fecha: this.reserva.fecha,
    hora: horaInicio, // Enviamos solo la hora de inicio
    correoInstitucional: correo
  };

  console.log('Datos a enviar:', nuevaReserva); // Para depuración

  this.reservaService.crearReserva(nuevaReserva).subscribe({
    next: (reservaCreada) => {
      console.log('Reserva creada:', reservaCreada); // Para depuración
      this.mensajeExito = '¡Reserva realizada con éxito!';
      this.reserva = {}; // Limpiar formulario
      this.escenarioSeleccionado = null; // Cerrar acordeón
      this.obtenerMisReservas(); // Actualizar lista de reservas
      this.estaCargando = false;
    },
    error: (err) => {
      console.error('Error en la reserva:', err); // Para depuración
      this.mensajeError = err.error?.message || 'Error al realizar la reserva';
      this.estaCargando = false;
    }
  });
}
}