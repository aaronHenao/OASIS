package com.udem.reservas.backend.controller;

import com.udem.reservas.backend.dto.CrearReservaDto;
import com.udem.reservas.backend.model.Reserva;
import com.udem.reservas.backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/reservas")
    public ResponseEntity<String> reservar(@RequestBody CrearReservaDto dto) {
        boolean exito = reservaService.hacerReserva(dto.getCorreoUsuario(), dto.getNombreEscenario(), dto.getFecha(), dto.getHoraInicio());
        if (exito) {
            return ResponseEntity.ok("Reserva confirmada.");
        }
        return ResponseEntity.badRequest().body("No se pudo realizar la reserva.");
    }

    @GetMapping("/{nombreEscenario}/reservas")
    public ResponseEntity<List<Reserva>> obtenerReservas(@PathVariable String nombreEscenario) {
        List<Reserva> reservas = reservaService.obtenerReservasPorEscenario(nombreEscenario);
        if (reservas != null) {
            return ResponseEntity.ok(reservas);
        }
        return ResponseEntity.notFound().build();
    }
}