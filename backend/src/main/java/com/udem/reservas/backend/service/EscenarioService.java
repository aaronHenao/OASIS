package com.udem.reservas.backend.service;

import com.udem.reservas.backend.model.Escenario;
import com.udem.reservas.backend.model.Reserva;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class EscenarioService {
    private final List<Escenario> escenarios = new ArrayList<>();

    public EscenarioService() {
        // Escenarios disponibles
        escenarios.add(new Escenario("Gimnasio"));
        escenarios.add(new Escenario("Cancha de tenis"));
        escenarios.add(new Escenario("Cancha de basquet"));
        escenarios.add(new Escenario("Cancha coliseo"));
        escenarios.add(new Escenario("Cancha de microfutbol"));
        escenarios.add(new Escenario("Cancha de futbol"));
    }

    public List<Escenario> listarEscenarios() {
        return escenarios;
    }

    public Escenario buscarPorNombre(String nombre) {
        return escenarios.stream()
                .filter(e -> e.getNombre().equalsIgnoreCase(nombre))
                .findFirst()
                .orElse(null);
    }

    public boolean hacerReserva(String correoUsuario, String nombreEscenario, String fecha, String horaInicio) {
        Escenario escenario = buscarPorNombre(nombreEscenario);
        if (escenario == null) {
            return false; // Escenario no encontrado
        }

        Reserva reserva = new Reserva(correoUsuario, nombreEscenario, fecha, horaInicio, "Confirmada");
        return escenario.agregarReserva(reserva);
    }

    public List<Reserva> obtenerReservasPorEscenario(String nombreEscenario) {
        Escenario escenario = buscarPorNombre(nombreEscenario);
        if (escenario != null) {
            return escenario.getReservas();
        }
        return new ArrayList<>();
    }
}