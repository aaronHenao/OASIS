package com.udem.reservas.backend.controller;

import com.udem.reservas.backend.dto.CrearReservaDto;
import com.udem.reservas.backend.model.Reserva;
import com.udem.reservas.backend.service.ReservaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin("*")
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody CrearReservaDto dto) {
        try {
            Reserva reserva = service.crear(dto);
            return ResponseEntity.ok(reserva);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{correoUsuario}")
    public List<Reserva> obtenerPorUsuario(@PathVariable String correoUsuario) {
        return service.obtenerPorUsuario(correoUsuario);
    }

    // NUEVO: Cancelar reserva
    @DeleteMapping("/cancelar")
    public ResponseEntity<?> cancelarReserva(
            @RequestParam String correoUsuario,
            @RequestParam String nombreEscenario,
            @RequestParam String fecha,
            @RequestParam String horaInicio) {
        boolean cancelada = service.cancelarReserva(correoUsuario, nombreEscenario, fecha, horaInicio);
        if (cancelada) {
            // Devuelve un cuerpo para que Angular lo reciba como éxito
            return ResponseEntity.ok("Reserva cancelada");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la reserva");
        }
    }

    // NUEVO: Ver reservas por escenario
    @GetMapping("/escenario/{nombreEscenario}")
    public List<Reserva> obtenerPorEscenario(@PathVariable String nombreEscenario) {
        return service.obtenerPorEscenario(nombreEscenario);
    }

    // NUEVO: Reporte de reservas por escenario
    @GetMapping("/reporte/por-escenario")
    public Map<String, Long> reportePorEscenario() {
        return service.contarReservasPorEscenario();
    }
}