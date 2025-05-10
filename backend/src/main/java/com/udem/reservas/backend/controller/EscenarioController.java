package com.udem.reservas.backend.controller;

import com.udem.reservas.backend.model.Escenario;
import com.udem.reservas.backend.service.EscenarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escenarios")
@CrossOrigin("*")
public class EscenarioController {

    private final EscenarioService escenarioService;

    public EscenarioController(EscenarioService escenarioService) {
        this.escenarioService = escenarioService;
    }

    @GetMapping
    public List<Escenario> listarEscenarios() {
        return escenarioService.listarEscenarios();
    }
}
