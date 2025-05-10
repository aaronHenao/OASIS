package com.udem.reservas.backend.controller;
import com.udem.reservas.backend.dto.CrearReservaDto;
import com.udem.reservas.backend.dto.EscenarioDto;
import com.udem.reservas.backend.model.Reserva;
import com.udem.reservas.backend.service.EscenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/escenarios")
public class EscenarioController {

    @Autowired
    private EscenarioService escenarioService;

    @GetMapping
    public ResponseEntity<List<EscenarioDto>> listarEscenarios() {
        List<EscenarioDto> respuesta = escenarioService.listarEscenarios().stream()
                .map(e -> new EscenarioDto(e.getNombre(), e.isDisponible()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(respuesta);
}


    @PostMapping("/reservas")
    public ResponseEntity<String> reservar(@RequestBody CrearReservaDto dto) {
        boolean exito = escenarioService.hacerReserva(dto.getCorreoUsuario(), dto.getNombreEscenario(), dto.getFecha(), dto.getHoraInicio());
        if (exito) {
            return ResponseEntity.ok("Reserva confirmada.");
        }
        return ResponseEntity.badRequest().body("No se pudo realizar la reserva.");
    }

    @GetMapping("/{nombreEscenario}/reservas")
    public ResponseEntity<List<Reserva>> obtenerReservas(@PathVariable String nombreEscenario) {
        List<Reserva> reservas = escenarioService.obtenerReservasPorEscenario(nombreEscenario);
        return ResponseEntity.ok(reservas);
    }
}