package com.udem.reservas.backend.service;

import com.udem.reservas.backend.model.Escenario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EscenarioService {

    private final List<Escenario> escenarios = new ArrayList<>();

    public EscenarioService() {
        // Inicializamos con algunos escenarios disponibles
        escenarios.add(new Escenario("Cancha de fútbol", true));
        escenarios.add(new Escenario("Cancha de baloncesto", true));
        escenarios.add(new Escenario("Cancha de tenis", true));
        escenarios.add(new Escenario("Gimnasio", true));
    }

    public List<Escenario> listarEscenarios() {
        return escenarios;
    }

    public Escenario obtenerPorNombre(String nombre) {
        return escenarios.stream()
                .filter(e -> e.getNombre().equalsIgnoreCase(nombre))
                .findFirst()
                .orElse(null);
    }

    public void actualizarDisponibilidad(String nombre, boolean disponible) {
        Escenario escenario = obtenerPorNombre(nombre);
        if (escenario != null) {
            escenario.setDisponible(disponible);
        }
    }
}
