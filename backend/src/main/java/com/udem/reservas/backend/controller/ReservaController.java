package com.udem.reservas.backend.controller;

import com.udem.reservas.backend.dto.CrearReservaDto;
import com.udem.reservas.backend.model.Reserva;
import com.udem.reservas.backend.service.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{correoUsuario}")
    public List<Reserva> obtenerPorUsuario(@PathVariable String correoUsuario) {
        return service.obtenerPorUsuario(correoUsuario);
    }
}
