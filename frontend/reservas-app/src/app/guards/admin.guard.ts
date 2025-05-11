import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const usuario = JSON.parse(userData);
      if (usuario.correoInstitucional === 'admin@udem.edu.co') {
        return true;
      }
    }
    this.router.navigate(['/inicio']);
    return false;
  }
}