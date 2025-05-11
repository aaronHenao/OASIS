package com.udem.reservas.backend.controller;

import com.udem.reservas.backend.model.Escenario;
import com.udem.reservas.backend.service.EscenarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

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

    @PostMapping("/crear")
    public Escenario crearEscenario(@RequestBody Escenario escenario) {
        return escenarioService.crearEscenario(escenario);
    }

    @PutMapping("/editar")
    public Escenario editarEscenario(@RequestBody Map<String, Object> body) {
        String nombreOriginal = (String) body.get("nombreOriginal");
        String nombre = (String) body.get("nombre");
        String descripcion = (String) body.get("descripcion");
        boolean disponible = (Boolean) body.get("disponible");
        return escenarioService.editarEscenario(nombreOriginal, nombre, descripcion, disponible);
    }

    @DeleteMapping("/eliminar/{nombre}")
    public void eliminarEscenario(@PathVariable String nombre) {
        String nombreDecodificado = URLDecoder.decode(nombre, StandardCharsets.UTF_8);
        System.out.println("Recibido para eliminar: [" + nombre + "]");
        System.out.println("Decodificado: [" + nombreDecodificado + "]");
        escenarioService.eliminarEscenario(nombreDecodificado);
    }
}