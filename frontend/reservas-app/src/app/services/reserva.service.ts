import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(reserva: any): Observable<any> {
    console.log('URL completa:', `${this.apiUrl}/crear`);
    console.log('Datos enviados:', reserva);
    return this.http.post<any>(`${this.apiUrl}/crear`, reserva);
  }

  getReservasPorUsuario(correo: string): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${correo}`);
  }
}
