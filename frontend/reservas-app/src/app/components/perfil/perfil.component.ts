import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.usuario = JSON.parse(userData);
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }

  irAReservas() {
    this.router.navigate(['/reservas']);
  }
}