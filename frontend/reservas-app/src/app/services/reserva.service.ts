import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/reservas'; 

  constructor(private http: HttpClient) {}

  crearReserva(reserva: Reserva): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/crear`, reserva);
  }

  obtenerReservasUsuario(correo: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${correo}`);
  }
}