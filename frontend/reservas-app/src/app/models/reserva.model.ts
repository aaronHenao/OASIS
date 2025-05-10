export interface Reserva {
  correoUsuario: string;
  nombreEscenario: string;
  fecha: string;        // formato ISO string, ej: '2025-05-10'
  horaInicio: string;   // formato 'HH:mm', ej: '14:00'
}
