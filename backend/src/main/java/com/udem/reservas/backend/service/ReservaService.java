package com.udem.reservas.backend.service;

import com.udem.reservas.backend.dto.CrearReservaDto;
import com.udem.reservas.backend.model.Reserva;

import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
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
}
