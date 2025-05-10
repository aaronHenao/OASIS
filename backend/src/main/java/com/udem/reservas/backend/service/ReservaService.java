package com.udem.reservas.backend.service;

import com.udem.reservas.backend.model.Escenario;
import com.udem.reservas.backend.model.Reserva;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ReservaService {

    private final EscenarioService escenarioService;

    public ReservaService(EscenarioService escenarioService) {
        this.escenarioService = escenarioService;
    }

    // Método para hacer una reserva
    public boolean hacerReserva(String correoUsuario, String nombreEscenario, String fecha, String horaInicio) {
        Escenario escenario = escenarioService.buscarPorNombre(nombreEscenario);
        if (escenario == null) {
            return false; // Escenario no encontrado
        }

        Reserva reserva = new Reserva(correoUsuario, nombreEscenario, fecha, horaInicio, "Confirmada");
        return escenario.agregarReserva(reserva);
    }

    // Método para ver las reservas de un escenario
    public List<Reserva> obtenerReservasPorEscenario(String nombreEscenario) {
        Escenario escenario = escenarioService.buscarPorNombre(nombreEscenario);
        if (escenario != null) {
            return escenario.getReservas();
        }
        return null;
    }
}