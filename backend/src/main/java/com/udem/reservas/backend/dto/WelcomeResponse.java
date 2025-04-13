package com.udem.reservas.backend.dto;

public class WelcomeResponse {
	private String mensaje;

    public WelcomeResponse(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}
