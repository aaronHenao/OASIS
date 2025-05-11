package com.udem.reservas.backend.service;

import com.udem.reservas.backend.dto.CrearReservaDto;
import com.udem.reservas.backend.model.Reserva;

import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservaService {
    private final List<Reserva> reservas = new ArrayList<>();

    public Reserva crear(CrearReservaDto dto) {
        boolean yaReservado = reservas.stream().anyMatch(r ->
            r.getFecha().equals(dto.getFecha()) &&
            r.getHoraInicio().equals(dto.getHoraInicio())
        );

        if (yaReservado) {
            throw new IllegalStateException("Ya existe una reserva para esa fecha y hora");
        }

        Reserva reserva = new Reserva(
            dto.getCorreoUsuario(),
            dto.getNombreEscenario(),
            dto.getFecha(),
            dto.getHoraInicio()
        );
        reservas.add(reserva);
        return reserva;
    }

    public List<Reserva> obtenerPorUsuario(String correoUsuario) {
        return reservas.stream()
            .filter(r -> r.getCorreoUsuario().equalsIgnoreCase(correoUsuario))
            .collect(Collectors.toList());
    }

    // Cancelar reserva usando LocalTime para comparar correctamente la hora
    public boolean cancelarReserva(String correoUsuario, String nombreEscenario, String fecha, String horaInicio) {
        System.out.println("Intentando cancelar:");
        System.out.println("correoUsuario: " + correoUsuario);
        System.out.println("nombreEscenario: " + nombreEscenario);
        System.out.println("fecha: " + fecha);
        System.out.println("horaInicio (param): " + horaInicio);

        LocalTime horaParam;
        try {
            // Soporta tanto "16:00" como "16:00:00"
            horaParam = LocalTime.parse(horaInicio.length() == 5 ? horaInicio + ":00" : horaInicio);
        } catch (Exception e) {
            System.out.println("Error parseando horaInicio: " + e.getMessage());
            return false;
        }

        for (Reserva r : reservas) {
            System.out.println("----");
            System.out.println("Reserva guardada:");
            System.out.println("correoUsuario: " + r.getCorreoUsuario());
            System.out.println("nombreEscenario: " + r.getNombreEscenario());
            System.out.println("fecha: " + r.getFecha());
            System.out.println("horaInicio (reserva): " + r.getHoraInicio());
        }

        boolean eliminado = reservas.removeIf(r ->
            r.getCorreoUsuario().equalsIgnoreCase(correoUsuario) &&
            r.getNombreEscenario().equalsIgnoreCase(nombreEscenario) &&
            r.getFecha().toString().equals(fecha) &&
            r.getHoraInicio().equals(horaParam)
        );

        System.out.println("¿Eliminado?: " + eliminado);
        return eliminado;
    }

    // Ver reservas por escenario
    public List<Reserva> obtenerPorEscenario(String nombreEscenario) {
        return reservas.stream()
            .filter(r -> r.getNombreEscenario().equalsIgnoreCase(nombreEscenario))
            .collect(Collectors.toList());
    }

    // Reporte de reservas por escenario
    public Map<String, Long> contarReservasPorEscenario() {
        return reservas.stream()
            .collect(Collectors.groupingBy(Reserva::getNombreEscenario, Collectors.counting()));
    }
}