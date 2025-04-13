package com.udem.reservas.backend.service;
import org.springframework.stereotype.Service;

@Service
public class WelcomeService {
	public String generarMensajeBienvenida(String nombre) {
        return "Bienvenido/a " + nombre + " a la página de reservas de escenarios deportivos de la UdeM.";
    }

}
